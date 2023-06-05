import Meal from "./Meal/Meal";
import Card from "../UI/Card";
import style from "./MealsAvailable.module.css";
// import useHttpRequest from "../../http-request/httpRequest";
import { useEffect, useState } from "react";

const MealsAvailable = (props) => {
  const [mealsList, setMealsList] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://react-http-79573-default-rtdb.firebaseio.com/meals.json"
        );
        setIsloading(true);

        if (!response.ok) throw new Error("Problem with the server");
        const data = await response.json();

        const mealsData = [];
        for (const key of Object.keys(data)) {
          mealsData.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }

        setMealsList(mealsData);
        setIsloading(false);
      } catch (err) {
        setFetchError(err.message);
        setIsloading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <section className={style.MealsLoading}>
        <p>is Loading...</p>
      </section>
    );
  }

  if (fetchError) {
    return (
      <section className={style.MealsError}>
        <p>{fetchError}</p>
      </section>
    );
  }

  const meals = mealsList.map((meal, index) => (
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
