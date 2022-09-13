const { Router } = require("express");
const { getRecipesByQuery } = require("../controllers/recipeController");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
router.get("/", getRecipesByQuery);

// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
