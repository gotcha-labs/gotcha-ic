'use strict';
const {MODELS} = require("../utils/constants")
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Key extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models[MODELS.USER])
      // define association here
    }
  }
  Key.init({
    siteKey: DataTypes.STRING,
  }, {
    sequelize,
    modelName: MODELS.KEY,
  });
  return Key;
};