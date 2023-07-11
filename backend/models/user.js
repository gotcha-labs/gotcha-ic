"use strict";
const { MODELS } = require("../utils/constants");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models[MODELS.KEY]);
      // define association here
    }
  }
  User.init(
    {
      principle: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: MODELS.USER,
    }
  );
  return User;
};
