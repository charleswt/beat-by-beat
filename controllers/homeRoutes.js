const router = require("express").Router();
const { User, Profile, Friends } = require("../models");
const authenticate = require("../utils/authentication.js");
const { Op } = require("sequelize");

router.get("/", authenticate, async (req, res) => {
  console.log(`request${req.session}`);
  try {
    res.render("homepage", { logged_in: req.session.logged_in });
  } catch (err) {
    const statusCode = 500;
    // Render your template and pass the status code as part of the data object
    res.status(statusCode).render("game", {
      layout: "error",
      status: statusCode,
    });
  }
});

router.get("/dashboard", authenticate, async (req, res) => {
  console.log("hello world!");
  try {
    const user = await User.findOne({
      attributes: ["id", "name"],
      where: { id: req.session.user_id },
      include: [
        {
          model: User,
          as: 'friends',
          through: Friends,
          attributes: ["id", "name"],
        },
      ],
    });

    if (!user) {
      // Handle the case where the logged-in user is not found
      return res.status(404).render("error", {
        layout: "error",
        status: 404,
        message: "Logged-in user not found",
      });
    }

    // Log generated SQL queries
    console.log(user.toString());

    const userData = user.get({ plain: true });
    console.log(userData);

    res.render("dashboard", { logged_in: req.session.logged_in, userData });
  } catch (err) {
    console.log(err);
    const statusCode = 500;
    res.status(statusCode).render("error", {
      layout: "error",
      status: statusCode,
      message: "Internal Server Error",
    });
  }
});


router.get("/profile", authenticate, async (req, res) => {
  try {
    const profileData = await Profile.findByPk(req.session.user_id);
    const favArtists = profileData.favArtists || [];
    console.log('favArtists:', favArtists); //debugging
    console.log('logged_in:', req.session.logged_in); //debbugging
    res.render("profile", {
      logged_in: 
      req.session.logged_in,
      favArtists
    });
  }  catch (err) {
    const statusCode = 500;
    // Render the template and pass the status code as part of the data object
    res.status(statusCode).render("game", {
      layout: "error",
      status: statusCode,
    });
  }
});

router.get("/aboutus", (req, res) => {
  try {
    res.render("aboutus");
  } catch (err) {
    const statusCode = 500;
    // Render the template and pass the status code as part of the data object
    res.status(statusCode).render("game", {
      layout: "error",
      status: statusCode,
    });
  }
});

router.get("/signup", (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    const statusCode = 500;
    // Render the template and pass the status code as part of the data object
    res.status(statusCode).render("game", {
      layout: "error",
      status: statusCode,
    });
  }
});

router.get("/logout", async (req, res) => {
  try {
    return (req.session.logged_in = false);
  } catch (err) {
    const statusCode = 500;
    // Render the template and pass the status code as part of the data object
    res.status(statusCode).render("game", {
      layout: "error",
      status: statusCode,
    });
  }
});

router.get("/login", async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.render("/");
      return;
    }
    res.render("login");
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
