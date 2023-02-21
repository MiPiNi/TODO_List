const express = require("express");
const router = express.Router();

const { User } = require("../models/user");

//get all tasks of a user
router.get("/:id", (req, res) => {
	User.findById(req.params.id)
		.select("tasks -_id")
		.exec((err, data) => {
			if (err) return console.error(err);
			res.send(data.tasks);
		});
});

//add task to a user
router.post("/:id/AddTask", (req, res) => {
	User.findById(req.params.id, (err, data) => {
		if (err) return res.send({ title: req.body.title, message: err });
		data.tasks.push({
			title: req.body.title,
			completed: req.body.completed ? req.body.completed : false,
		});
		data.save((err, data) => {
			if (err)
				return res.send({
					title: req.body.title,
					message: `Saving error: ${err}`,
				});
			res.send({ message: "Success" });
		});
	});
});

//remove task from a user
router.put("/:id/RemoveTask", (req, res) => {
	User.updateOne(
		{ _id: req.params.id },
		{ $pull: { tasks: { _id: req.body.objectId } } },
		(err, data) => {
			if (err) return res.send({ _id: req.body.objectId, message: err });
			res.send({ message: "Success" });
		}
	);
});

//update a task title of a user
router.put("/:id/UpdateTask", (req, res) => {
	User.updateOne(
		{ _id: req.params.id, "tasks._id": req.body.objectId },
		{ $set: { "tasks.$.title": req.body.title } },
		(err, data) => {
			if (err) return res.send({ _id: req.body.objectId, message: err });
			res.send({ message: "Success" });
		}
	);
});

//update a task completed status of a user
router.put("/:id/CompleteTask", (req, res) => {
	User.updateOne(
		{ _id: req.params.id, "tasks._id": req.body.objectId },
		{ $set: { "tasks.$.completed": true } },
		(err, data) => {
			if (err) return res.send({ _id: req.body.objectId, message: err });
			res.send({ message: "Success" });
		}
	);
});

module.exports = router;
