import React, { forwardRef, useState } from "react";
import { BiError } from "react-icons/bi";

import "./input.css";
const Input = forwardRef((props, ref) => {
  const [errTextShown, setErrTextShown] = useState(false);
  let inputStyle = `facebook__signin-content_account-form_input ${props.className}`;
  return (
    <div className="error__input-container">
      <input
        onFocus={() => setErrTextShown(true)}
        onSelect={props.onSelect}
        onKeyDown={props.onKeyDown}
        onChange={props.onChange}
        ref={ref}
        className={
          props.validationErr
            ? inputStyle + " " + "facebook__input-err"
            : inputStyle
        }
        type={props.type}
        placeholder={props.placeholder}
        id={props.id}
        name={props.name}
      />
      {props.validationErr ? (
        <>
          <BiError color="red" size={20} className="facebook__input-err_icon" />
          <span
            className={
              errTextShown
                ? "facebook__input-err_text show"
                : "facebook__input-err_text"
            }
          >
            {props.validationErr}
          </span>
        </>
      ) : (
        ""
      )}
    </div>
  );
});

export default Input;
