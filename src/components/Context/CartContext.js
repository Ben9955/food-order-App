import React, { useReducer } from "react";

export const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: () => {},
});

const DEFAULT_VALUE = { items: [], totalAmount: 0 };
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const indexCurrentItem = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    let updateItems;
    if (indexCurrentItem !== -1) {
      const updateditem = {
        ...state.items[indexCurrentItem],
        amount: state.items[indexCurrentItem].amount + action.item.amount,
      };
      updateItems = [...state.items];
      updateItems[indexCurrentItem] = updateditem;

      return {
        items: updateItems,
        totalAmount: updatedTotalAmount,
      };
    } else {
      updateItems = [...state.items, action.item];

      return {
        items: updateItems,
        totalAmount: updatedTotalAmount,
      };
    }
  }

  if (action.type === "REMOVE") {
    let updateItems;
    const indexCurrentItem = state.items.findIndex(
      (item) => item.id === action.id
    );

    if (indexCurrentItem !== -1) {
      const currentItem = state.items[indexCurrentItem];
      const updatedTotalAmount = state.totalAmount - currentItem.price;

      if (currentItem.amount === 1) {
        updateItems = state.items.filter((item) => item !== currentItem);
      } else {
        currentItem.amount -= 1;
        updateItems = [...state.items];
        updateItems[indexCurrentItem] = { ...currentItem };
      }

      return {
        items: updateItems,
        totalAmount: updatedTotalAmount,
      };
    }
  }
};

const CartProvider = (props) => {
  const [cartState, dispachCartAction] = useReducer(cartReducer, DEFAULT_VALUE);

  const addItem = (item) => {
    dispachCartAction({ type: "ADD", item: item });
  };

  const removeItem = (id) => {
    dispachCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItem,
    removeItem: removeItem,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
