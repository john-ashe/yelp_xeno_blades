const express = require('express');
const router = express.Router({mergeParams: true});
const Comment = require('../models/comment');
const Blade = require('../models/blade');
const isLoggedIn = require('../utils/isLoggedIn');
const checkCommentOwner = require('../utils/checkCommentOwner');

router.get("/new", isLoggedIn, (req, res) => {
	res.render("comments_new", {bladeId: req.params.id})	
})
	
// Create Comment - Actually update DB
router.post("/", isLoggedIn, async (req, res) => {
	try {
		const comment = await Comment.create({
			user: {
				id: req.user._id,
				username: req.user.username
			},
			text: req.body.text,
			bladeId: req.body.bladeId
		});
		req.flash("success", "Comment added");
		res.redirect(`/blades/${req.body.bladeId}`)
	} catch (err) {
		console.log(err);
		req.flash("error", "Error creating comment");
		res.redirect("/blades");
	}
	
	
})

// Edit Comment
router.get("/:commentId/edit", checkCommentOwner, async (req, res) => {
	try {
		const blade = await Blade.findById(req.params.id).exec();
		const comment = await Comment.findById(req.params.commentId).exec();
		res.render("comments_edit", {blade, comment});
	} catch (err) {
		console.log(err);
		res.redirect("/blades");
	}
})

//Update Comment
router.put("/:commentId", checkCommentOwner, async (req, res) => {
	try {
		const comment = await Comment.findByIdAndUpdate(req.params.commentId, {text: req.body.text}, {new: true});
		console.log(comment);
		req.flash("success", "Comment updated");
		res.redirect(`/blades/${req.params.id}`);
	} catch (err) {
		console.log(err);
		req.flash("error", "Error editing blade");
		res.redirect("/blades");
	}
})

//Delete Comment
router.delete("/:commentId", checkCommentOwner, async (req, res) => {
	try {
		const comment = await Comment.findByIdAndDelete(req.params.commentId);
		req.flash("success", "Comment deleted");
		res.redirect(`/blades/${req.params.id}`);
	} catch (err) {
		console.log(err);
		req.flash("error", "Error deleting comment");
		res.redirect("/blades");
	}
})


module.exports = router;