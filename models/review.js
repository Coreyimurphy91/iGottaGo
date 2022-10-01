'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
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
    imageURL: DataTypes.STRING,
    RestaurantId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};