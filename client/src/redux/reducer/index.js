const initialState = {
  recipes: [],
  allRecipes: [],
  recipeDetail: [],
  diets: [],
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_ALL_RECIPES":
      return {
        ...state,
        recipes: payload,
        allRecipes: payload,
      };
    case "GET_RECIPE_DETAIL":
      return {
        ...state,
        recipeDetail: payload,
      };
    case "GET_ALL_DIETS":
      return {
        ...state,
        diets: payload,
      };
    case "SEARCH_DIET_BY_NAME":
      return {
        ...state,
        recipes: payload,
      };
    case "ORDER_BY_HEALTH":
      let ordered =
        payload === "low"
          ? state.recipes.sort(
              (a, b) => parseInt(a.healthScore) - parseInt(b.healthScore) //ASC
            )
          : state.recipes.sort((a, b) => b.healthScore - a.healthScore); //DESC

      return {
        ...state,
        recipes: ordered,
      };
    case "ORDER_BY_NAME":
      let sortedRecipes =
        payload === "asc"
          ? state.recipes.sort((a, b) => {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              // names must be equal
              return 0;
            })
          : state.recipes.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name < b.name) {
                return 1;
              }
              // names must be equal
              return 0;
            });
      return {
        ...state,
        recipes: sortedRecipes,
      };
    case "GET_RECIPE_BY_DIET":
      let allRecipes = state.allRecipes,
        diet;
      //De la DB me vienen los tipos de dieta en formato array, voy a convertir los de la API en array tambien para verificar si la receta incluye un tipo de dieta o no
      let result =
        payload === "all"
          ? allRecipes
          : allRecipes.filter((e) => {
              //para las recetas que vienen de la api que ya las devuelvo en tipo texto
              if (typeof e.diets === "string") {
                diet = e.diets.split(",").join("");
                return diet.includes(payload);
              }
              //para las recetas que vienen de la DB
              let recipesDb = e.diets.map((e) => e.name);
              return recipesDb.includes(payload);
            });
      return {
        ...state,
        recipes: result,
      };
    case "CREATE_RECIPE":
      return { ...state };
    case "DELETE_RECIPE":
      return { ...state };
    default:
      return state;
  }
};
export default rootReducer;
