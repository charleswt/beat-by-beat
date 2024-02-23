const router = require("express").Router();
const { User, Profile, Friends } = require("../../models");
const { Op } = require("sequelize");

router.post("/", async (req, res) => {
  let transaction;
  try {
    // `transaction` is initialized and passed to ensure atomicity.
    transaction = await User.sequelize.transaction();
    const userData = await User.create(req.body, { transaction });
    
    // A new profile for the user is created at the same time using transaction
    await Profile.create({
      user_id: userData.id,
      favArtists: [],
      friends: [],
    }, { transaction });

    // If everything goes well, commit the transaction.
    await transaction.commit();

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ message: "logged in" });
    });

  } catch (err) {
    // If any of the above actions fail, we will try to rollback our transaction.
    if (transaction) await transaction.rollback();

    //if the error involves a unique constraint violation,
    if (err.name === "SequelizeUniqueConstraintError") {
      //check if the error occurs at the email field
      const isEmail = err.errors[0].path === "email";
      //if isEmail, send a message
      res.status(409).json({
        message: isEmail
          ? "Email already in use, please choose another."
          : "Username already taken, please choose another.",
      });
    } else if (err.name === "SequelizeValidationError") {
      // Find out if the error is related to the password field
      const isPasswordError = err.errors.some(
        (error) => error.path === "password"
      );
      if (isPasswordError) {
        return res
          .status(400)
          .json({ message: "Password needs to be at least 8 character" });
      }
    } else {
      const statusCode = 400;
      // Render your template and pass the status code as part of the data object
      res.status(statusCode).render("game", {
        layout: "error",
        status: statusCode,
      });
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        [Op.or]: [{ email: req.body.email }, { name: req.body.email }],
      },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email/username, please try again" });
      return;
    }
    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    const statusCode = 400;
    // Render your template and pass the status code as part of the data object
    res.status(statusCode).render("game", {
      layout: "error",
      status: statusCode,
    });
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    const statusCode = 400;
    // Render your template and pass the status code as part of the data object
    res.status(statusCode).render("game", {
      layout: "error",
      status: statusCode,
    });
  }
});

router.post('/friendsId/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the current logged-in user, you may have to adjust this based on your authentication logic
    const loggedInUserId = req.session.user_id; // Replace with your actual logged-in user ID

    // Check if the friendship already exists
    const existingFriendship = await Friends.findOne({
      where: {
        userId: loggedInUserId,
        friendId: userId,
      },
    });

    if (existingFriendship) {
      // Friendship already exists
      return res.status(400).json({ message: 'Friend already exists' });
    }

    // Create a new friendship
    const newFriendship = await Friends.create({
      userId: loggedInUserId,
      friendId: userId,
    });

    // You can do additional logic or send a response as needed
    res.status(200).json({ message: 'Friend added successfully', friend: newFriendship });
  } catch (err) {
    console.log(err);
    const statusCode = 400;
    // Render your template and pass the status code as part of the data object
    res.status(statusCode).render("game", {
      layout: "error",
      status: statusCode,
    });
  }
});

module.exports = router;
