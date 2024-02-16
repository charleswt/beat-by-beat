const router = require('express').Router();
const authenticate = require('../utils/authentication.js');

router.get('/',authenticate, async (req, res) => {
  console.log(`request${req.session}`)
   try {
  //   const userData = await User.findAll({
  //     attributes: { exclude: ['password'] },
  //     order: [['name', 'ASC']],
  //   });
  //   const usersData = userData.map((user) => user.get({ plain: true}));
    res.render('homepage', {logged_in: req.session.logged_in});
  } catch (err) {
    res.render('game', {layout: 'error'});
  }
});

router.get('/signup', (req,res) => {
  try{
    res.render('signup')
  } catch(err){
    res.render('game', { layout: 'error' }).status(500).json({ message: 'Could not GET signup.handlebars'})
  }
})

router.get('/logout', async (req,res) => {
  try {
    return req.session.logged_in = false;
  } catch(err){
    res.render('game', { layout: 'error' }).status(500).json({ message: 'Could not GET /logout'})
  }
})

router.get('/login', async (req, res) => {
  try{
    if (req.session.logged_in) {
      res.render('/profile');
      return;
  }
    res.render('login');
  } catch(err){
    res.render('game', { layout: 'error' }).status(500).json({ message: 'Could not GET login.handlebars'})
  }
});

module.exports = router;
