import MealForm from "./MealForm";
import style from "./Meal.module.css";
import { CartContext } from "../../Context/CartContext";
import { useContext } from "react";

const Meal = (props) => {
  const { name, description, price, id } = props;

  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    cartCtx.addItem({ name, description, price, amount, id });
  };

  return (
    <li className={style.meal}>
      <div>
        <p className={style.meal__name}>{name}</p>
        <p className={style.meal__description}>{description}</p>
        <p className={style.meal__price}>${price}</p>
      </div>
      <div>
        <MealForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default Meal;
