const axios = require("axios");
const { Diet, Recipe } = require("../db");
const { API_KEY } = require("../db");
const recetasJsonLocal = require("../../../utils/recetas.json");

/**
 * CONSULTAR TODAS LAS RECETAS DE LA API
 */
const apiRecipes = async () => {
  try {
    /*
    let recipes = (
      await axios(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`
      )
    ).data.results.map((recipe) => ({
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
    */
    let recipes = await recetasJsonLocal.results.map((recipe) => ({
      id: recipe.id,
      name: recipe.title,
      dishTypes:
        recipe.dishTypes.length > 0
          ? recipe.dishTypes.join(", ")
          : recipe.dishTypes,
      diets: recipe.diets.length > 0 ? recipe.diets.join(", ") : "",
      summary: recipe.summary,
      healthScore: recipe.healthScore,
      image: recipe.image,
      steps: recipe.analyzedInstructions[0]?.steps.map((element) => ({
        number: element.number,
        step: element.step,
      })),
    }));

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
  //consulta a la api si el parametro recibide existe en alguna de las recetas
  try {
    let recipes = (
      await axios(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&titleMatch=${name}&number=100`
      )
    ).data.results //si existe, hago un map para recopilar todas las recetas y luego mostrarlas
      .map((recipe) => ({
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
  //consulta que devuleve todas las recetas de la bd
  try {
    return await Recipe.findAll({
      include: {
        model: Diet,
        as: "diets",
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
  //si se recibe algun param en la ruta, se va por esta opcion para hacer la consulta necesaria
  if (name) {
    let apiDataByName = await apiRecipesByName(name);
    let dbData = await dbRecipes();
    const allRecipesJoined = apiDataByName.concat(dbData);
    return allRecipesJoined;
  } //sino recibe params, entonces se va por esta via que no envia ningun parametro a las funciones sino que lee todas las recetas y las devuelve
  else {
    let dbData = await dbRecipes();
    let apiData = await apiRecipes();
    const allRecipesJoined = dbData.concat(apiData);
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
    console.log(typeof recipeId);
    //consulto a la bd si el id recibido por params existe
    let foundRecipe = await Recipe.findAll({
      where: { id },

      include: {
        model: Diet,
        as: "diets",
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    //console.log(JSON.stringify(foundRecipe, null, 2));
    //console.log("foundRecipe", await foundRecipe);

    return foundRecipe ? foundRecipe : [];
  } catch (error) {
    console.error("recipeController => dbRecipeById", error);
    return "[]";
  }
};

/**
 *  CONSULTAR RECETAS POR ID Y CONCATENAR RECETAS DE LA API Y DE LA BD
 */
const getAllRecipiesById = async (id) => {
  //consulto si alguna receta de la api tiene el id recibido por el navegador

  //si el ID es UUID consultarlo en la DB, sino ir a la API
  // Regular expression to check if string is a valid UUID
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  if (regexExp.test(id)) {
    //consulto si alguna receta de la bd concuerda con el Id
    let dbDataById = await dbRecipeById(id);
    //si hay datos, los retorno
    if (dbDataById) {
      return dbDataById;
    }
    return "Id no encontrado";
  } else {
    //sino se encontraron en la bd, se busca en la api
    let apiDataById = await apiRecipeById(id);
    //si hay datos, los retorno
    if (apiDataById) {
      return apiDataById;
    }
    return "Id no encontrado";
  }
  /*
  let dbDataById = await dbRecipeById(id);
  if (dbDataById) {
    return dbDataById;
  }
  let apiDataById = await apiRecipeById(id);
  if (apiDataById) {
    return apiDataById;
  }*/
};

/**
 *
 * CONTROLLERS DE POST
 *
 */
const createNewRecipe = async (params) => {
  const { name, summary, healthScoreString, image, steps, dietType } = params;

  //si el usuario no ingresa el score, entonces se transforma a null para que pueda guardarse bien la receta
  healthScoreString === undefined
    ? (healthScore = null)
    : (healthScore = parseInt(healthScoreString));

  //sino se ha recibido name y summary por params entonces retornar msj de error
  if (!name || !summary || !dietType) {
    return "Faltan datos";
  }
  //si se han recibido todos los datos, se añaden todos los parametros recibidos por body a la tabla Recipes
  else {
    try {
      //creo una variable 'recipeToAdd' para recibir lo creado en la base y luego poder ver los metodos disponibles para la creacion de la relacion con la tabla Diets
      const recipeToAdd = await Recipe.create({
        name,
        summary,
        healthScore,
        image,
        steps,
      });
      //  VER todos los METODOS auto creados por sequalize que se pueden utilizar para crear las relaciones entre las tablas --> console.log(recipeToAdd.__proto__);

      //recibo por body el tipo de dieta y luego busco en la base si esta exista, si existe, se añade la relaciòn en la tabla intermedia
      const dietTypeAdded = await Diet.findAll({
        where: { name: dietType },
      });
      recipeToAdd.addDiets(dietTypeAdded);

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
