'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    title: DataTypes.STRING,
    genre: DataTypes.STRING
  }, {});
  Movie.associate = function(models) {
    Movie.belongsToMany(models.User, {through: models.Review, foreignKey: 'movieId'})
  };
  return Movie;
};