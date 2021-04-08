const checkOwn = function(req, res, next){
    if(req.session.userId != req.params.id) {
        //one is a number one is a string so soft ==
        //if user tries to hit a del or put route on a post they dont own redirect to home page
        res.redirect('/')
    } else {
        next();
    }
}

module.exports = checkOwn;