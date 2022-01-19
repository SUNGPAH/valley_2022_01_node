const db = require("../models");
const GoogleForm = db.GoogleForm;
const FormQuestion = db.FormQuestion;
const FormQuestionOption = db.FormQuestionOption;

const controller = require("../controllers/form.controller");
const req = require("express/lib/request");

module.exports = (app) => {

  app.get("/form/first", async (req,res) => controller.getFirst(req,res));
  // app.get("/form/first", controller.getFirst);

  /*
  <input onClick={e => clickFunction(e)}/>
  <input onClick={clickFunction}/>
  clickFunction = (e) => {
    //
  }
  */

  app.get("/form/create", async (req, res) => {
    const googleForm = await GoogleForm.create({
      title: `${Math.random()}`,
    })

    res.json({ message: "Welcome to our application.", googleForm: googleForm });
  });

  app.get("/form/last", async (req, res) => {
    const googleForm = await GoogleForm.findOne({
      order: [["createdAt", "DESC"]]
    })

    const rawGoogleForm = await GoogleForm.findOne({
      order: [["createdAt", "DESC"]],
      raw: true
    })

    console.log('raw google form')
    console.log(rawGoogleForm);

    res.json({ googleForm: googleForm, rawGoogleForm: rawGoogleForm })
  })

  app.get("/form/all", async (req, res) => {
    const googleForms = await GoogleForm.findAll({
      order: [["createdAt", "DESC"]]
    })

    res.json({ googleForms: googleForms, msg: "hihi" })
  })

  app.get("/form/first", async (req, res) => {
    const googleForm = await GoogleForm.findOne({
      order: [["createdAt", "ASC"]]
    })

    const formQuestions = await googleForm.getFormQuestions();

    res.json({
      googleForm: googleForm,
      formQuestions: formQuestions,
    })
  })

  app.get("/formquestion/create", async (req, res) => {
    const question = await FormQuestion.create({
      title: `${Math.random()}`,
      googleFormId: 1,
    })

    res.json({ question: question })
  })

  app.get("/formquestion/multicreate", async (req, res) => {
    const records = [1, 2, 3].map((value, index) => {
      return { title: `${Math.random()}`, googleFormId: 1 }
    })

    const result = await FormQuestion.bulkCreate(records)
    res.json({ result: result })
  })

  app.delete("/form/delete/:id", controller.delete)

  app.get("/formquestion/include", async (req, res) => {
    const googleForm = await GoogleForm.findOne({
      include: FormQuestion,
      where: { id: 1 }
    })

    console.log(googleForm);
    res.json({ result: googleForm })
  })


  app.get("/formquestion/form", async (req, res) => {
    const question = await FormQuestion.findOne({
      order: [["createdAt", "DESC"]]
    })

    const googleForm = await question.getGoogleForm()

    res.json({ googleForm: googleForm, question: question })
  })

  app.get("/formquestionoption/create", async (req, res) => {

    const question = await FormQuestionOption.create({
      formQuestionId: 1,
      title: "option1",
      desc: "option1 desc",
      oType: "radio"
    })

    return res.json({ question: question, message: "hi just created" });
  })

  app.get("/formquestionoption/:id", async (req, res) => {
    //localhost:3000/formquestionoption/1
    const question = await FormQuestionOption.findOne({
      where: { id: parseInt(req.params.id) }
    })

    return res.json({ question: question, message: "fetched" });
  })

}
//option + shift + f

