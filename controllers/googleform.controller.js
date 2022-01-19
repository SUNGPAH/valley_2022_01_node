const db = require("../models");
const GoogleForm = db.GoogleForm;
const FormQuestion = db.FormQuestion;

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

exports.create = async (req,res) => {
  const googleFormId = req.params.id
  const googleForm = await GoogleForm.findOne({
    include: FormQuestion,
    where:{id:googleFormId}
  })

  console.log(googleForm);
  res.json({result: googleForm})
}