'use strict';

//const seque
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email format!'
        },
      }
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  });

  // Instance Method
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  }

  User.associate = function(models) {
    User.belongsToMany(models.Movie, {through: models.Review, foreignKey: 'userId'})
    User.hasMany(models.Vote, {foreignKey: 'userId'})
  };
  return User;
};