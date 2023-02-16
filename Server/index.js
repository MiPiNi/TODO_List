const express = require("express");
const bodyParser = require("body-parser");

const { mongoose } = require("./db.js");
const userController = require("./controllers/userController.js");
const loginController = require("./controllers/loginController.js");

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log("Server started at port : 3000"));

app.use("/user", userController);
app.use("/", loginController);
