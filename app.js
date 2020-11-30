//===================
// IMPORTS
//===================
// NPM Imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
//const morgan = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

// Config Imports
try {
	var config = require('./config');
} catch (e) {
	console.log("Could not import config, which probably means your not working locally.");
	console.log(e);
}


// Route Imports
const bladeRoutes = require('./routes/blades');
const commentRoutes = require('./routes/comments');
const mainRoutes = require('./routes/main');
const authRoutes = require('./routes/auth');

// Model Imports
const Blade = require('./models/blade');
const Comment = require('./models/comment');
const User = require('./models/user');


//===================
// DEVELOPMENT
//===================
// Morgan
//app.use(morgan('tiny'));

// Seed the DB
//const seed = require('./utils/seed');
//seed();

//===================
// CONFIG
//===================
// Connect to DB
try {
	mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
} catch(e) {
	console.log("Could not connect using config. This probably means your not running locally.");
	mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
}

mongoose.Promise = global.Promise;

// Express Config
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.json({
	type: ["application/json", "text/plain"]
}));

// Express Session Config
app.use(expressSession({
	secret: process.env.ES_SECRET || config.expressSession.secret,
	resave: false,
	saveUninitialized: false
}));

// Body Parser Config
app.use(bodyParser.urlencoded({extended: true}));

// Method Override Config
app.use(methodOverride('_method'));

// Connect flash
app.use(flash());

// Passport config
app.use(passport.initialize());
app.use(passport.session()); // allows persistant sessions
passport.serializeUser(User.serializeUser()); // what data should be stored
passport.deserializeUser(User.deserializeUser()); // get data from session
passport.use(new LocalStrategy(User.authenticate())); // use local strategey

// State Config
app.use((req, res, next) => {
	res.locals.user = req.user;
	res.locals.errorMessage = req.flash("error");
	res.locals.successMessage = req.flash("success");
	next();
})

// Routes Config
app.use("/", mainRoutes);
app.use("/", authRoutes);
app.use("/blades", bladeRoutes);
app.use("/blades/:id/comments", commentRoutes);

//===================
// LISTEN
//===================
app.listen(process.env.PORT || 3000, () => {
	console.log("yelp_xeno_blades is running");
})