const Productreducer = (state,action) => {
    switch (action.type) {
      case "SET_LOADING":
        return {
          ...state,
          isLoading: true,
        };
      case "SET_API_DATA":
        const featureData = action.payload.filter((value) => {
          return value.featured === true;
        });
        return {
          ...state,
          isLoading: false,
          products: action.payload,
          featureProducts: featureData,
        };
      case "SET_ERROR":
        return {
          ...state,
          isLoading: false,
          isError: true,
        };

      default:
        return state;
    }
}



export default Productreducer;
