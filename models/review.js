'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {});
  Review.associate = function(models) {
    Review.hasMany(models.Vote, {foreignKey: 'reviewId'})
  };
  return Review;
};