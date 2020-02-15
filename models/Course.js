'use strict'

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Sequelize.model {}
  Course.init({
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    description: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    estimatedTime: {
      type: Sequelize.STRING,
      notEmpty: false
    },
    materialsNeeded: {
      type: Sequelize.STRING,
      notEmpty: false
    },
  }, {sequelize});

  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      foreignKey: {
        fieldName: 'userId',
        allowNull: false
      }
    });
  }

  return Course;
}