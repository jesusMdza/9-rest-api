'use strict';
const Sequelize = require('sequelize');

// Course Model
module.exports = (sequelize) => {
  class Course extends Sequelize.Model {}
  Course.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: 'Title is required'
        }
      }
    },
    description: {
      type: Sequelize.TEXT,
      validate: {
        notEmpty: {
          msg: 'Description is required'
        }
      }
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

  // one-to-many association between Course (target) and User (source)
  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      as: 'owner',
      foreignKey: {
        fieldName: 'userId',
        allowNull: false
      }
    });
  }

  return Course;
}