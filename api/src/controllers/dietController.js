const { Diet } = require("../db");

const dietTypesDb = [
  "Gluten free",
  "Ketogenic",
  "Vegetarian",
  "Lacto vegetarian",
  "Ovo vegetarian",
  "Lacto ovo vegetarian",
  "Vegan",
  "Pescetarian",
  "Paleolithic",
  "Primal",
  "Low fodmap",
  "Whole 30",
  "Dairy free",
];

const fillDatabase = async () => {
  dietTypesDb.forEach(async (element) => {
    await Diet.create({ name: element });
  });
  return "dietas creadas";
};

const getAllDiets = async () => {
  return await Diet.findAll();
};

module.exports = { fillDatabase, getAllDiets };
