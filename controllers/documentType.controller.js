const documentTypeCtrl = {}

const DocumentType =  require('../models/documentType')

documentTypeCtrl.getDocuments = async (req, res ) => {
    const documentTypes = await DocumentType.find().select(" -estatus ")
    res.json(documentTypes)
}

module.exports = documentTypeCtrl