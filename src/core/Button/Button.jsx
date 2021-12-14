import "./button.css";

const Button = (props) => (
  <button
    title={props.title}
    type={props.type}
    className={props.className}
    onClick={props.onClick}
    disabled={props.disabled}>
    {props.value}
  </button>
);

export default Button;
