import React, { useRef, useState } from "react";
import style from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInput = useRef();
  const streetInput = useRef();
  const postalInput = useRef();
  const cityInput = useRef();

  const confirmHandler = (e) => {
    e.preventDefault();

    const enteredName = nameInput.current.value;
    const enteredStreet = streetInput.current.value;
    const enteredPostal = postalInput.current.value;
    const enteredCity = cityInput.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = isFiveChars(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalIsValid,
    });
    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      city: enteredCity,
      postalCode: enteredPostal,
      street: enteredStreet,
    });
  };

  return (
    <form className={style.name} onSubmit={confirmHandler}>
      <div className={style.control}>
        <label htmlFor="name">Name</label>
        <input ref={nameInput} type="text" id="name"></input>
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={style.control}>
        <label htmlFor="street">Street</label>
        <input ref={streetInput} type="text" id="street"></input>
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={style.control}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalInput} type="text" id="postal"></input>
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code!</p>
        )}
      </div>
      <div className={style.control}>
        <label htmlFor="city">City</label>
        <input ref={cityInput} type="text" id="city"></input>
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={style.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={style.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
