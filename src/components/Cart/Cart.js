import Card from "../UI/Card";
import style from "./Cart.module.css";
import CartItem from "./CartItem";
import { CartContext } from "../Context/CartContext";
import { useContext } from "react";
import Overlay from "../UI/overlay";

const Cart = ({ onCloseClick }) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = cartCtx.totalAmount.toFixed(2);

  const addItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
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

  return (
    <Overlay>
      <Card className={style.cart}>
        {cartItems}
        <div className={style.amount}>
          <h3>Total Amount</h3>
          <h3>${totalAmount}</h3>
        </div>
        <button onClick={onCloseClick} className={style.close}>
          Close
        </button>
      </Card>
    </Overlay>
  );
};

export default Cart;
