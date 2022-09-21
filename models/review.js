'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Review.belongsTo(models.Restaurant),
      models.Review.belongsTo(models.User)
    }
  }
  Review.init({
    name: DataTypes.STRING,
    cleanliness: DataTypes.STRING,
    features: DataTypes.STRING,
    comfort: DataTypes.INTEGER,
    RestaurantId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};