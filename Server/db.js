const mongoose = require("mongoose");

mongoose.connect(
	"mongodb://localhost:27017/TODO_List",
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
		if (err) return console.error("MongoDB Connection Error.\n", err);
		console.log("MongoDB Connection Succeeded.");
	}
);

module.exports = mongoose;
