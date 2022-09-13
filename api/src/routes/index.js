const { Router } = require("express");

// Importar todos los routers;
const recipeRoutes = require("./recipeRoutes");

// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
router.use("/recipes", recipeRoutes);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
