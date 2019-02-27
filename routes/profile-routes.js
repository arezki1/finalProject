
//require the Router Module/function

var Router       = require('router')
 
var router = Router();

const passport = require('passport');

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    res.render('profile', { user: req.user });
});

module.exports = router;