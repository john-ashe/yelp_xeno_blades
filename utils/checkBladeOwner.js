const Blade = require('../models/blade');

const checkBladeOwner = async(req, res, next) => {
	if (req.isAuthenticated()) {
		const blade = await Blade.findById(req.params.id).exec();
		if(blade.owner.id.equals(req.user._id)) {
			next();
		} else {
			res.redirect('back');
		}
	} else {
		res.redirect('/login');
	}
}

module.exports = checkBladeOwner;