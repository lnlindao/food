const { Router } = require("express");

// Importar todos los routers;
const recipeRoutes = require("./recipeRoutes");
const dietsRoutes = require("./dietRoute");

const router = Router();
router.use("/recipes", recipeRoutes);
router.use("/diets", dietsRoutes);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
