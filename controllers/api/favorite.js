const router = require("express").Router();
const authenticate = require("../../utils/authentication");
const { Profile } = require("../../models");

router.put("/api/favorite", authenticate, async (req, res) => {
  try {
    const { artist } = req.body;
    const profileData = await Profile.findByPk(req.session.user_id);

    if (!profileData) {
      return res.status(404).json({ message: "Profile not found" });
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
    console.error(err);
    const statusCode = 400;
    res.status(statusCode).render("game", {
      layout: "error",
      status: statusCode,
    });
  }
});






module.exports = router;
