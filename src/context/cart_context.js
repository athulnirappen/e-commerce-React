import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/cartReducer";

export const cartContext = createContext();

const getLocalCardData = () => {
  let newCartData = localStorage.getItem("mycart");
  if (newCartData === []) {
    return [];
  } else {
    return JSON.parse(newCartData);
  }
};

const initialstate = {
  // cart: [],
  cart: getLocalCardData(),
  total_item: "",
  total_amount: "",
  shipping_fee: 50000,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialstate);

  const addToCart = (id, color, amount, product) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { id, color, amount, product },
    });
  };

  //remove item from cart

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  //incement and decrement the product

  const setDecrease = (id) => {
    dispatch({ type: "SET_DECREMENT", payload: id });
  };

  const setIncrease = (id) => {
    dispatch({ type: "SET_INCREMENT", payload: id });
  };

  //to clear cart

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  //add item to localstorage

  useEffect(() => {
    dispatch({ type: "CART_TOTAL_PRICE" });
    dispatch({ type: "CART_TOTAL_ITEM" });
    localStorage.setItem("mycart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <cartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        clearCart,
        setDecrease,
        setIncrease,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(cartContext);
};
