import Card from "../UI/Card";
import style from "./Cart.module.css";
import CartItem from "./CartItem";
import { CartContext } from "../Context/CartContext";
import { useContext, useState } from "react";
import Overlay from "../UI/overlay";
import Checkout from "./Checkout";

const Cart = ({ onCloseClick }) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = cartCtx.totalAmount.toFixed(2);

  const addItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = (e) => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    const response = await fetch(
      "https://react-http-79573-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
      }
    );

    setIsSubmitting(false);
    setDidSubmit(true);

    cartCtx.clearCart();
  };

  const cartItems = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      price={item.price}
      amount={item.amount}
      onAdd={addItemHandler.bind(undefined, item)}
      onRemove={removeItemHandler.bind(undefined, item.id)}
    />
  ));

  const actions = (
    <div className={style.buttons}>
      <button onClick={onCloseClick} className={style.close}>
        Close
      </button>
      <button onClick={orderHandler} className={style.order}>
        Order
      </button>
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={style.amount}>
        <h3>Total Amount</h3>
        <h3>${totalAmount}</h3>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={onCloseClick} />
      )}
      {!isCheckout && actions}
    </>
  );

  const isSubmittingModalContent = <p> Sending order data....</p>;

  const didSubmitModalContent = (
    <div className={style.submitted}>
      <p>Successfully sent the order!</p>
      <button onClick={onCloseClick} className={style.close}>
        Close
      </button>
    </div>
  );
  return (
    <Overlay>
      <Card className={style.cart}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {didSubmit && !isSubmitting && didSubmitModalContent}
      </Card>
    </Overlay>
  );
};

export default Cart;
