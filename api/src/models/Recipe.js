const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Recipe", {
    //ID autogenerado con UUID
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    //Resumen del plato
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    healthScore: {
      type: DataTypes.FLOAT,
    },

    image: {
      type: DataTypes.STRING,
    },

    steps: {
      type: DataTypes.TEXT,
    },
  });
};
