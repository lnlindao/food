const { Router } = require("express");
const {
  getAllRecipes,
  getAllRecipiesById,
  createNewRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");

const router = Router();

/**
 * OBTENER LISTA DE RECETAS O LAS QUE DEVUELVA EL QUERY PARAM
 */
router.get("/", async (req, res, next) => {
  const { name } = req.query;

  try {
    //Si por query viene el parametro de busqueda
    if (name) {
      //Tomo toda la info de la api
      let foundRecipes = await getAllRecipes(name);
      res.json(
        foundRecipes.length > 0
          ? foundRecipes
          : `No hay coincidencias para ${name}`
      );
    }
    //sino viene paramtro de busqueda, entonces mostrar todo
    else {
      let allRecipes = await getAllRecipes();
      res.json(allRecipes);
    }
  } catch (error) {
    next({ error });
  }
});

/**
 * OBTENER LISTA DE RECETAS POR ID
 */
router.get("/:idReceta", async (req, res, next) => {
  const { idReceta } = req.params;
  try {
    let result = await getAllRecipiesById(idReceta);
    res.json(
      result.length > 0 ? result : `No hay coincidencias para el id ${idReceta}`
    );
  } catch (error) {
    next({ error });
  }
});

/**
 * CREAR NUEVA RECETA
 */
router.post("/", async (req, res, next) => {
  try {
    let newRecipe = await createNewRecipe({ ...req.body });
    //console.log(newRecipe.__proto__);
    res.json(newRecipe);
  } catch (error) {
    next({ "Post new recipe": error });
  }
});

/**
 * ELIMINAR RECETAS DE LA BD
 */
router.delete("/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  console.log("id", id);

  const recipeToDelete = deleteRecipe(id);
  res.json({ msg: "Deleted succesfully" });
});

/**
 *
 *
 *
 * RUTAS DE PRUEBA LUEGO BORRAR

//pedir todas recetas de la base
router.get("/db", async (req, res, next) => {
  res.json(await dbRecipes());
});
router.get("/:dbid", async (req, res, next) => {
  const { dbid } = req.params;
  let result = await dbRecipeById(dbid);
  //console.log("result", result);
  res.json(result ? result : "No hay datos");
});
 */
module.exports = router;
