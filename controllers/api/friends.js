const router = require("express").Router();
const { User, Friends } = require("../../models");

router.get('/getUsers/:user', async (req, res) => {
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
      console.log(userDataLookup, 'Ln 17');
  
      res.render('dashboard', {userDataLookup});
      console.log(userDataLookup, 'Ln 20')
    } catch (err) {
      console.log(err);
      res.status(500).render("game", {
        layout: "error",
        status: 500,
      });
    }
  });

  router.post('/friendsId/:userId', async (req, res) => {
    try {
    const user = req.params.userId;
    const numberId = Number(user)
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
        return res.status(400).json({ message: 'Friend already exists' });
      }
  
      // Create a new friendship
      console.log("loggedInUserId:", loggedInUserId);
      console.log("numberId:", numberId);
      
      const newFriendship = await Friends.create({
        user_id: loggedInUserId,
        friend_id: numberId,
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
  
  router.delete('/deleteFriend/:deleteId', async (req, res) => {
    try {
      const deleteId = req.params.deleteId;
  
      await Friends.destroy({
        where: {
          user_id: req.session.user_id,
          friend_id: deleteId,
        },
      });
    
      res.status(200).json({ message: 'Friend deleted successfully.' });
      location.reload()
    } catch (err) {
      console.log(err);
      res.status(500).render("game", {
        layout: "error",
        status: 500,
      });
    }
  });

  module.exports = router;