const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	user: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	text: String,
	bladeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Blade"
	} 
});

module.exports = mongoose.model("comment", commentSchema);