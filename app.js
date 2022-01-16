const dotenv = require('dotenv');
dotenv.config();

const http = require('http');

const express = require('express');
const cors = require('cors');
const port = process.env.PORT
// const port = 3000 
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/static', express.static('public')); 

app.listen(port, () => console.log(`Server up and running on port ${port}.`));

const db = require("./models");
const GoogleForm = db.GoogleForm;
const FormQuestion = db.FormQuestion;
const FormQuestionOption = db.FormQuestionOption;


app.get("/", async (req, res) => {
  console.log('---');
  const googleForm = await GoogleForm.findOne({})
  res.json({ message: "Welcome to our application.", googleForm:  googleForm});
});

app.get("/googleform/create", async (req, res) => {
  const googleForm = await GoogleForm.create({
    title: `${Math.random()}`,
  })

  res.json({ message: "Welcome to our application.", googleForm:  googleForm});
});

app.get("/googleform/last", async (req,res) => {
  const googleForm = await GoogleForm.findOne({
    order: [["createdAt", "DESC"]]
  })

  console.log('--- last google form ---')
  console.log(googleForm);
  console.log(googleForm.dataValues.title);

  const rawGoogleForm = await GoogleForm.findOne({
    order: [["createdAt", "DESC"]],
    raw: true
  })

  console.log('raw google form')
  console.log(rawGoogleForm);

  res.json({googleForm: googleForm, rawGoogleForm: rawGoogleForm})
})

app.get("/googleform/all", async (req,res) => {
  const googleForms = await GoogleForm.findAll({
    order: [["createdAt", "DESC"]]
  })

  res.json({googleForms: googleForms})
})

app.get("/googleform/first", async (req,res) => {
  const googleForm = await GoogleForm.findOne({
    order: [["createdAt", "ASC"]]
  })

  const formQuestions = await googleForm.getFormQuestions();

  res.json({
    googleForm: googleForm, 
    formQuestions: formQuestions,
  })
})

app.get("/formquestion/create", async (req,res) => {
  const question = await FormQuestion.create({
    title: `${Math.random()}`,
    googleFormId: 1,
  })

  res.json({question: question})
})


app.get("/formquestion/multicreate", async (req,res) => {
  const records = [1,2,3].map((value, index) => {
    return {title: `${Math.random()}`, googleFormId: 1}
  })

  const result = await FormQuestion.bulkCreate(records)
  res.json({result: result})
})


app.get("/googleform/:id", async (req,res) => {
  const googleFormId = req.params.id
  const googleForm = await GoogleForm.findOne({
    include: FormQuestion,
    where:{id:googleFormId}
  })

  console.log(googleForm);
  res.json({result: googleForm})
})

app.delete("/googleform/delete/:id", async (req,res) => {
  const googleFormId = parseInt(req.params.id);

  const deletedEntry = await GoogleForm.destroy({
    where: {id: googleFormId}
  })

  if (!deletedEntry){
    return res.status(404).send("not found")
  }

  return res.json({message: "success"})
})

app.get("/formquestion/include", async (req,res) => {
  const googleForm = await GoogleForm.findOne({
    include: FormQuestion,
    where:{id:1}
  })

  console.log(googleForm);
  res.json({result: googleForm})
})


app.get("/formquestion/form", async (req,res) => {
  const question = await FormQuestion.findOne({
    order: [["createdAt", "DESC"]]
  })

  const googleForm = await question.getGoogleForm()

  res.json({googleForm: googleForm, question: question})
})

app.get("/formquestionoption/create", async (req,res) => {

  const question = await FormQuestionOption.create({
    formQuestionId: 1,
    title: "option1",
    desc: "option1 desc",
    oType: "radio"
  })

  return res.json({question: question, message: "hi just created"});
})

app.get("/formquestionoption/:id", async (req,res) => {
  //localhost:3000/formquestionoption/1
  const question = await FormQuestionOption.findOne({
    where: {id: parseInt(req.params.id)}
  })

  return res.json({question: question, message: "fetched"});
})

