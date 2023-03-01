import React from 'react'
import './button.css'
const Button = props => {

  return (
    <button onClick={props.toggleSignup} className={`${props.className} + " " + facebook_button`} type={props.type}>{props.children}</button>
  )
}

export default Button