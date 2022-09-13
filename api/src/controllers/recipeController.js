const axios = require("axios");
const { API_KEY } = require("../db");
const recetasJsonLocal = require("../../../utils/recetas.json");

//CONSULTAR TODAS LAS RECETAS DE LA API
const apiRecipes = async () => {
  try {
    /*let recipes = (
      await axios(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
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
    }));*/

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
    return recipes;
  } catch (error) {
    console.error(error);
    return [];
  }
};

//JUNTAR RECETAS DE LA API Y DE LA DB
async function getAllRecipes() {
  let apiData = apiRecipes();
  return apiData;
}

//TRAER TODAS LAS RECETAS O SI SE ENVIA QUERY SOLAMENTE LAS QUE TENGAN EL PARAMETRO ENVIADO
async function getRecipesByQuery(req, res, next) {
  const { name } = req.query;

  try {
    //Tomo toda la info de la api
    let allRecipes = await getAllRecipes();

    //Si por query viene el parametro de busqueda
    if (name) {
      let foundRecipe = await allRecipes.filter((recipe) =>
        //  console.log(recipe.name.toLowerCase().includes(name.toLowerCase()))
        recipe.name.toLowerCase().includes(name.toLowerCase())
      );

      res.json(
        foundRecipe.length > 0
          ? foundRecipe
          : `No hay coincidencias para ${name}`
      );
    }
    //sino viene paramtro de busqueda, entonces mostrar todo
    else {
      res.json(allRecipes);
    }
  } catch (error) {
    next({ error });
  }
}

module.exports = { getAllRecipes, getRecipesByQuery };
