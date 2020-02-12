const addCtrl = {};
const Add = require("../models/add");
const mongoose = require("mongoose");
const Company = require("../models/company");
const Category = require("../models/category");

addCtrl.getAdds = async (req, res) => {
  const add = await Add.find();
  res.json(add);
};

addCtrl.getAdd = async (req, res) => {
  const add = await Add.findById(req.params.id);
  res.json(add);
};

addCtrl.getAddbycategory = async (req, res) => {
  const adds = await Add.find({
    idcategory: req.params.id
  });
  const category = await Category.findById(req.params.id);
  res.json({
    status: true,
    adds,
    category
  });
};

addCtrl.getAddbycompany = async (req, res) => {
  const adds = await Add.find({
    idcompany: req.params.id
  });
  const company = await Company.findById(req.params.id).select("-img");
  res.json({
    status: true,
    adds,
    company
  });
};

addCtrl.searchAdd = async (req, res) => {
  const add = await Add.find({
    name: { $regex: ".*" + req.body.name + ".*" },
    status: true
  });
  if (add) {
    res.status(200).send({ add, status: true });
  } else {
    res.json({
      status: "Adición no encontrado"
    });
  }
};

addCtrl.createAdd = async (req, res) => {
  var company = mongoose.Types.ObjectId(req.body.company._id);
  var category = mongoose.Types.ObjectId(req.body.Add.category);
  const add = new Add({
    name: req.body.Add.name,
    idcategory: category,
    idcompany: company,
    price: req.body.Add.price,
    created_at: new Date()
  });
  await add.save();
  res.json({
    status: "Add registered"
  });
};

addCtrl.updateAdd = async (req, res) => {
  const { id } = req.params;
  const add = {
    img: req.body.img,
    name: req.body.name,
    idcategory: mongoose.Types.ObjectId(req.body.category),
    price: req.body.price,
    updated_at: new Date()
  };
  await Add.findByIdAndUpdate(id, { $set: add }, { new: true });
  res.json({
    status: "Product updated"
  });
};

addCtrl.deleteAdd = async (req, res) => {
  await Add.findByIdAndRemove(req.params.id);
  res.json({
    status: "Deleted"
  });
};

module.exports = addCtrl;
