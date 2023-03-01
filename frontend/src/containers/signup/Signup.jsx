import React, { useState } from "react";
import { Button, Form, Input, Modal } from "../../components/imports";
import { AiOutlineClose } from "react-icons/ai";
import Joi from "joi";
import axios from "axios";
import "./signup.css";

const Signup = (props) => {
  const [validationErr, setValidationErr] = useState({});
  const [userData, setUserData] = useState({});

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

  const removeErr = (e) => {
    validationErr[e.target.name] = "";
  };

  const getUserData = (event) => {
    let user = { ...userData };
    if (event.target.name === "gender") {
      user[event.target.name] = event.target.id;
    } else {
      user[event.target.name] = event.target.value;
    }
    removeErr(event);
    setUserData(user);
  };

  const postData = async () => {
    await axios
      .post("http://localhost:3001/user/signup", userData)
      .then((response) => {
        console.log(response.data);
        props.toggleSignup();
      })
      .catch((err) => {
        let validationErrors = { ...validationErr };
        validationErrors.email = err.response.data.message;
        setValidationErr(validationErrors);
      });
  };

  const validateUserData = () => {
    const validation = schema.validate(userData, { abortEarly: false });
    if (validation.error) {
      let validationErrors = { ...validationErr };
      validation.error.details.map((err) => {
        validationErrors[err.message.split('"')[1]] = err.message
          .split('"')[2]
          .trimStart();
        setValidationErr(validationErrors);
      });
    } else {
      postData();
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    validateUserData();
  };

  return (
    <Modal onSubmit={submitHandler} className="facebook__signup">
      <div className="facebook__signup-header">
        <div className="facebook__signup-header_content">
          <h2>Sign Up</h2>
          <p>It's quick and easy</p>
        </div>
        <div className="facebook__close">
          <AiOutlineClose size={20} onClick={props.toggleSignup} />
        </div>
      </div>
      <div className="facebook__signup-form_username">
        <Input
          type="text"
          placeholder="First name"
          name="firstName"
          onChange={getUserData}
          className="facebook__signup-form_input"
          validationErr={validationErr.firstName}
        />
        <Input
          type="text"
          placeholder="Surname"
          name="surName"
          onChange={getUserData}
          className="facebook__signup-form_input"
          validationErr={validationErr.surName}
        />
      </div>
      <Input
        type="text"
        placeholder="Email address"
        name="email"
        onChange={getUserData}
        className="facebook__signup-form_input"
        validationErr={validationErr.email}
      />
      <Input
        type="password"
        placeholder="New password"
        name="password"
        onChange={getUserData}
        className="facebook__signup-form_input"
        validationErr={validationErr.password}
      />
      <div className="facebook__signup-form_input-date_container">
        <span>Age</span>
        <Input
          type="text"
          placeholder="Age"
          name="age"
          onChange={getUserData}
          className="facebook__signup-form_input"
          validationErr={validationErr.age}
        />
      </div>
      <div className="facebook__signup-form_input-gender_container">
        <span>Gender</span>
        <div className="facebook__signup-form_input-gender_container-radio_container">
          <div
            className={`facebook__signup-form_input-gender_container-radio ${
              validationErr.gender ? "facebook__input-err" : ""
            }`}
          >
            <label htmlFor="female">Female</label>
            <Input
              type="radio"
              value="female"
              name="gender"
              onChange={getUserData}
              id="female"
              className="facebook__signup-form_input-gender"
            />
          </div>
          <div
            className={`facebook__signup-form_input-gender_container-radio ${
              validationErr.gender ? "facebook__input-err" : ""
            }`}
          >
            <label htmlFor="male">Male</label>
            <Input
              type="radio"
              value="male"
              name="gender"
              onChange={getUserData}
              id="male"
              className="facebook__signup-form_input-gender"
              validationErr={validationErr.gender}
            />
          </div>
        </div>
      </div>
      <div className="facebook__signup-form_p">
        <p>
          People who use our service may have uploaded your contact information
          to Facebook. <a href="#">Learn more.</a>
        </p>
        <p>
          By clicking Sign Up, you agree to our{" "}
          <a href="#">Terms, Privacy Policy</a> and{" "}
          <a href="#">Cookies Policy</a>. You may receive SMS notifications from
          us and can opt out at any time.
        </p>
      </div>
      <Button type="submit" className="facebook__signup-form_signup">
        Sign Up
      </Button>
    </Modal>
  );
};

export default Signup;
