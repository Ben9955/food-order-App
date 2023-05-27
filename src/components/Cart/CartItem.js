import style from "./CartItem.module.css";

const CartItem = ({ name, price, amount, onRemove, onAdd }) => {
  return (
    <div className={style.CartItem}>
      <div>
        <h3>{name}</h3>
        <div className={style["CartItem__amount"]}>
          <p>${price}</p>
          <div>{amount}x</div>
        </div>
      </div>

      <div>
        <button onClick={onRemove}>-</button>
        <button onClick={onAdd}>+</button>
      </div>
    </div>
  );
};

export default CartItem;
