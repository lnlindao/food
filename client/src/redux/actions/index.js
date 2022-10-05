import axios from "axios";
const host = "http://localhost:3001";

export const getAllRecipes = () => {
  return function (dispatch) {
    return axios(`${host}/recipes`)
      .then((response) => response.data)
      .then((recipes) => {
        dispatch({ type: "GET_ALL_RECIPES", payload: recipes });
      });
  };
};

export const getRecipeDetail = (recipeId) => {
  return function (dispatch) {
    return (
      axios(`${host}/recipes/${recipeId}`)
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
    return axios(`${host}/diets`)
      .then((r) => r.data)
      .then((diets) => {
        dispatch({ type: "GET_ALL_DIETS", payload: diets });
      });
  };
};

export const getRecipesByDiet = (value) => {
  return {
    type: "GET_RECIPE_BY_DIET",
    payload: value,
  };
};

export const orderByName = (value) => {
  return {
    type: "ORDER_BY_NAME",
    payload: value,
  };
};

export const orderByHealthScore = (value) => {
  return {
    type: "ORDER_BY_HEALTH",
    payload: value,
  };
};

export const SearchByName = (name) => {
  return function (dispatch) {
    return axios(`${host}/recipes?name=${name}`)
      .then((r) => r.data)
      .then((recipeFound) => {
        dispatch({ type: "SEARCH_DIET_BY_NAME", payload: recipeFound });
      });
  };
};

export const createRecipe = (props) => {
  return function () {
    return axios.post(`${host}/recipes`, props).then((response) => response);
  };
};

export const deleteRecipe = (id) => {
  return function () {
    return axios
      .delete(`${host}/recipes/delete/${id}`)
      .then((response) => response);
  };
};
