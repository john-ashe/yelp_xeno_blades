const express = require('express');
const router = express.Router();
const Blade = require('../models/blade');
const Comment = require('../models/comment');
const isLoggedIn = require('../utils/isLoggedIn');
const checkBladeOwner = require('../utils/checkBladeOwner');

// Index
router.get("/", async (req, res) => {
	console.log(req.user);
	try {
		const blades = await Blade.find().exec()
		res.render("blades", {blades});
	} catch (err) {
		console.log(err);
		res.send("you broke it... /index");
	}
})

// Create
router.post("/", isLoggedIn, async (req, res) => {
	const element = req.body.element.toLowerCase();
	const newBlade = {
		name: req.body.name,
		element,
		weapon_class: req.body.weapon_class,
		description: req.body.description,
		illustrator: req.body.illustrator,
		role: req.body.role,
		voice_actor_en: req.body.voice_actor_en,
		voice_actor_jp: req.body.voice_actor_jp,
		merc_group: req.body.merc_group,
		aux_slots: req.body.aux_slots,
		gacha: !!req.body.gacha,
		image_link: req.body.image_link,
		owner: {
			id: req.user._id,
			username: req.user.username
		}
	}
	try {
		const blade = await Blade.create(newBlade);
		console.log(blade);
		res.redirect("/blades/" + blade._id);
	} catch (err) {
		console.log(err);
		res.send("you broke it... /blades POST")
	}
})

//New
router.get("/new", isLoggedIn, (req, res) => {
	res.render("blades_new");
})

// Search
router.get("/search", async (req, res) => {
	try {
		const blades = await Blade.find({
			$text: {
				$search: req.query.term
			}
		});
		res.render("blades", {blades});
	} catch (err) {
		console.log(err);
		res.send("broken search");
	}
})

// Show
router.get("/:id", async (req, res) => {
	try {
		const blade = await Blade.findById(req.params.id).exec();
		const comments = await Comment.find({bladeId: req.params.id});
		res.render("blades_show", {blade, comments});
	} catch (err) {
		console.log(err);
		res.send("you broke it... /blades/:id");
	}	
})

// Edit
router.get("/:id/edit", checkBladeOwner, async (req, res) => {
	const blade = await Blade.findById(req.params.id).exec();
	res.render("blades_edit", {blade});
})

// Update
router.put("/:id", checkBladeOwner, async (req, res) => {
	const element = req.body.element.toLowerCase();
	const bladeBody = {
		name: req.body.name,
		element,
		weapon_class: req.body.weapon_class,
		description: req.body.description,
		illustrator: req.body.illustrator,
		role: req.body.role,
		voice_actor_en: req.body.voice_actor_en,
		voice_actor_jp: req.body.voice_actor_jp,
		merc_group: req.body.merc_group,
		aux_slots: req.body.aux_slots,
		gacha: !!req.body.gacha,
		image_link: req.body.image_link
	}
	try {
		const blade = await Blade.findByIdAndUpdate(req.params.id, bladeBody, {new: true}).exec();
		res.redirect(`/blades/${req.params.id}`);
	} catch (err) {
		console.log(err);
		res.send("Broken again... /blades/id PUT");
	}
	
})

//Delete
router.delete("/:id", checkBladeOwner, async (req, res) => {
	try { 
		const delectedBlade = await Blade.findByIdAndDelete(req.params.id).exec();
		console.log(delectedBlade);
		res.redirect("/blades");
	} catch (err) {
		console.log(err);
		res.send("Brokennn /blades/id DELETE");
	}
})



module.exports = router;