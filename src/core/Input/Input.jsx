import React from "react";
import "./input.css";

const Input = React.forwardRef((props, ref) => (
  <input
    type={props.type}
    id={props.id}
    className={props.className}
    onClick={props.onClick}
    placeholder={props.placeholder}
    disabled={props.disabled}
    min={props.min}
    max={props.max}
    ref={ref}
  />
));

export default Input;
