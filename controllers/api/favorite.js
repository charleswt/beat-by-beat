const router = require("express").Router();
const authenticate = require("../../utils/authentication");
const { Profile } = require("../../models");

router.get("/", authenticate, async (req, res) => {
  try {
    const profileData = await Profile.findByPk(req.session.user_id);
    if (!profileData) {
      const statusCode = 404;
      res.status(statusCode).render("game", {
        layout: "error",
        status: statusCode,
      });
    }
    //check if the user already a favorite artists list. if not, create a new empty array
    const currentFavArtists = profileData.favArtists || [];
    res.status(200).json(currentFavArtists);
  } catch (err) {
    const statusCode = 400;
    res.status(statusCode).render("game", {
      layout: "error",
      status: statusCode,
    });
  }
});

router.put("/", authenticate, async (req, res) => {
  try {
    const { artist } = req.body;
    const profileData = await Profile.findByPk(req.session.user_id);

    if (!profileData) {
      const statusCode = 404;
      res.status(statusCode).render("game", {
        layout: "error",
        status: statusCode,
      });
    }

    // Ensure favArtists is an array, then add the new artist
    let favArtistList = profileData.favArtists
      ? [...profileData.favArtists]
      : [];

    if (!favArtistList.includes(artist)) {
      favArtistList.push(artist);

      // Save the updated list
      await profileData.update({ favArtists: favArtistList });
      res.json({ message: "Favorite artist added successfully" });
    } else {
      res.status(400).json({ message: "Artist is already in favorites" });
    }
  } catch (err) {
    const statusCode = 400;
    res.status(statusCode).render("game", {
      layout: "error",
      status: statusCode,
    });
  }
});

router.put("/remove", authenticate, async (req, res) => {
  try {
    const { artist } = req.body;
    const userId = req.session.user_id;

    const userProf = await Profile.findByPk(userId);
    if (!userProf) {
      const statusCode = 404;
      res.status(statusCode).render("game", {
        layout: "error",
        status: statusCode,
      });
    }
    //check if the user already a favorite artists list. if not, create a new empty array
    const currentFavArtists = userProf.favArtists || [];
    //removing a matching artist's name
    const updatedFavArtists = currentFavArtists.filter((a) => a !== artist);

    // Setting the field to the updates array
    userProf.favArtists = updatedFavArtists;
    await userProf.save();

    res.json({ message: "Artist removed from favorites" });
  } catch (err) {
    console.error(err);
    const statusCode = 500;
    res.status(statusCode).render("game", {
      layout: "error",
      status: statusCode,
    });
  }
});

module.exports = router;
