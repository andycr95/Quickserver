const resetpassCtrl = {}

var mongoose = require("mongoose");
const User =  require('../models/user');
const nodemailer = require('nodemailer');
const userCtrl = require('../controllers/user.controller')

resetpassCtrl.getUserByEmail = async (req, res ) => {
    const user = await User.find({'email' : req.params.email }).select(' -created_at -address -status -documentNumber -fullName -phone -surName -photo -documentType -gender -userName -role -__v')
  
    /* let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "98f67adcb7a28b", // generated ethereal user
          pass: "2cf15289b4ff64" // generated ethereal password
        }
    }); */
    
    if( user )
    { 
        userCtrl.updatePass(user)
        /* let mailOptions = {
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: user, // list of receivers
            subject: "Contraseña nueva", // Subject line
            text: "", // plain text body
            html: "<h1>Reestableciendo contraseña</h1> <br/> <p>Esta es una contraseña temporal: 123 ingrese a su cuenta y cambiela</p>" // html body
        };

        let info = await transporter.sendMail(mailOptions)

        const send = ("Message sent: %s", info.messageId); */
        
        res.status(200).send({
            message: 'Contraseña actualizada, revisa tu email' ,
            status : true
        })
    }else
    {
 
        res.status(200).send({ message: 'Correo electronico existe' , status : false })

    }
}


module.exports = resetpassCtrl;