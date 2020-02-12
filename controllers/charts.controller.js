const chartCtrl = {};
const Orders = require("../models/order");
const BranchOffice = require("../models/branchOffice");

chartCtrl.getCharts = async (req, res) => {
  const company = req.params.id;
  const branch = await BranchOffice.find({ idcompany: company }).select("_id, name");
  const branchs = [];
  for (let i = 0; i < branch.length; i++) {
    const element = branch[i];
    const value =  await Orders.find({idbranchoffice: element._id}).countDocuments()
    const {name} = await BranchOffice.findById(element._id)
    const e = {
      'value': value,
      'name': name
    }
    branchs.push(e)
  }
  res.json(branchs);
};

module.exports = chartCtrl;
