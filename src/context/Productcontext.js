import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import axios from "axios";
import { useReducer } from "react";
import Productreducer from "../reducer/productreducer";

export const AppContext = createContext();

const API = "https://api.pujakaitem.com/api/products";

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
  isSingleLoading: false,
  singleProduct: {},
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Productreducer, initialState);

  const getProducts = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url);
      const products = await res.data;

      dispatch({ type: "SET_API_DATA", payload: products });
    } catch (error) {
      dispatch({ type: "SET_ERROR" });
    }
  };

  //api call for singleproduct

  const getSingleProduct = async (url) => {
    dispatch({type:"SET_SINGLE_LOADING"})
    
    try {
      const res = await axios.get(url);
      const singleProduct = await res.data;
      dispatch({type:"SET_SINGLE_PRODUCT_API",payload:singleProduct})
      
    } catch (error) {
      dispatch({type:"SET_SINGLE_ERROR"})
    }
    
  }

  useEffect(() => {
    getProducts(API);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, getSingleProduct }}>
      {children}
    </AppContext.Provider>
  );
};

export const useProductContext = () => {
  return useContext(AppContext);
};
