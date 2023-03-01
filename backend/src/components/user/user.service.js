const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("./user.model");
const Joi = require("joi");

const schema = Joi.object({
  firstName: Joi.string().required().min(3).max(15),
  surName: Joi.string().required().min(3).max(15),
  password: Joi.string()
    .required()
    .min(6)
    .max(20)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  age: Joi.number().min(16).max(90).required(),
  gender: Joi.string().required(),
});

exports.signup = async (req, res, next) => {
  let { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json(error);
  } else {
    const { firstName, surName, password, email, birthDate, gender } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      res.status(400).json({
        message: "Email already exists",
      });
    } else {
      bcrypt.hash(password, 10, async (err, hash) => {
        await userModel.insertMany({
          firstName,
          surName,
          password: hash,
          email,
          birthDate,
          gender,
        });
        res.status(201).json({
          message: "Signup success",
        });
      });
    }
  }
};

module.exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    console.log(user, password);
    if (match) {
      const token = jwt.sign(
        {
          id: user._id,
          email,
          name: user.firstName + user.surName,
        },
        "boda"
      );
      res.status(200).json({
        token,
      });
    } else {
      res.status(401).json({
        message: "Password is incorrect",
      });
    }
  } else {
    res.status(400).json({
      message: "User not found",
    });
  }
};
