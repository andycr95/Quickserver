const invoiceCtrl = {}
const Invoice =  require('../models/invoice')
const factureref =  require('../models/factureref')

invoiceCtrl.getInvoices = async (req, res ) => {
    const invoice = await Invoice.find()
    res.json(invoice)
}

invoiceCtrl.getInvoice = async (req, res ) => {
    const factnum = await Invoice.findOne({idbranchoffice : req.body.idbranchoffice}).sort({$natural:-1}).limit(1).select("factnum")
    res.json(factnum)
}

invoiceCtrl.createInvoice = async (req, res ) => {

    const num = await Invoice.find({idbranchoffice : req.body.branch}).countDocuments()
    const factnum = await Invoice.findOne({idbranchoffice : req.body.branch}).sort({$natural:-1}).limit(1).select("factnum")    
    const numref = await factureref.findOne({idbranchoffice : req.body.branch})
    
    if (num > 0) {
        if (factnum.factnum < numref.numFin) {
            const invoice = new Invoice({
                iduser : req.body.user,
                num : num+1,
                factnum : factnum.factnum+1,
                idbranchoffice : req.body.branch,
                created_at : Date.now(),
                status : true
            })
            await invoice.save()
            res.json({
                status: 'Invioce registered1',
                invoice: invoice._id
            })
            console.log(invoice+"1");
        } else if(factnum.factnum >= numref.numFin) {
            res.json({
                status: 'Invioce Limit'
            })
            console.log("invoice limit");      
        } 
    } else {
        const invoice = new Invoice({
            iduser : req.body.user,
            num : 1,
            factnum : numref.numInicio,
            idbranchoffice : req.body.branch,
            created_at : Date.now(),
            status : true
        })
        await invoice.save()
        res.json({
            status: 'Invioce registered3',
            invoice: invoice._id
        })
        console.log(invoice+"2");
    }   
}

module.exports = invoiceCtrl

