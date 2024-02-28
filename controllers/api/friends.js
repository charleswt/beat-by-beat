const router = require("express").Router();
const { User, Friends, Profile } = require("../../models");
const authenticate = require("../../utils/authentication");

router.get("/getUsers/:user", async (req, res) => {
  try {
    const user = req.params.user;
    console.log(user);

    const users = await User.findOne({
      attributes: ["id", "name"],
      where: {
        name: user,
      },
    });

    const userDataLookup = users.get({ plain: true });
    console.log(userDataLookup, "Ln 17");

    res.json(userDataLookup);
    console.log(userDataLookup, "Ln 20");
  } catch (err) {
    console.log(err);
    res.status(500).render("game", {
      layout: "error",
      status: 500,
    });
  }
});

router.post("/friendsId/:userId", async (req, res) => {
  try {
    const user = req.params.userId;
    const numberId = Number(user);
    console.log(numberId);
    const loggedInUserId = req.session.user_id;
    console.log(loggedInUserId);
    // Check if the friendship already exists
    const existingFriendship = await Friends.findOne({
      where: {
        user_id: loggedInUserId,
        friend_id: numberId,
      },
    });

    if (existingFriendship) {
      // Friendship already exists
      return res.status(400).json({ message: "Friend already exists" });
    }

    // Create a new friendship
    console.log("loggedInUserId:", loggedInUserId);
    console.log("numberId:", numberId);

    const newFriendship = await Friends.create({
      user_id: loggedInUserId,
      friend_id: numberId,
    });

    // You can do additional logic or send a response as needed
    res
      .status(200)
      .json({ message: "Friend added successfully", friend: newFriendship });
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

router.delete("/deleteFriend/:deleteId", async (req, res) => {
  try {
    const deleteId = req.params.deleteId;

    await Friends.destroy({
      where: {
        user_id: req.session.user_id,
        friend_id: deleteId,
      },
    });

    res.status(200).json({ message: "Friend deleted successfully." });
    location.reload();
  } catch (err) {
    console.log(err);
    res.status(500).render("game", {
      layout: "error",
      status: 500,
    });
  }
});

//router to get the user information of a user 
router.get("/profile/:id", authenticate, async (req, res) => {
  console.log("profile friend called");
  try {
    const profileData = await User.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "friends",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
        {
          model: Profile,
          attributes: ["favArtists"],
        },
      ],
    });
    const favArtists = profileData.profile.favArtists || [];
    console.log("favorite Artists: ", favArtists);
    const friendsList = profileData.friends
      ? profileData.friends.map((friends) => ({
          id: friends.id,
          name: friends.name,
        }))
      : [];
    const currentUser = profileData.name;
    console.log("logged_in:", req.session.logged_in); //debbugging
    console.log("friendsList: ", friendsList);
    console.log(
      "current user's session",
      req.session,
      "current User:",
      profileData.name
    );
    res.render("profile", {
      logged_in: req.session.logged_in,
      favArtists,
      friendsList,
      currentUser,
    });
  } catch (err) {
    const statusCode = 500;
    // Render the template and pass the status code as part of the data object
    res.status(statusCode).render("game", {
      layout: "error",
      status: statusCode,
    });
  }
});

module.exports = router;
