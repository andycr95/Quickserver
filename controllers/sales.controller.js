const salesCtrl = {}

const mongoose = require("mongoose")

const Sales =  require('../models/sale')
const Company =  require('../models/company')

salesCtrl.getSales = async (req, res ) => {
    const sales = await Sales.find({status: true}).limit(5)
    res.json(sales)
}

salesCtrl.getAllSales = async (req, res ) => {
    const sales = await Sales.find({status: true})
    res.json(sales)
}

salesCtrl.getSalebycompany = async (req, res ) => {
    const sales = await Sales.find({idcompany:req.params.id, status:true})
    res.json({
        status:true,
        sales
    })
}


salesCtrl.createSale = async (req, res ) => {
    const sales = req.body.sale
    const company = req.body.company
        const sale = new Sales({
            name : sales.name,
            description : sales.description,
            img: sales.img,
            price:  sales.price,
            idcompany:  company,
            status:  true,
            created_at : new Date()
        })
        await sale.save() 
        res.json({
            status: 'Promoción registrada'
        })
}

salesCtrl.updateSale = async (req, res ) => {
    const sales = req.body.sale
    const sale = {
        name : sales.name,
        description : sales.description,
        img: sales.img,
        price:  sales.price,
        updated_at : new Date()
    };
    await Sales.findByIdAndUpdate(sales._id, { $set: sale })
    res.json({
        status: 'sale updated'
    })
    
}


salesCtrl.deleteSale = async (req, res) => {
    const sale = {
        status: false
    }
    await Sales.findByIdAndUpdate(req.params.id, { $set: sale })
    res.json({
        status: 'sale removed'
    })
}



module.exports = salesCtrl