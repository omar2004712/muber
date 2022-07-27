const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const mainRouter = require("./routes/routes");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/muber");

app.use(bodyParser.json());

app.use(mainRouter);

module.exports = app;
