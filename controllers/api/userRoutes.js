const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {

  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({message: "logged in"});
    });
    
  } catch (err) {
    //if the error involves a unique constraint violation,
    if (err.name === 'SequelizeUniqueConstraintError') {
      //check if the error occurs at the email field
      const isEmail = err.errors[0].path === 'email';
      //if isEmail, send a message 
      res.status(409).json({ message: isEmail ? 'Email already in use, please choose another.' : 'Username already taken, please choose another.' });
    } else if (err.name === 'SequelizeValidationError') {
      // Find out if the error is related to the password field
      const isPasswordError = err.errors.some(error => error.path === 'password');
      if (isPasswordError) {
        return res.status(400).json({ message: 'Password needs to be at least 8 character' });
      } 
    }else {
      res.render({ layout: 'error' });
    }
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.render({ layout: 'error' }).status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.render({ layout: 'error' })
  }
});


module.exports = router;
