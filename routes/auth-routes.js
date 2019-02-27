
//require the Router Module/function
const cookeParser =require ('cookie-parser');
const bodyParser =require ('body-parser');
var Router       = require('router');
var router = Router();
const User = require('../models/user');
const createUser = require('../models/user');
const getUserByEmail =require('../models/user');
const comparePassword = require('../models/user');
const getUserById = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const flash=require('connect-flash');
const expressValidator=require('express-validator');

router.use(flash());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));
router.use(cookeParser());

router.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));



router.use(function(req, res, next){
	res.locals.success_message = req.flash('success_message');
	res.locals.error_message = req.flash('error_message');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
  	next();
});
        //registration Get
        
        router.post('/register', function(req, res) {
         
          let name = req.body.name;
          let lastname =req.body.lastname;
          let email = req.body.email;
          let password = req.body.password;
          let password_confirmation= req.body.password_confirmation;
        
          req.checkBody('name', 'Frstname is required').notEmpty();
          req.checkBody('lastname', 'Lastname is required').notEmpty();
          req.checkBody('email', 'Email is required').notEmpty();
          req.checkBody('email', 'Please enter a valid email').isEmail();
          req.checkBody('password', 'Password is required').notEmpty();
          req.checkBody('password_confirmation', 'Confirm Password is required').notEmpty();
          req.checkBody('password_confirmation', 'Confirm Password Must Matches With Password').equals(password);
          //req.checkBody('password','...').isPsd1EqPsd2(password_confirmation);
          
          
          let errors = req.validationErrors();
          if(errors)
          {
              
              
            res.render('register',{errors: errors});
            
          }
          else
          
          {
          
           let user = new User.User({
              name: name,
              lastname:lastname,
              email: email,
              password: password
            });
             
           
            createUser.createUser(user, function(err, user){
                
                if(err) throw err;
                else console.log(' created new user '+user);
            });
            req.flash('success_message','You have registered, Now please login');
            res.render('login');
          }
        });
        
// Login Get



passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback : true
},
	function(req, email, password, done) {
		getUserByEmail.getUserByEmail(email, function(err, user) {
			if (err) { return done(err); }
	  		if (!user) {
				return done(null, false, req.flash('error_message', 'No email is found'));
	  		}
	  		
	  		comparePassword.comparePassword(password, user.password, function(err, isMatch) {
				if (err) { return done(err); }
				if(isMatch){
				    
		  				return done(null, user, req.flash('success_message', 'You have successfully logged in!!'));
				}
				else{
		  				return done(null, false, req.flash('error_message', 'Incorrect Password'));
				}
	 		});
		});
  	}
));

passport.serializeUser(function(user, done) {
  	done(null, user._id);
});

passport.deserializeUser(function(_id, done) {
  	getUserById.getUserById(_id, function(err, user) {
		done(err, user);
  	});
});


router.post('/login', passport.authenticate('local', {
	failureRedirect: 'login', failureFlash: true
	}), 
	function(req, res){
		req.flash('success_message', 'You are now Logged in!!');
	
  		res.redirect('/profile');
	}
);


// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth Signin
router.get('/register', (req, res) => {
      let errors = req.validationErrors();
    res.render('register',{errors: errors});
});

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/profile');
});


// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send(req.user);
    res.render('profile',{user:req.user});
});

// auth with Facebook
router.get('/facebook',passport.authenticate('facebook', {
     
  
   
}), function (){console.log("hello")});

// callback route for Facebook to redirect to
// hand control to passport to use code to grab profile info
router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
    // res.send(req.user);
    res.render('profile',{user:req.user});
    console.log(req.user)
});



  



module.exports = router;