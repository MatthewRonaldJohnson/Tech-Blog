const preventAuth = function(req, res, next){
    if(req.session.userId) {
        res.redirect('/dashboard')
    } else {
        next();
    }
}

module.exports = preventAuth;

//this middleware function will be used to prevent a logged in user from accessing the login page