const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const port = 3001;

app.use(express.json());
app.use(cors());

app.use("/user", require("./src/components/user/user.api"));

mongoose
  .connect("mongodb://0.0.0.0:27017/facebook")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => console.log("Example app listening on port " + port));
