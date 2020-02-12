const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken (user)
{
    const payload =
    {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix(),
    }

    return jwt.encode(payload, config.SECRET_TOKEN)
}
function decodeToken (token)
{
    var response = null
    try 
    { 
        const payload = jwt.decode(token, config.SECRET_TOKEN) 
         
        if(payload.exp <= moment().unix())
        {   
            response = { status: 401, message: 'El token ha expirado' }
        } 
        response = { status: 200, message: 'El token es valido #' }
    } 
    catch (error) 
    {
        response = { status: 401, message: 'Token no valido' } 
    }
    finally 
    {
        return response
    }
}

module.exports = 
{ 
    createToken ,
    decodeToken
}