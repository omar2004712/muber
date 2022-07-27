const express = require("express");

const app = express();
const mainRouter = require("./routes/routes");

app.use(mainRouter);

module.exports = app;
