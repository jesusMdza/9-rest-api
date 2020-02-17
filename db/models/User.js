'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class User extends Sequelize.Model {}
  User.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: Sequelize.STRING,
      notEmpty: true,
      validate: {
        is: {
          args: /^[a-z]+$/i,
          msg: "First name must contain letters only"
        }
      }
    },
    lastName: {
      type: Sequelize.STRING,
      notEmpty: true,
      validate: {
        is: {
          args: /^[a-z]+$/i,
          msg: "Last name must contain letters only"
        }
      }
    },
    emailAddress: {
      type: Sequelize.STRING,
      notEmpty: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Email must be in correct format. (e.g., example@domain.com)"
        }
      }
    },
    password: {
      type: Sequelize.STRING,
      notEmpty: true
    }
  }, {sequelize});

  User.associate = (models) => {
    User.hasMany(models.Course, {
      foreignKey: {
        fieldName: 'userId',
        allowNull: false
      }
    });
  }
  
  return User;
}