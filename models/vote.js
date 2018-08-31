'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    reviewId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    vote_value: DataTypes.BOOLEAN
  }, {});
  Vote.associate = function(models) {
    Vote.belongsTo(models.User, {foreignKey: 'userId'})
    Vote.belongsTo(models.Review, {foreignKey: 'reviewId'})
  };
  return Vote;
};