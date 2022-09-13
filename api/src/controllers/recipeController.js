const axios = require("axios");
const { Diet, Recipe } = require("../db");
const { API_KEY } = require("../db");
const recetasJsonLocal = require("../../../utils/recetas.json");

/**
 * CONSULTAR TODAS LAS RECETAS DE LA API
 */
const apiRecipes = async () => {
  try {
    let recipes = (
      await axios(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`
      )
    ).data.results.map((recipe) => ({
      id: recipe.id,
      name: recipe.title,
      summary: recipe.summary,
      healthScore: recipe.healthScore,
      image: recipe.image,
      steps: recipe.analyzedInstructions[0]?.steps.map((element) => ({
        number: element.number,
        step: element.step,
      })),
    }));
    /*
      let recipes = await recetasJsonLocal.results.map((recipe) => ({
        id: recipe.id,
        name: recipe.title,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        image: recipe.image,
        steps: recipe.analyzedInstructions[0]?.steps.map((element) => ({
          number: element.number,
          step: element.step,
        })),
      }));
  */
    return recipes;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * CONSULTAR RECETAS DE LA API SI HAY ALGUNA COINCIDENCIA POR NOMBRE
 */
const apiRecipesByName = async (name) => {
  try {
    let recipes = (
      await axios(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&titleMatch=${name}&number=10`
      )
    ).data.results.map((recipe) => ({
      id: recipe.id,
      name: recipe.title,
      summary: recipe.summary,
      healthScore: recipe.healthScore,
      image: recipe.image,
      steps: recipe.analyzedInstructions[0]?.steps.map((element) => ({
        number: element.number,
        step: element.step,
      })),
    }));
    /*
    let recipes = await recetasJsonLocal.results.map((recipe) => ({
      id: recipe.id,
      name: recipe.title,
      summary: recipe.summary,
      healthScore: recipe.healthScore,
      image: recipe.image,
      steps: recipe.analyzedInstructions[0]?.steps.map((element) => ({
        number: element.number,
        step: element.step,
      })),
    }));
*/
    return recipes;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * CONSULTAR RECETAS DE LA BD
 */
const dbRecipes = async () => {
  try {
    return await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  } catch (error) {
    console.error("Controller error dbRecipes", error);
    return [];
  }
};

/**
 * CONCATENAR RECETAS DE LA API Y DE LA BD
 */
async function getAllRecipes(name) {
  if (name) {
    let apiDataByName = await apiRecipesByName(name);
    let dbData = await dbRecipes();
    const allRecipesJoined = apiDataByName.concat(dbData);
    return allRecipesJoined;
  } else {
    let apiData = await apiRecipes();
    let dbData = await dbRecipes();
    const allRecipesJoined = apiData.concat(dbData);
    return allRecipesJoined;
  }
}

/**
 * CONSULTAR RECETAS POR ID DESDE LA API
 */
const apiRecipeById = async (id) => {
  let recipiesById = axios(
    `https://api.spoonacular.com/recipes/${id}/information/?apiKey=${API_KEY}&addRecipeInformation=true&number=10`
  )
    .then((result) => {
      let resultado = [result.data];
      let recipeFound = resultado.map((recipe) => ({
        id: recipe.id,
        name: recipe.title,
        dishTypes:
          recipe.dishTypes.length > 0
            ? recipe.dishTypes.join(", ")
            : recipe.dishTypes,
        diets:
          recipe.diets.length > 0 ? recipe.diets.join(", ") : recipe.dishTypes,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        image: recipe.image,
        steps: recipe.analyzedInstructions[0]?.steps.map((element) => ({
          number: element.number,
          step: element.step,
        })),
      }));
      return recipeFound;
    })
    .catch((err) => {
      console.log(err);
    });
  return recipiesById;
};

/**
 * CONSULTAR RECETAS POR ID DESDE LA BD
 */
const dbRecipeById = async (id) => {
  try {
    let foundRecipe = await Recipe.findAll(
      {
        where: { id },
      },
      {
        include: {
          model: Diet,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      }
    );
    //console.log("foundRecipe", foundRecipe.length);
    return foundRecipe ? foundRecipe : [];
  } catch (error) {
    console.error("recipeController => dbRecipeById", error);
    return [];
  }
};

/**
 *  CONSULTAR RECETAS POR ID Y CONCATENAR RECETAS DE LA API Y DE LA BD
 */
const getAllRecipiesById = async (id) => {
  let apiDataById = await apiRecipeById(id);
  let dbDataById = await dbRecipeById(id);
  if (apiDataById) {
    return apiDataById;
  }
  if (dbDataById) {
    return dbDataById;
  }
};

/**
 *
 * CONTROLLERS DE POST
 *
 */
const createNewRecipe = async (params) => {
  const { name, summary, dietType } = params;
  if (!name || !summary) {
    return "Faltan parámetros de búsqueda";
  } else {
    try {
      const recipeToAdd = await Recipe.create({
        ...params,
      });
      // console.log(recipeToAdd.__proto__);
      //console.log(recipeToAdd.dataValues);

      const dietTypeAdded = await Diet.findAll({
        where: { name: dietType },
      });
      recipeToAdd.addDiet(dietTypeAdded);

      return recipeToAdd;
    } catch (error) {}
  }
};

module.exports = {
  getAllRecipes,
  getAllRecipiesById,
  createNewRecipe,
  dbRecipes,
  dbRecipeById,
};
