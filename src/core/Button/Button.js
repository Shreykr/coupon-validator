import "./button.css";

const Button = (props) => (
  <button
    type={props.type}
    className={props.className}
    onClick={props.onClick}
    placeholder={props.placeholder}
    disabled={props.disabled}>
    {props.value}
  </button>
);

export default Button;
