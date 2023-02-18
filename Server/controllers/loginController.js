const express = require("express");
const router = express.Router();

const { User } = require("../models/user");

// get user by username and password
// if user does not exist, returns null
router.post("/login", (req, res) => {
	User.findOne(
		{ username: req.body.username, password: req.body.password },
		(err, docs) => {
			if (err) return console.error(err);
			res.send(docs);
		}
	);
});

// register a new user with username and password
// if username already exists or one of fields are empty, return message
router.post("/register", (req, res) => {
	if (req.body.username == "" || req.body.password == "")
		return res.send({ message: "Username or password cannot be empty" });
	var user = new User({
		username: req.body.username,
		password: req.body.password,
		tasks: [],
	});
	user.save((err, docs) => {
		if (err) {
			if (err.code == 11000)
				return res.send({ message: "Username already exists" });
			return console.error(err);
		}
		res.send(docs);
	});
});

module.exports = router;
