const express = require("express");
const router = express.Router();

const { User } = require("../models/user");

// get user by username and password
// on success, return user object without password and __v
// on failure, return message
router.post("/login", (req, res) => {
	User.findOne({ username: req.body.username, password: req.body.password })
		.select("-__v -password")
		.exec((err, docs) => {
			if (err) return res.send({ message: err });
			if (docs == null) return res.send({ message: "User not found" });
			res.send({
				_id: docs._id,
				username: docs.username,
				tasks: docs.tasks,
			});
		});
});

// register a new user with username and password
// on success, return user _id
// on failure, return message
router.post("/register", (req, res) => {
	if (req.body.username == "" || req.body.password == "")
		return res.send({ message: "Username or password cannot be empty" });
	var user = new User({
		// create new user with given username and password and empty task array
		username: req.body.username,
		password: req.body.password,
		tasks: [],
	});
	user.save((err, docs) => {
		if (err) {
			if (err.code == 11000)
				// duplicate key error
				return res.send({ message: "Username already exists" });
			return console.error(err);
		}
		res.send({ _id: docs._id });
	});
});

module.exports = router;
