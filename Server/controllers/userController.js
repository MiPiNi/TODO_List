const express = require("express");
const router = express.Router();

const { User } = require("../models/user");

router.get("/:id", (req, res) => {
	User.findById(req.params.id)
		.select("username tasks")
		.exec((err, data) => {
			if (err) return console.error(err);
			res.send(data);
		});
});

router.post("/:id/AddTask", (req, res) => {
	User.findById(req.params.id, (err, data) => {
		if (err) return console.error(err);
		data.tasks.push({
			title: req.body.title,
			completed: req.body.completed ? req.body.completed : false,
		});
		data.save((err, data) => {
			if (err) return console.error(err);
			res.send(data);
		});
	});
});

router.put("/:id/RemoveTask", (req, res) => {
	User.updateOne(
		{ _id: req.params.id },
		{ $pull: { tasks: { _id: req.body.objectId } } },
		(err, data) => {
			if (err) return console.error(err);
			res.send(data);
		}
	);
});

router.put("/:id/UpdateTask", (req, res) => {
	User.updateOne(
		{ _id: req.params.id, "tasks._id": req.body.objectId },
		{ $set: { "tasks.$.title": req.body.title } },
		(err, data) => {
			if (err) return console.error(err);
			res.send(data);
		}
	);
});

router.put("/:id/CompleteTask", (req, res) => {
	User.updateOne(
		{ _id: req.params.id, "tasks._id": req.body.objectId },
		{ $set: { "tasks.$.completed": req.body.completed } },
		(err, data) => {
			if (err) return console.error(err);
			res.send(data);
		}
	);
});

module.exports = router;