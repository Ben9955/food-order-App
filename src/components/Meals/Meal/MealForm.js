import Input from "../../UI/Input";
import style from "./MealForm.module.css";
import { useState, useRef } from "react";

const MealForm = (props) => {
  const inputAmountValue = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const inputValue = inputAmountValue.current.value;

    if (inputValue.trim().length < 1 || +inputValue < 0 || +inputValue > 5)
      return;

    props.onAddToCart(+inputValue);
  };

  return (
    <form onSubmit={submitHandler} className={style.form}>
      <Input
        ref={inputAmountValue}
        label="Amount"
        inputValues={{ type: "number", max: "5", min: "1", defaultValue: "1" }}
      />
      <button type="submit">Add Meal</button>
    </form>
  );
};

export default MealForm;
