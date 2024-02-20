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
    const statusCode = 500;
      // Render your template and pass the status code as part of the data object
      res.status(statusCode).render("game", {
        layout: "error",
        status: statusCode,
  });
}
});

router.get('/dashboard', authenticate, async (req,res) => {
  try{
    res.render('dashboard');
  } catch(err){
    const statusCode = 500;
    // Render the template and pass the status code as part of the data object
    res.status(statusCode).render("game", {
      layout: "error",
      status: statusCode,  });
    }
});

router.get('/signup', (req,res) => {
  try{
    res.render('signup')
  } catch(err){
    const statusCode = 500;
    // Render the template and pass the status code as part of the data object
    res.status(statusCode).render("game", {
      layout: "error",
      status: statusCode,  });
    }
});

router.get('/logout', async (req,res) => {
  try {
    return req.session.logged_in = false;
  } catch(err){
    const statusCode = 500;
    // Render the template and pass the status code as part of the data object
    res.status(statusCode).render("game", {
      layout: "error",
      status: statusCode,  });
    }
});

router.get('/aboutus', (req,res) => {
  try{
    res.render('aboutus')
  } catch(err){
    const statusCode = 500;
    // Render the template and pass the status code as part of the data object
    res.status(statusCode).render("game", {
      layout: "error",
      status: statusCode,  });
    }
})
router.get('/login', async (req, res) => {
  try{
    if (req.session.logged_in) {
      res.render('/');
      return;
  }
    res.render('login')
  } catch(err){
    const statusCode = 500;
    // Render the template and pass the status code as part of the data object
    res.status(statusCode).render("game", {
      layout: "error",
      status: statusCode,  });
    }
});

module.exports = router;
