import axios from "axios";

export const getAllRecipes = () => {
  return function (dispatch) {
    return axios(`http://localhost:3001/recipes`)
      .then((response) => response.data)
      .then((recipes) => {
        dispatch({ type: "GET_ALL_RECIPES", payload: recipes });
      });
  };
};

export const getRecipeDetail = (recipeId) => {
  return function (dispatch) {
    return (
      axios(`http://localhost:3001/recipes/${recipeId}`)
        //.then((response) => console.log("response.data", response.json()))
        .then((response) => response.data)
        .then((recipeDetails) => {
          dispatch({ type: "GET_RECIPE_DETAIL", payload: recipeDetails });
        })
    );
  };
};

export const getAllRecipeTypes = () => {
  return function (dispatch) {
    return axios(`http://localhost:3001/diets`)
      .then((r) => r.data)
      .then((diets) => {
        dispatch({ type: "GET_ALL_DIETS", payload: diets });
      });
  };
};
