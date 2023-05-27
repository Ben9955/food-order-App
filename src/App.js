import Header from "./components/Lyaout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./components/Context/CartContext";
import Cart from "./components/Cart/Cart";
import { useState } from "react";
const App = () => {
  const [showCart, setShowCart] = useState(false);

  const cartButtonHandler = () => {
    setShowCart(true);
  };

  const cartCloseHandler = () => {
    setShowCart(false);
  };

  return (
    <CartProvider>
      <Header onButtonClick={cartButtonHandler} />
      <Meals />
      {showCart && <Cart onCloseClick={cartCloseHandler} />}
    </CartProvider>
  );
};

export default App;
