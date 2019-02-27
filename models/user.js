const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');
const passport=require('passport');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        index:true
    },
    
    lastname:{
        type:String
    },
    
    email:{
        type:String
    },
    
    password:{
        type:String
    }
    
});

const User = mongoose.model('User', userSchema);


const createUser=(newUser, callback) => {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
   
        newUser.password = hash;
        newUser.save(callback);
    });
  });
}

const getUserByEmail = (email, callback) => {
  let Obj = {email: email}
  User.findOne(Obj, callback);
}

const comparePassword = (password, hash, callback) => {
	bcrypt.compare(password, hash, function(err, isMatch){
		if(err) throw err;
		callback(null, isMatch);
	});
}

const getUserById = (id, callback) => {
  	User.findById(id, callback);
}
module.exports={
    
    createUser,
    User,
    getUserByEmail,
    comparePassword,
    getUserById
}