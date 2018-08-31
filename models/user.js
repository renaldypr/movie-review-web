'use strict';

//const seque
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'username must be filled!'
        },
        len: {
          args: [3,20],
          msg: 'username length must be between 3 to 20 characters!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'password must be filled!'
        }
      }
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
      },
      beforeBulkUpdate: function(user) {
        console.log('ini user =>', user)
        console.log('ini this =>', this)
        const salt = bcrypt.genSaltSync();
        user.attributes.password = bcrypt.hashSync(user.attributes.password, salt);
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