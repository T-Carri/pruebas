const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
local: {
  //  user: String,
    email: String, 
    password: String
    
},
facebook: {
    id: String, 
    token: String,
    email: String,
    password:String
},
google: {
    id: String,
    token: String,
    email: String,
    password: String
},

});

//generating a hash

userSchema.methods.generateHash=function (password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

};

//cheking if password is valid
userSchema.methods.validPassword=function(password){
    return bcrypt.compareSync(password, this.local.password);
};

//create the model for user and expose it tou our app

module.exports= mongoose.model('User', userSchema);

