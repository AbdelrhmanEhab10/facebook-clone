const { timeStamp } = require("console");
const { string } = require("joi");
const { Types, Schema, model } = require("mongoose");
const schema = Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "user name must be at least 2 characters"],
    },
    surName: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "user name must be at least 2 characters"],
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "password must be at least 6 characters"],
    },
    email: {
      type: String,
      required: true,
    },
    birthDate: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("User", schema);
