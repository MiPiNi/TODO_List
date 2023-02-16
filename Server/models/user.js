const mongoose = require("mongoose");

const User = mongoose.model("User", {
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	tasks: {
		type: [
			{
				title: { type: String, required: true },
				completed: { type: Boolean, default: true },
			},
		],
	},
});

module.exports = { User };
