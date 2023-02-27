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
// on success, return 'Success'
// on failure, return task title and error message
router.post("/:id/AddTask", (req, res) => {
	User.findById(req.params.id, (err, data) => {
		//find user by id
		if (err) return res.send({ title: req.body.title, message: err });
		data.tasks.push({
			//push new task to user's task array
			title: req.body.title,
			completed: req.body.completed ? req.body.completed : false, //if completed is not provided, set it to false
		});
		data.save((err, data) => {
			//save user with updated task array to database
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
// on success, return 'Success'
// on failure, return task _id and error message
router.put("/:id/RemoveTask", (req, res) => {
	User.updateOne(
		//update user by id
		{ _id: req.params.id }, //find user by id
		{ $pull: { tasks: { _id: req.body.objectId } } }, //remove task with given _id (objectId) from user's task array
		(err, data) => {
			if (err) return res.send({ _id: req.body.objectId, message: err });
			res.send({ message: "Success" });
		}
	);
});

//update a task title of a user
// on success, return 'Success'
// on failure, return task _id and error message
router.put("/:id/UpdateTask", (req, res) => {
	User.updateOne(
		//update user by id
		{ _id: req.params.id, "tasks._id": req.body.objectId }, //find user by id and task with given _id (objectId)
		{ $set: { "tasks.$.title": req.body.title } }, //update task title property to given title
		(err, data) => {
			if (err) return res.send({ _id: req.body.objectId, message: err });
			res.send({ message: "Success" });
		}
	);
});

//update a task completed status of a user
// on success, return 'Success'
// on failure, return task _id and error message
router.put("/:id/CompleteTask", (req, res) => {
	User.updateOne(
		//update user by id
		{ _id: req.params.id, "tasks._id": req.body.objectId }, //find user by id and task with given _id (objectId)
		{ $set: { "tasks.$.completed": true } }, //update task completed property to true
		(err, data) => {
			if (err) return res.send({ _id: req.body.objectId, message: err });
			res.send({ message: "Success" });
		}
	);
});

module.exports = router;
