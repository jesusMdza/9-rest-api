'use strict';
const Sequelize = require('sequelize');

// User Model
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
      validate: {
        notEmpty: {
          msg: 'First name is required'
        },
        is: {
          args: /^[a-z]+$/i,
          msg: "First name must contain letters only"
        }
      }
    },
    lastName: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: 'Last name is required'
        },
        is: {
          args: /^[a-z]+$/i,
          msg: "Last name must contain letters only"
        }
      }
    },
    emailAddress: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: "Email is required"
        },
        isEmail: {
          args: true,
          msg: "Email must be in correct format. (e.g., example@domain.com)"
        }
      }
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: "Password is required"
        }
      }
    }
  }, {sequelize});

  // one-to-many association between User (Source) and Course (Target)
  User.associate = (models) => {
    User.hasMany(models.Course, {
      as: 'owner',
      foreignKey: {
        fieldName: 'userId',
        allowNull: false
      }
    });
  }
  
  return User;
}