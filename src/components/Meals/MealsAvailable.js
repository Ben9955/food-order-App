import Meal from "./Meal/Meal";
import Card from "../UI/Card";
import style from "./MealsAvailable.module.css";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

const MealsAvailable = (props) => {
  const meals = DUMMY_MEALS.map((meal, index) => (
    <Meal
      name={meal.name}
      price={meal.price}
      description={meal.description}
      id={meal.id}
      key={meal.id + index}
    />
  ));

  return (
    <Card className={style.meals}>
      <ul>{meals}</ul>
    </Card>
  );
};
export default MealsAvailable;
