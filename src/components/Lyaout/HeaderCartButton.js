import CartIcon from "../Cart/CartIcon";
import style from "./HeaderCartButton.module.css";
import { CartContext } from "../Context/CartContext";
import { useContext, useState, useEffect } from "react";

const HeaderButton = ({ onButtonClick }) => {
  const [triggerButton, setTriggerButton] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = cartCtx.items.reduce(
    (acc, item) => (acc += item.amount),
    0
  );

  useEffect(() => {
    if (cartCtx.items.length === 0) return;

    setTriggerButton(true);

    const timer = setTimeout(() => {
      setTriggerButton(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [cartCtx.items]);

  const ButtonClasses = `${style.button} ${
    triggerButton ? style["button-bumb"] : ""
  }`;

  return (
    <button onClick={onButtonClick} className={ButtonClasses}>
      <span className={style["button__icon"]}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={style["count-cart"]}>{totalAmount}</span>
    </button>
  );
};

export default HeaderButton;
