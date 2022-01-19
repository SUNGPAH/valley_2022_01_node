const db = require("../models");
const GoogleForm = db.GoogleForm;
const FormQuestion = db.FormQuestion;
const FormQuestionOption = db.FormQuestionOption;


exports.getFirst = async (req, res) => {
  console.log('---');
  const googleForm = await GoogleForm.findOne({})
  return res.json({ message: "Welcome to our application.", googleForm: googleForm });
}

exports.delete = async (req,res) => {
  const googleFormId = parseInt(req.params.id);
  const deletedEntry = await GoogleForm.destroy({
    where: {id: googleFormId}
  })
  if (!deletedEntry){
    return res.status(404).send("not found")
  }
  return res.json({message: "success"})
}


// () => {}