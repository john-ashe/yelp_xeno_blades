const Blade = require('../models/blade');
const Comment = require('../models/comment');

const blade_seeds = [
	{
		name: "Pyra / Homura",
		element:"fire",
		weapon_class: "Aegis Sword",
		description: "Whatever iceland tote bag vaporware chia kickstarter subway tile green...",
		illustrator: "Masatsugu Saito",
		role: "Attack",
		voice_actor_en: "Skye Bennett",
		voice_actor_jp: "Shino Shimoji",
		merc_group: "Inflammables",
		aux_slots: 2,
		gacha: false,
		image_link: "https://vignette.wikia.nocookie.net/xenoblade/images/e/ee/Pyra_pic.png/revision/latest?cb=20200722214534"
	},
	{
		name: "Nia / Niyah",
		element: "water",
		weapon_class: "Catalyst Scimitar",
		description: "Nia usually comes across as sarcastic and cynical, always having a witty put-down at other characters' shortcomings. She is initially unfriendly and dismissive of Rex, particularly due to his belief in Elysium which she sees as childish naivety. She displays empathy for Pyra's situation and develops a teasing camaraderie with the rest of the party, warming especially to Rex as she gets to know him better.",
		illustrator: "Masatsugu Saito",
		role: "Healer",
		voice_actor_en: "Catrin-Mai Huw",
		voice_actor_jp: "Hitomi Ōwada",
		merc_group: "Katty Kompany",
		aux_slots: 3,
		gacha: false,
		image_link: "https://vignette.wikia.nocookie.net/xenoblade/images/4/4b/Nia_Blade_Portrait.png/revision/latest?cb=20200727205545"
	},
	{
		name: "Roc / Suzaku",
		element: "wind",
		weapon_class: "Dual Scythes",
		description: "Roc is proud and brusque, with excellent techniques and skill on the battlefield. His personality does not change when he is reawoken by Rex. He can grant tremendous power to his Driver Vandham, and his allies. He uses the power of wind. He is an anthropomorphic bird who fights using his powerful breath. His appearance is reminiscent of a cockerel (in-game portrait in particular), or a fowl in general as implied by his Japanese name, a reference to the Vermilion Peafowl.",
		illustrator: "Masatsugu Saito",
		role: "Attack",
		voice_actor_en: "Todd Kramer",
		voice_actor_jp: "Takahiro Fujimoto",
		merc_group: "Roc & the Roquettes",
		aux_slots: 2,
		gacha: false,
		image_link: "https://vignette.wikia.nocookie.net/xenoblade/images/6/60/Roc_Portrait.png/revision/latest?cb=20180306215144"
	},
	{
		name: "Mythra / Hikari",
		element: "light",
		weapon_class: "Aegis Sword",
		description: "Mythra is confident in herself, reckless, and independent. She has a short temper, a rude disposition, and is not afraid to openly express her thoughts. In Xenoblade Chronicles 2 she is rather calm and analytical. Mythra's powers have a focus on light-element attacks. Some of her other powers include near light-speed movement and Foresight, which allows her to seek into the immediate future. However, after Pyra shares her life force with Rex, Mythra becomes subject to the same limitations in regards to her healing capabilities and immortality.",
		illustrator: "Masatsugu Saito",
		role: "Attack",
		voice_actor_en: "Skye Bennett",
		voice_actor_jp: "Shino Shimoji",
		merc_group: "Mythra's Mynions",
		aux_slots: 2,
		gacha: false,
		image_link: "https://vignette.wikia.nocookie.net/xenoblade/images/5/56/Mythra-portrait.png/revision/latest?cb=20171222071213"
	},
	{
		name: "Crossette / Hibana",
		element: "fire",
		weapon_class: "Bitball",
		description: "Crossette is an emotional girl who always strives to better herself. She greatly idolizes Pyra for her kindness and cooking skills, although is very often at odds with Mythra, who Crossette dislikes. She can grant tremendous power to her Drivers and their allies. Crossette uses the Fire element, wields a Bitball, and acts as a Healer in battle. She can be awakened from the Ebullient Core Crystal after getting the A Firecracker of a Gal Key Item upon installation of the Patch (Ver.1.5.1) and the New Rare Blade Pack 2 from the Expansion Pass.",
		illustrator: "Atto",
		role: "Healer",
		voice_actor_en: "Morgan Cambs",
		voice_actor_jp: "Natsumi Takamori",
		merc_group: "Starmine Squad",
		aux_slots: 3,
		gacha: false,
		image_link: "https://vignette.wikia.nocookie.net/xenoblade/images/7/7d/Crossette_Portrait.png/revision/latest?cb=20180801165551"
	},
	{
		name: "Agate / Menō",
		element: "earth",
		weapon_class: "Greataxe",
		description: "Agate is a very helpful and protective Blade, willing to do whatever it takes to help the party. She is an avid geologist, with the grand aim of discovering a new mineral. However, she has a crippling fear of insects to the point where she will faint if one approaches her. She uses the earth element, wields a Greataxe, and acts as an Attacker in battle. Agate wields a beautiful yet powerful greataxe made of ore.",
		illustrator: "Yūsuke Kozaki",
		role: "Attack",
		voice_actor_en: "Laila Pyne",
		voice_actor_jp: "Atsumi Tanezaki",
		merc_group: "Frontier Falcons",
		aux_slots: 2,
		gacha: true,
		image_link: "https://vignette.wikia.nocookie.net/xenoblade/images/9/9c/Agate_Portrait.png/revision/latest?cb=20200722203625" 
	}
]

const seed = async () => {
	// Delete current blades and comments
	await Blade.deleteMany();
	console.log("Deleted all the Blades");
	
	await Comment.deleteMany();
	console.log("Deleted all the Comments");
	// Create new blades
	//for(const blade_seed of blade_seeds) {
	//	let blade = await Blade.create(blade_seed);
	//	console.log("Created a Blade! ", blade.name);
	//	// Create a new comment for each blade
	//	await Comment.create({
	//		text: "Best blade in the whole game",
	//		user: "XenoMan39",
	//		bladeId: blade._id
	//	})
	//	console.log("Created a new comment")
	//}
}

module.exports = seed;