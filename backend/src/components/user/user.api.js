const { signup, signin } = require("./user.service");

const app = require("express").Router();

app.post("/signup", signup);
app.post("/signin", signin);

module.exports = app;
