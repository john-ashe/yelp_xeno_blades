const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

// Sign Up - new
router.get('/signup', (req, res) => {
	res.render('signup');
});

// Sign Up - create
router.post('/signup', async (req, res) => {
	try {
		const newUser = await User.register( new User({
			username: req.body.username,
			email: req.body.email
		}), req.body.password);
		req.flash("success", `Signed up as ${newUser.username}`);
		passport.authenticate('local')(req, res, () => {
			res.redirect('/blades');
		});
	} catch (err) {
		console.log(err);
		res.send(err);
	}
});

// Login - form
router.get('/login', (req, res) => {
	res.render('login');
})

// Login
router.post('/login', passport.authenticate('local', {
	successRedirect: '/blades',
	failureRedirect: '/login',
	failureFlash: true,
	successFlash: "Logged in Successfully"
}));

// Logout
router.get('/logout', (req, res) => {
	req.logout();
	req.flash("success", "Logged you out");
	res.redirect('/blades');
})

module.exports = router;