'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.belongsToMany(models.Movie, {through: models.Review, foreignKey: 'userId'})
    User.hasMany(models.Vote, {foreignKey: 'userId'})
  };
  return User;
};