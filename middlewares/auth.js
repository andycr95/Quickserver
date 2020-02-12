const services = require('../services')

function isAuth(req, res, next)
{
    if(!req.headers.authorization)
    {
       return res.status(403).send({ message: 'No tienes autorización'})
    }

    const token = req.headers.authorization
   
    var response = services.decodeToken(token)

    if( response.status == 200 )
      return next()
    

    return res.status(response.status).send({ response : response})
    next()
}

function isLogged(req, res, next)
{
    if(!req.headers.authorization)
    {
       return res.redirect('/')
    }

    const token = req.headers.authorization
   
    var response = services.decodeToken(token)

    if( response.status == 200 )
      return next()
    

    return res.redirect('/tabs/tab1')
    next()
    
}
module.exports = 
{
    isAuth , 
    isLogged
}
 