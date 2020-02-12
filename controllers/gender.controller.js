const gendertCtrl = {}
const Gender =  require('../models/gender')

gendertCtrl.getGenders = async (req, res ) => {
    const gender = await Gender.find()
    res.json(gender)
}
module.exports = gendertCtrl