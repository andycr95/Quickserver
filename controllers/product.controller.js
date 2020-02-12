const productCtrl = {};

const mongoose = require("mongoose");

const Product = require("../models/product");
const Company = require("../models/company");
const Category = require("../models/category");

productCtrl.getProducts = async (req, res) => {
  const product = await Product.find({ status: true }).select("-created_at"); //.limit(3)
  res.json(product);
};

productCtrl.getProductbycompany = async (req, res) => {
  const products = await Product.find({
    idcompany: req.params.id,
    status: true
  });
  const company = await Company.findById(req.params.id).select("-img");
  res.json({
    status: true,
    products,
    company
  });
};

productCtrl.getProductbycategory = async (req, res) => {
  const products = await Product.find({
    idcategory: req.params.id,
    status: true
  });
  res.json({
    status: true,
    products
  });
};

productCtrl.getProductbycategorys = async (req, res) => {
  const category = await Category.find({type:req.params.name}).select('-img')
  const categorys = []
  for (let i = 0; i < category.length; i++) {
    const c = category[i];
    const products = await Product.find({idcategory:c._id, idcompany:req.body.company, status: true});
    categorys.push({
      name: c.name,
      products: products
    })
  }
  res.json({
    status: true,
    categorys
  });

};

productCtrl.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json({
    status: true,
    product
  });
};

productCtrl.searchProduct = async (req, res) => {
  const product = await Product.find({
    name: { $regex: ".*" + req.body.name + ".*" },
    status: true
  });
  if (product) {
    res.status(200).send({ product, status: true });
  } else {
    res.json({
      status: "Producto no encontrado"
    });
  }
};

productCtrl.createProduct = async (req, res) => {
  var company = mongoose.Types.ObjectId(req.body.company._id);
  var category = mongoose.Types.ObjectId(req.body.product.category);
  const product = new Product({
    name: req.body.product.name,
    idcategory: category,
    idcompany: company,
    price: req.body.product.price,
    description: req.body.product.description,
    img: req.body.product.img,
    updated_at: new Date()
  });
  await product.save();
  res.json({
    status: "Producto registered"
  });
};

productCtrl.updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = {
    img: req.body.img,
    name: req.body.name,
    idcategory: mongoose.Types.ObjectId(req.body.category),
    description: req.body.product.description,
    price: req.body.price,
    updated_at: new Date()
  };
  await Product.findByIdAndUpdate(id, { $set: product }, { new: true });
  res.json({
    status: "Product updated"
  });
};

productCtrl.deleteProduct = async (req, res) => {
  //await Product.findByIdAndRemove(req.params.id)
  const product = {
    status: false
  };
  await Product.findByIdAndUpdate(req.params.id, { $set: product });
  res.json({
    status: "Product removed"
  });
};

module.exports = productCtrl;
