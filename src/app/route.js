module.exports=(app, passport)=> {

   app.get('/', (req, res)=>{ res.render('index');
});



// login 
app.get('/login', (req, res)=>{
   res.render('login.ejs', {
      message: req.flash('loginMessage')
   });
});

app.post('/login', passport.authenticate('local-login',{
   successRedirect:'/T1',
   failureRedirect:'/login',
   failureFlash: true
}));

//signup
app.get('/signup', (req, res)=>{
   res.render('signup.ejs', {
      message: req.flash('signupMessage')
   });
});
app.post('/signup', passport.authenticate('local-signup',{
   successRedirect:'/login',
   failureRedirect:'/signup',
   failureFlash: true //allow flash messages
}));

//T1
app.get('/T1', isLoggedIn, (req, res) => { 
   res.render('T1', {
      user: req.user
 });
});


//logout
app.get('/logout',(req, res)=>{
   req.logout();
   res.redirect('/');
});
};

function isLoggedIn(req, res, next){
   if(req.isAuthenticated()){
      return next();
   }
   res.redirect('/');
}