const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const session=require('express-session');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const bodyParser=require('body-parser');
const app = express();
const flash=require('connect-flash');
const LocalStrategy = require('passport-local').Strategy;
const expressValidator=require('express-validator');
const msg=require('express-messages');
const cookieParser=require('cookie-parser');
const path=require('path');
var http = require("http")
var socketio = require('socket.io');
var server = app.listen(process.env.PORT || 3000,function(){
  console.log("Chat server listening at");
});
var io = require('socket.io').listen(server);

//use public files 

var userCount = 0;

//listen on every connection
io.on('connection', (socket) => {
	console.log('New user connected')
	
    userCount++;
	//default username
	socket.username = "Anonymous"
	
// send number of users	
 io.sockets.emit('userCount', { userCount: userCount });
 
 
 
    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    });
    socket.on('disconnect', function (data) {
    	io.sockets.emit('disconnect', {username : socket.username});
    	 userCount--;
    io.sockets.emit('userCount', { userCount: userCount });
  });
})



















app.use(express.static(__dirname + '/public'));

app.use(cookieParser());

app.use(session({
	secret: 'keyboard cat',
	saveUninitialized: true,
		resave: true
}));

app.use(passport.initialize());
app.use(passport.session());


//body-parser
// Add this line below
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(cookeParser);
// set view engine
app.set('view engine', 'ejs');

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb');
});



// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home', { user: req.user });
    
});


// create home route
app.get('/test', (req, res) => {
    res.render('test');
    
});




