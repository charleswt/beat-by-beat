const authenticate = (req,res,next) => {
    if(!req.session.logged_in){res.redirect('/login'); return;}
    next();
}

module.exports = authenticate