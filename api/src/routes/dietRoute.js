const { Router } = require("express");
const { getAllDiets } = require("../controllers/dietController");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    let fillDietsDb = await getAllDiets();
    res.json(fillDietsDb);
  } catch (error) {
    next({ "Error en Route Diets get": error });
  }
});

module.exports = router;
