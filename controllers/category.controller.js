const categorytCtrl = {}
const Category = require('../models/category')

categorytCtrl.getCategorys = async (req, res) => {
    const category = await Category.find()
    res.json(category)
}

categorytCtrl.getCategory = async (req, res) => {
    const category = await Category.findById(req.params.id)
    res.json(category)
}

categorytCtrl.getCategoryType = async (req, res) => {
    const category = await Category.find({ type: req.params.type })
    res.json(category)
}

categorytCtrl.searchCategory = async (req, res) => {
    const category = await Category.find({ 'name': req.body.name })
    if (category) {
        res.status(200).send({ category, status: true })
    } else {
        res.json({
            status: 'Categoria no encontrada'
        })
    }
}

categorytCtrl.createCategory = async (req, res) => {
    const category = new Category({
        name: req.body.category,
        type: req.body.type
    })
    await category.save()
    res.json({
        status: 'Categoria registrada'
    })
}

categorytCtrl.updateCategory = async (req, res) => {
    const { id } = req.params
    const category = {
        name: req.body.name
    }
    await Category.findByIdAndUpdate(id, { $set: category }, { new: true })
    res.json({
        status: 'Categoria actualizada'
    })
}

categorytCtrl.deleteCategory = async (req, res) => {
    await Category.findByIdAndRemove(req.params.id)
    res.json({
        status: 'Categoria eliminada'
    })
}

module.exports = categorytCtrl