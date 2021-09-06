
//import modules
const express = require('express');
const path = require('path');
const routeIndex = require('./routes/index');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const engine = require('ejs-mate');


//Initializations
const app = express();
//require('./database');
require('./passport/local-auth');


app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'resources')));
app.set(express.static(path.join(__dirname,'views')));

//Settings
app.set('port',process.env.PORT || 3200 );
app.set('views',path.join(__dirname,'views'));
app.engine('ejs', engine);
app.set('view engine','ejs');

//Middlewares
app.use(morgan('dev'));
app.use(session({
  secret: 'mysecretsession',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.user = req.user;
  console.log(app.locals)
  next();
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.use('/', require('./routes/index'));

//start server
app.listen(app.get('port'),()=>{
    console.log(`Server Listen to port ${app.get('port')}`);
});







