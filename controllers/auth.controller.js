const bcrypt = require('bcrypt-nodejs')
const User = require('../models/user')
const service = require('../services')



async function signIn(req, res)
{
   
    const user = await User.findOne({'userName' : req.body.username })
    if( user )
    {
        bcrypt.genSalt(10, (err , salt) => 
        {
            if(err) return next(err)

            bcrypt.hash( "admin" , salt, null, (err, hash) => 
            {
                if(err) return next(err)
                bcrypt.compare(req.body.password, user.password , function(err, isMatch) 
                {
                    if( isMatch )
                    {
                       req.session.user = user._id
                       res.status(200).send({
                                 message: 'Te has logueado' ,
                                 user: user, 
                                 status : true , 
                                 token: service.createToken(user)
                                })
                    }
                    else
                    {
                       res.status(200).send({ message: 'Error al iniciar sesión' , status : false })
                    }
                })
            })
            
        })
    }
    else
    {
        res.status(200).send({ message: 'El usuario con el que intentas ingresar no existe en el sistema.' , status : false })
    }
}

async function closeSesion(req, res)
{
    req.session.destroy();
}
module.exports = 
{
    signIn,
    closeSesion
}