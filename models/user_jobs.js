'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Jobs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_Jobs.init({
    status: {
      type: DataTypes.STRING,
      defaultValue: 'applied'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    jobId:  {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'User_Jobs',
  });
  return User_Jobs;
};