const express = require("express");
const router = express.Router();

const { User } = require("../models/user");

router.post("/login", (req, res) => {
	User.findOne(
		{ username: req.body.username, password: req.body.password },
		(err, docs) => {
			if (err) return console.error(err);
			res.send(docs._id);
		}
	);
});
router.post("/register", (req, res) => {
	var user = new User({
		username: req.body.username,
		password: req.body.password,
		tasks: [],
	});
	user.save((err, docs) => {
		if (err) return console.error(err);
		res.send(docs);
	});
});

module.exports = router;
