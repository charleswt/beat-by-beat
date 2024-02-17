const authenticate = (req, res, next) => {
    console.log(`request: ${JSON.stringify(req.session, null, 2)}`);
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
};
  
  module.exports = authenticate;