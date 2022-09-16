const { Diet } = require("../db");

const dietTypesDb = [
  "All",
  "Gluten free",
  "Ketogenic",
  "Vegetarian",
  "Lacto vegetarian",
  "Ovo vegetarian",
  "Lacto ovo vegetarian",
  "Vegan",
  "Pescatarian",
  "Paleolithic",
  "Primal",
  "Low fodmap",
  "Whole 30",
  "Dairy free",
];

/**
 * FUNCION PARA PRE CARGAR TODOS LOS TIPOS DE DIETA EN LA BD, SE A;ADIO AL INDEX.JS DEL SERVER QUE AL CARGARLO SE RELLENE LA TABLA AUTOOMATICAMENTE
 */
const fillDatabase = async () => {
  dietTypesDb.forEach(async (element) => {
    await Diet.create({ name: element.toLowerCase() });
  });
  return "dietas creadas";
};

const getAllDiets = async () => {
  //Consultar todos los datos de la tabla diets
  return await Diet.findAll();
};

module.exports = { fillDatabase, getAllDiets };
