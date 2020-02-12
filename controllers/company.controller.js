const companyCtrl = {};

const mongoose = require("mongoose");
const Company = require("../models/company");
const City = require("../models/city");
const Like = require("../models/like");
const User = require("../models/user");

companyCtrl.getCompanys = async (req, res) => {
  const company = await Company.find()
  res.json(company);
};

companyCtrl.getCompany = async (req, res) => {
  const company = await Company.findById(req.params.id);
  res.json(company);
};

companyCtrl.getCompanies = async (req, res) => {
  const company = await Company.findOne({ iduser: req.params.id });
  res.json(company);
};

companyCtrl.getCompanyByCity = async (req, res) => {
  const { idcity } = req.body;
  const { iduser } = req.body;
  const companys = await Company.find({ idcity: idcity, status: true });
  const company = [];
  for (let i = 0; i < companys.length; i++) {
    const idc = companys[i]
    const likes = await Like.find({ iduser: iduser, idcompany: idc._id })
    if (likes.length > 0) {
      var like = true
    } else {
      var like = false
    }
    company.push({
      company: idc,
      like: like
    })
  }
  res.json(company);

};

companyCtrl.LikeCompany = async (req, res) => {
  const { iduser } = req.body;
  const { idcompany } = req.body;
  const like = new Like({
    iduser: iduser,
    idcompany: idcompany
  });
  await like.save();
  res.json({
    status: true
  });
};

companyCtrl.getLikesCompany = async (req, res) => {
  const idus = req.params.iduser;
  const like = await Like.find({ iduser: idus })
  const companys = [];
  for (let i = 0; i < like.length; i++) {
    const l = like[i].idcompany;
    const company = await Company.findById(l._id);
    company.like = true
    companys.push(company)
  }
  res.json(companys).status(200);

};

companyCtrl.getLikesByCompany = async (req, res) => {
  const id = req.params.id;
  const like = await Like.find({ idcompany: id })
  res.json(like).status(200);
};

companyCtrl.DeslikeCompany = async (req, res) => {
  const idus = req.body.iduser;
  const idcomp = req.body.idcompany;
  const like = await Like.findOne({ iduser: idus, idcompany: idcomp })
  await Like.findByIdAndRemove(like._id);
  res.json({
    status: true
  });
};

companyCtrl.searchCompany = async (req, res) => {
  const company = await Company.find({
    name: { $regex: ".*" + req.body.name + ".*" }
  });
  if (company) {
    res.status(200).send({ company, status: true });
  } else {
    res.json({
      status: "Empresa no encontrada"
    });
  }
};

companyCtrl.createCompany = async (req, res) => {
  const user = await User.findOne({ userName: req.body.userName })
  const company = new Company({
    name: req.body.name,
    nit: req.body.nit,
    businessname: req.body.businessname,
    delivery: req.body.delivery,
    horaryinit: req.body.horaryinit,
    description: req.body.description,
    horaryend: req.body.horaryend,
    idcity: mongoose.Types.ObjectId(req.body.city),
    iduser: mongoose.Types.ObjectId(user._id),
    img: req.body.img
  });
  await company.save();
  res.json({
    status: true
  });
};

companyCtrl.getCompanybyMont = async (req, res) => {
  const myVariable = [{
    name: "Enero",
    a: "1 Jan 2019",
    d: "31 Jan 2019"
  }, {
    name: "Febrero",
    a: "1 feb 2019",
    d: "28 feb 2019"
  }, {
    name: "Marzo",
    a: "1 mar 2019",
    d: "31 mar 2019"
  }, {
    name: "Abril",
    a: "1 apr 2019",
    d: "31 apr 2019"
  }, {
    name: "Mayo",
    a: "1 may 2019",
    d: "31 may 2019"
  }, {
    name: "Junio",
    a: "1 jun 2019",
    d: "30 jun 2019"
  }, {
    name: "Julio",
    a: "1 jul 2019",
    d: "31 jul 2019"
  }, {
    name: "Agosto",
    a: "1 aug 2019",
    d: "31 aug 2019"
  }, {
    name: "Septiembre",
    a: "1 sep 2019",
    d: "30 sep 2019"
  }, {
    name: "Octubre",
    a: "1 oct 2019",
    d: "31 oct 2019"
  }, {
    name: "Noviembre",
    a: "1 nov 2019",
    d: "30 nov 2019"
  }, {
    name: "Diciembre",
    a: "1 dec 2019",
    d: "31 dec 2019"
  }]
  const companies = []
  const NumUs = await Company.find().countDocuments()
  for (let i = 0; i < myVariable.length; i++) {
    const e = myVariable[i];
    const a = new Date(e.a)
    const d = new Date(e.d)
    const company = await Company.find({ created_at: { $gte: a, $lte: d } }).select('created_at')
    companies.push({
      name: e.name,
      companies: company
    });
  }
  res.json({
    "NumberCompanys": NumUs,
    "Companies": companies
  })

}

companyCtrl.updateCompany = async (req, res) => {
  const { id } = req.params;
  const company = {
    status: false
  };
  await Company.findByIdAndUpdate(id, { $set: company });
  res.json({
    status: "Empresa actualizada"
  });
};

companyCtrl.deleteCompany = async (req, res) => {
  const company = {
    status: false
  };
  await Company.findByIdAndUpdate(req.params.id, { $set: company });
  res.json({
    status: "Empresa eliminada"
  });
};


module.exports = companyCtrl;
