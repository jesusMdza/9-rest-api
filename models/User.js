'use strict'

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class User extends Sequelize.model {}
  User.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    lastName: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    emailAddress: {
      type: Sequelize.STRING,
      notEmpty: true
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