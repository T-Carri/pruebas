const LocalStrategy= require('passport-local').Strategy;
const User=require('../app/models/user');

module.exports=function(passport){
//required for persistent loggin sessions
//passport needs ability to serialize and unserialize an userialize users out of session
passport.serializeUser(function(user, done){
    done(null, user.id);
});
//used to deserialize user
passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        done(err, user);
    });
});

//singup
passport.use('local-signup', new LocalStrategy({
    //by default local strategy uses username and password, we will override with email
  //  userfield: 'user',
  usernameField:'email',
  passwordField:'password',
 passReqToCallback:true //allow us to pass back the entire request  to the callback    
}, function(req, email, password, done){
    console.log(" email es:" + email, "password es:"+ password);
    User.findOne({'local.email':email}, function(err, user){
        if(err){
            return done(err);
        }
        if(user){
            return done(null, false, req.flash('signupMessage', 'Este correo ya esta registrado'));
        } else { 
            var newUser= new User();
          //  newUser.local.user=user;
            newUser.local.email=email;
            newUser.local.password=newUser.generateHash(password);
            newUser.save(function(err){
                if(err){throw err;}
            return done(null, newUser);
    });
        }
    });
}));

//login
//we are using named strategies since we have one for login and one for singup
//by default, if there was no name, it would just be called 'local'
passport.use('local-login', new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
 passReqToCallback:true
}, function(req, email, password, done){
    console.log("el email es:" + email, "password es:"+ password);
    User.findOne({'local.email':email}, function(err, user){
        if(err){return done(err);
        }
        if(!user){
            return done(null, false, req.flash('loginMessage', 'Usuario incorrecto'));
        } if(!user.validPassword(password)){
            return done(null, false, req.flash('loginMessage', 'Contraseña incorrecta'));
        }
        return done (null, user);
    });
}));
}