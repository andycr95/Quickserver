var mongoose = require("mongoose")
const User = require('../models/user')
const DocumentType = require('../models/documentType')
const Gender = require('../models/gender')
const Rol = require('../models/role')
const Category = require('../models/category')
const Product = require('../models/product')
const City = require('../models/city')

exports.createUser = function () {
  var administrador = new User
    ({
      fullName: "Jhon Javier",
      surName: "Renteria Hinojosa",
      documentType: null,
      documentNumber: "1111760852",
      age: 30,
      email: "jhon.renteria@sigma7.com",
      photo: "photo.png",
      userName: "jhon.renteria",
      password: "123",
      status: true,
      role: null,
      created_at: new Date(),
      updated_at: new Date()
    })
  administrador.save()
}

exports.createDocumentType = function () {
  var documentType = new DocumentType({
    identifier: 1,
    typeDocument: "Cedula",
    estatus: true
  })
  documentType.save()

  var documentType = new DocumentType({
    identifier: 2,
    typeDocument: "Nit",
    estatus: true
  })
  documentType.save()

  var documentType = new DocumentType({
    identifier: 3,
    typeDocument: "Tarjeta de identidad",
    estatus: true
  })
  documentType.save()
}

exports.createGender = function () {
  var gender = new Gender({
    idgender: 1,
    gender: "Femenino",
    status: true
  })
  gender.save()

  var gender = new Gender({
    idgender: 2,
    gender: "Masculino",
    status: true
  })
  gender.save()
}

exports.createRol = function () {
  var rol = new Rol({
    roleName: "admin",
    updated_at: new Date()
  })
  rol.save()

  var rol = new Rol({
    roleName: "client",
    updated_at: new Date()
  })
  rol.save()

  var rol = new Rol({
    roleName: "waiter",
    updated_at: new Date()
  })
  rol.save()
}

exports.createCategory = function () {
  var category = new Category({
    name: "Hamburguesas",
    type: "product"
  })

  category.save()

  var category = new Category({
    name: "Salchipapas",
    type: "product"
  })

  category.save()

  var category = new Category({
    name: "Perros",
    type: "product"
  })

  var category = new Category({
    name: "Gaseosas",
    type: "adicion"
  })

  category.save()

  var category = new Category({
    name: "Snacks",
    type: "adicion"
  })

  category.save()
}

exports.createProduct = function () {
  var product = new Product({
    code: '02',
    name: 'Salchipa',
    idcategory: mongoose.Types.ObjectId("5c3d8ec08a4b99324a3de948"),
    price: 70000,
    updated_at: new Date()
  })
  product.save()

  var product = new Product({
    code: '03',
    name: 'Malteada',
    idcategory: mongoose.Types.ObjectId("5c3d8ec08a4b99324a3de946"),
    price: 70000,
    updated_at: new Date()
  })
  product.save()

  var product = new Product({
    code: '05',
    name: 'Picada ',
    idcategory: mongoose.Types.ObjectId("5c3d8ec08a4b99324a3de947"),
    price: 200000,
    updated_at: new Date()
  })
  product.save()
}


exports.createCity = function () {
  var city = new City({
    idcity: 1,
    name: 'Buenaventura'
  })
  city.save()

  var city = new City({
    idcity: 2,
    name: 'Cali'
  })
  city.save()

  var city = new City({
    idcity: 3,
    name: 'Medellin'
  })
  city.save()

  var city = new City({
    idcity: 4,
    name: 'Bogotá'
  })
  city.save()

  var city = new City({
    idcity: 5,
    name: 'Cartagena'
  })
  city.save()

}