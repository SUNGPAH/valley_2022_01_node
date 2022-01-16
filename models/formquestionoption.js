'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FormQuestionOption extends Model {
    static associate(models) {
      models.FormQuestion.hasMany(FormQuestionOption)
      FormQuestionOption.belongsTo(models.FormQuestion)
    }
  };
  FormQuestionOption.init({
    formQuestionId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    desc: DataTypes.STRING,
    oType: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'FormQuestionOption',
  });
  return FormQuestionOption;
};