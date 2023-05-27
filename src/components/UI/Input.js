import style from "./Input.module.css";
import React from "react";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={style.input}>
      <label>{props.label}</label>
      <input ref={ref} {...props.inputValues} />
    </div>
  );
});

export default Input;
