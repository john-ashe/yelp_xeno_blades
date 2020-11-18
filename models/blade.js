const mongoose = require('mongoose');

const bladeSchema = new mongoose.Schema({
	name: String,
	element: String,
	weapon_class: String,
	description: String,
	illustrator: String,
	role: String,
	voice_actor_en: String,
	voice_actor_jp: String,
	merc_group: String,
	aux_slots: Number,
	gacha: Boolean,
	image_link: String,
	owner: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

bladeSchema.index({
	'$**': 'text'
});

module.exports = mongoose.model("blade", bladeSchema);