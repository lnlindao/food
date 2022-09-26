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

      set(value) {
        this.setDataValue("name", value.toLowerCase());
      },
      /*
      get() {
        const nameLowercase = this.getDataValue("name");
        return nameLowercase.toLowerCase();
      },*/
    },

    //Resumen del plato
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 100,
      },
    },

    image: {
      type: DataTypes.STRING,
    },

    steps: {
      type: DataTypes.TEXT,
    },

    toDelete: {
      type: DataTypes.VIRTUAL,
      get() {
        return true;
      },
    },
  });
};
