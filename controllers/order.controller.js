const ordertCtrl = {};
const Order = require("../models/order");
const Product = require("../models/product");
const Branchs = require("../models/branchOffice");

ordertCtrl.getOrders = async (req, res) => {
  const order = await Order.find();
  res.json(order);
};

ordertCtrl.getOrdersByUser = async (req, res) => {
  const idUser = req.params.id;
  const order = await Order.find({ idUser: idUser, status: false });
  const ordert = await Order.find({ idUser: idUser, status: true });
  res.json({
    order,
    ordert
  });
};

ordertCtrl.getProductsOrder = async (req, res) => {
  const id = req.params.id;
  const full = [];
  const { products } = await Order.findById(id);
  for (let i = 0; i < products.length; i++) {
    const element = products[i]._id;
    const product = await Product.findById(element).select("-img");
    full.push(product);
  }

  res.json(full);
};

ordertCtrl.getOrdersByBranch = async (req, res) => {
  const id = req.params.id;
  const order = await Order.find({ idbranchoffice: id, status: true });
  res.json({
    order
  });
};

ordertCtrl.getOrdersByBranchs = async (req, res) => {
  const id = req.params.id;
  const branch = await Branchs.find({idcompany:id})
  const branchs = [];
  for (let i = 0; i < branch.length; i++) {
    const e = branch[i];
    const order = await Order.find({ idbranchoffice: e._id, status: true });
    branchs.push({name:e.name,
      number:order.length})
  }
  res.json(branchs).status(200)
};

ordertCtrl.getOrdersByCompany = async (req, res) => {
  const name = req.params.company;
  const order = await Order.find({ company: name, status: true });
  res.json({
    order
  });
};

ordertCtrl.createOrder = async (req, res) => {
  const products = [];
  const adds = [];
  const invoice = req.body.invoice;
  const branch = req.body.branchoffice;
  const company = req.body.company;
  for (let i = 0; i < req.body.products.length; i++) {
    const e = req.body.products[i];
    for (let i = 0; i < e.adicion.length; i++) {
      const a = e.adicion[i];
      for (let i = 0; i < a.add.length; i++) {
        const add = a.add[i];
        adds.push(add);
      }
    }
    products.push(e.productos);
  }
  const order = new Order({
    idInvoice: invoice,
    idUser: req.body.user,
    idbranchoffice: branch,
    products: products,
    coment: req.body.coment,
    address: req.body.address,
    where: req.body.where,
    adds: adds,
    price: req.body.price,
    company: company,
    status: false,
    updated_at: new Date()
  });
  await order.save();
  res.json({
    status: "Orden registrada"
  });
};

ordertCtrl.updateOrder = async (req, res) => {
  const id = req.params.id;
  const order = {
    status: true
  };
  await Order.findByIdAndUpdate(id, { $set: order });
  res.json({
    status: "Orden culminada"
  });
};

module.exports = ordertCtrl;
