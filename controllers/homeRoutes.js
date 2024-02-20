const router = require('express').Router();
const { User } = require('../models');
const authenticate = require('../utils/authentication.js');

router.get('/', authenticate, async (req, res) => {
  console.log(`request${req.session}`)
   try {
    res.render('homepage', {logged_in: req.session.logged_in});
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { layout: 'error', message: 'Could not GET homepage' });
  }
});

router.get('/dashboard', authenticate, async (req,res) => {
  try{
    const userData = await User.findAll({ 
      include: [
        {
      
    }
  ]
})
    res.render('dashboard', userData, {logged_in: req.session.logged_in});
  } catch(err){
    console.error(err);
    res.status(500).render('error', { layout: 'error', message: 'Could not GET dashboard' });
  }
});

router.get('/profile', authenticate, (req,res) => {
  try{
    res.render('profile', {logged_in: req.session.logged_in})
  } catch(err){
    console.error(err);
    res.status(500).render('error', { layout: 'error', message: 'Could not GET profile' });
  }
});

router.get('/signup', (req,res) => {
  try{
    res.render('signup')
  } catch(err){
    console.error(err);
    res.status(500).render('error', { layout: 'error', message: 'Could not GET signup' });
  }
});

router.get('/logout', async (req,res) => {
  try {
    return req.session.logged_in = false;
  } catch(err){
    console.error(err);
    res.status(500).render('error', { layout: 'error', message: 'Could not GET signout' });
  }
});

router.get('/login', async (req, res) => {
  try{
    if (req.session.logged_in) {
      res.render('/');
      return;
  }
    res.render('login')
  } catch(err){
    console.error(err);
    res.status(500).render('error', { layout: 'error', message: 'Could not GET login' });
  }
});

module.exports = router;
