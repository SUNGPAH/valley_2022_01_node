const db = require("../models");
const GoogleForm = db.GoogleForm;
const FormQuestion = db.FormQuestion;

//이렇게도 할 수 있고
const controller = require("../controllers/googleform.controller");

module.exports = function(app) {
  app.get("/googleform/:id", controller.create)
  app.delete("/googleform/delete/:id", controller.delete)
}