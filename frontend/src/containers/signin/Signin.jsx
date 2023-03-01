import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "../../components/imports";
import { Signup } from "../imports";
import "./signin.css";

const Signin = () => {
  const [signUpIsHidden, setSignUpIsHidden] = useState(false);
  const [validationErr, setValidationErr] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const toggleSignup = () => {
    setSignUpIsHidden(!signUpIsHidden);
  };

  const postData = async () => {
    await axios
      .post("http://localhost:3001/user/signin", userData)
      .then((response) => {
        setValidationErr("");
        navigate("/");
      })
      .catch((err) => {
        setValidationErr(err.response.data.message);
      });
  };
  const changeHandler = (e) => {
    setValidationErr("");
    let user = { ...userData };
    user[e.target.name] = e.target.value;
    setUserData(user);
  };
  const submitFormHandler = (event) => {
    event.preventDefault();
    console.log(userData);
    if (userData.email === "" || userData.password === "") {
      setValidationErr("Enter your email and password");
    } else {
      postData();
      setValidationErr("");
    }
  };

  return (
    <div className="facebook__registration section-padding">
      <div className="facebook__signin-content">
        <div className="facebook__signin-content_declaration">
          <img src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg" />
          <h5>
            Facebook helps you connect and share with the people in your life.
          </h5>
        </div>
        <div className="facebook__signin-content-account">
          <Form
            onSubmit={submitFormHandler}
            className="facebook__signin-content_account-form"
          >
            <Input
              onChange={changeHandler}
              type="email"
              placeholder="Email address or phone number"
              value={userData.email}
              name='email'
            />
            <Input
              onChange={changeHandler}
              type="password"
              placeholder="Password"
              value={userData.password}
              name='password'
            />
            {validationErr ? (
              <div className="facebook__error-content">
                <p>{validationErr}</p>
              </div>
            ) : (
              ""
            )}
            <Button
              type="submit"
              className="facebook__signin-content_account-form_login"
            >
              Log in
            </Button>
            <a href="#">Forgotten password?</a>
            <Button
              toggleSignup={toggleSignup}
              className="facebook__signin-content_acoount-form_create"
              type="button"
            >
              Create New Account
            </Button>
          </Form>
          <p className="facebook__signin-content-account_createpage">
            <a href="#">Create a page</a>for a celebrity, brand or business.
          </p>
        </div>
      </div>
      {signUpIsHidden && <Signup toggleSignup={toggleSignup} />}
    </div>
  );
};

export default Signin;
