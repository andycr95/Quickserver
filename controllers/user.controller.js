const userCtrl = {}

var mongoose = require("mongoose")
const User =  require('../models/user')
const bcrypt = require('bcrypt-nodejs')
mongoose.set('useFindAndModify', false)


userCtrl.getUsers = async (req, res ) => {
    const users = await User.find().select("-password")
    res.json(users)
}

userCtrl.getUser = async (req, res ) => {
    const user = await User.findById(req.params.id)
    res.json(user)
}


userCtrl.getUserByEmail = async (req, res ) => {
    
    const user = await User.find({email : req.params.email})
    if (Object.keys(user).length != 0)
    {
        res.json({
            status:true,
            user
        })
    } 
    else
    {
        res.json({
            status:false
        })
    }
}

userCtrl.getUserByName = async (req, res ) => {
    const user = await User.find({userName : req.params.userName})
    if (Object.keys(user).length != 0)
    {
        res.json({
            status:true,
            user
        })
    } 
    else
    {
        res.json({
            status:false
        })
    }   
}

userCtrl.getUserbyMont = async (req, res) => {
    const myVariable = [{
        name: "Enero",
        a: "1 Jan 2019",
        d: "31 Jan 2019"},{
        name: "Febrero",
        a:"1 feb 2019",
        d:"28 feb 2019"},{
        name: "Marzo",
        a:"1 mar 2019",
        d:"31 mar 2019"},{
        name: "Abril",
        a:"1 apr 2019",
        d:"31 apr 2019"},{
        name: "Mayo",
        a:"1 may 2019",
        d:"31 may 2019"},{
        name: "Junio",
        a:"1 jun 2019",
        d:"30 jun 2019"},{
        name: "Julio",
        a:"1 jul 2019",
        d:"31 jul 2019"},{
        name: "Agosto",
        a:"1 aug 2019",
        d:"31 aug 2019"},{
        name: "Septiembre",
        a:"1 sep 2019",
        d:"30 sep 2019"},{
        name: "Octubre",
        a:"1 oct 2019",
        d:"31 oct 2019"},{
        name: "Noviembre",
        a:"1 nov 2019",
        d:"30 nov 2019"},{
        name: "Diciembre",
        a:"1 dec 2019",
        d:"31 dec 2019"
    }]
    const users = []
    const NumUs = await User.find().countDocuments()
    for (let i = 0; i < myVariable.length; i++) {
        const e = myVariable[i];
        const a = new Date(e.a)
        const d = new Date(e.d)
        const user = await User.find({created_at:{$gte:a, $lte:d}}).select('created_at')
        users.push({
            name:e.name,
            users: user});
    }
    res.json({
        "NumberUsers" :NumUs,
        "Users": users 
    })
    
}

userCtrl.createUser = async (req, res ) => {
    var idrole = getRol(req.body.idrol)
    if (req.body.typedocument) {
        var typedocument = getTypeDocument(req.body.typedocument)
        var gender = getGender(req.body.typegenderuser)
        const user = new User({
            address: req.body.address,
            documentNumber: req.body.documentNumber,
            email: req.body.email,
            fullName: req.body.fullName,
            password: req.body.password,
            phone: req.body.phone,
            birthdate: req.body.birthdate,
            surName: req.body.surName,
            photo: req.body.photo,
            documentType: typedocument,
            gender: gender,
            userName: req.body.userName,
            role:idrole
          })
          const response = await user.save()
            if(response.status)
            {
                res.json({
                    status: true
                })
            }
            else
            {
                res.json({
                    status: false
                })
            }
    } else {
        const user = new User({
          address: req.body.address,
          documentNumber: req.body.documentNumber,
          email: req.body.email,
          fullName: req.body.fullName,
          password: req.body.password,
          phone: req.body.phone,
          surName: req.body.surName,
          photo: req.body.photo,
          birthdate: req.body.birthdate,
          documentType: req.body.typedocument,
          gender: req.body.gender,
          userName: req.body.userName,
          role:idrole
        })
        const response = await user.save()
        if(response.status){
            res.json({
                status: true
            })
        }
        else
        {
            res.json({
                status: false
            })
        }
    }    
}

userCtrl.updateUser = async (req, res ) => {
    const { id } = req.params
    const data = req.body
    var documentType = getTypeDocument(data.typedocument)
    var gender = getGender(data.typegenderuser)
    if (req.body.email) {
        const userData = {
            documentNumber : data.documentNumber,
            typedocument : documentType,
            gender : gender,
            address : data.address,
            birthdate: data.birthdate,
            phone : data.phone,
            email : data.email,
            password : data.password
        }
        await User.findByIdAndUpdate(id, {$set: userData })
        res.json({
            status: 'User data updated'
        })        
    } else {
        const userData = {
            documentNumber : data.documentNumber,
            typedocument : documentType,
            gender : gender,
            address : data.address,
            birthdate: data.birthdate,
            phone : data.phone,
            userName : data.userName,
            password : data.password
        }
        await User.findByIdAndUpdate(id, {$set: userData })
        res.json({
            status: 'User data updated'
        })
    }
    
 }

userCtrl.updatePass = async(user) =>
{  
    for (let index = 0; index < user.length; index++) 
    {
        const id = user[index].id   
        var salt = bcrypt.genSaltSync(8)
        var hash = bcrypt.hashSync("123456", salt)
        const password = {
            password : hash
        } 
        await User.findByIdAndUpdate(id, {$set: password })
    }
}

userCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndRemove(req.params.id)
    res.json({
        status: 'User removed'
    })
}

function getRol(idrol)
{
  var resultRol = ""
  switch(idrol) 
  {
    case "5c3405a747b76e2113f75926":
    //client
        resultRol = mongoose.Types.ObjectId("5c3405a747b76e2113f75926")  
    break;
    case "5c3405a747b76e2113f75927":
    //waiter
        resultRol = mongoose.Types.ObjectId("5c3405a747b76e2113f75927")  
    break;
    case "5c3405a747b76e2113f75925":
    //admin
       resultRol = mongoose.Types.ObjectId("5c3405a747b76e2113f75925")  
    break;
    default:
        resultRol = resultRol = mongoose.Types.ObjectId("5c3405a747b76e2113f75926")
    break;
  }
  return resultRol

}
function getGender(idgender)
{
    var resultgGender = ""
    if(idgender=="1")
    {
        resultgGender = mongoose.Types.ObjectId("5c342fd24f5fbf23e32dc8e1")  
    }
    else
    {
        resultgGender = mongoose.Types.ObjectId("5c342fd24f5fbf23e32dc8e2")  
    }
    return resultgGender
}

function getTypeDocument(idtypedocument)
{
    var resultIdTypeDocument = ""
    switch(idtypedocument) 
    {
        case "1":
          resultIdTypeDocument = mongoose.Types.ObjectId("5c2ed7eabe2bcc1e5980f560")  
        break;
        case "2":
          resultIdTypeDocument = mongoose.Types.ObjectId("5c2ed7eabe2bcc1e5980f561")  
        break;
        case "3":
          resultIdTypeDocument = mongoose.Types.ObjectId("5c2ed7eabe2bcc1e5980f562")  
        break;
        default:
          resultIdTypeDocument = "1"
        break;
    }
    return resultIdTypeDocument
}

module.exports = userCtrl