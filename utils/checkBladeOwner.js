const Blade = require('../models/blade');

const checkBladeOwner = async(req, res, next) => {
	if (req.isAuthenticated()) {
		const blade = await Blade.findById(req.params.id).exec();
		if(blade.owner.id.equals(req.user._id)) {
			next();
		} else {
			req.flash("error", "You don't have permision to do that");
			res.redirect('back');
		}
	} else {
		req.flash("error", "You must login to do that");
		res.redirect('/login');
	}
}

module.exports = checkBladeOwner;