const initialState = {
  recipes: [],
  recipeDetail: [],
  recipeType: [],
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_ALL_RECIPES":
      return {
        ...state,
        recipes: payload,
      };
    case "GET_RECIPE_DETAIL":
      return {
        ...state,
        recipeDetail: payload,
      };
    case "GET_ALL_DIETS":
      return {
        ...state,
        recipeType: payload,
      };
    default:
      return state;
  }
};
export default rootReducer;
