import React from 'react'
import './form.css'
const Form = props => {
  return (
    <form onSubmit={props.onSubmit} className={`${props.className} + " " + facebook__form`}>{props.children}</form>
  )
}

export default Form