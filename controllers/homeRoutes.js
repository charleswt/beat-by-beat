const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data

    // Pass serialized data and session flag into template
    res.render('game', {layout: 'error'});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try{
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
  }
  } catch(err){
    res.status(500).json({ message: 'Could not GET login.handlebars'})
  }
  

  res.render('login');
});

module.exports = router;
