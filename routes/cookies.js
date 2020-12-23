const express = require('express');
const router = express.Router();

// base cookie page
router.get("/", (req, res) => {
	res.render('cookies');
});

module.exports = router;