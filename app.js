//===================
// IMPORTS
//===================
// NPM Imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

// Config Imports
const config = require('./config');

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
app.use(morgan('tiny'));

// Seed the DB
//const seed = require('./utils/seed');
//seed();

//===================
// CONFIG
//===================
// Connect to DB
mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.Promise = global.Promise;

// Express Config
app.set("view engine", "ejs");
app.use(express.static('public'));

// Express Session Config
app.use(expressSession({
	secret: "6refy3wjgryughrkeugrtyrry43ugrfbeufkg47u",
	resave: false,
	saveUninitialized: false
}));

// Body Parser Config
app.use(bodyParser.urlencoded({extended: true}));

// Method Override Config
app.use(methodOverride('_method'));

// Passport config
app.use(passport.initialize());
app.use(passport.session()); // allows persistant sessions
passport.serializeUser(User.serializeUser()); // what data should be stored
passport.deserializeUser(User.deserializeUser()); // get data from session
passport.use(new LocalStrategy(User.authenticate())); // use local strategey

// Current User Middleware Config
app.use((req, res, next) => {
	res.locals.user = req.user;
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
app.listen(3000, () => {
	console.log("yelp_xeno_blades is running");
})