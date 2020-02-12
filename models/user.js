const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

var UserSchema = new mongoose.Schema
    ({
        fullName: String,
        surName: String,
        documentType: { type: mongoose.Schema.Types.ObjectId, ref: 'documentType' },
        documentNumber: String,
        address: String,
        phone: Number,
        email: { type: String, unique: true, lowercase: true },
        photo: String,
        userName: String,
        password: String,
        status: { type: Boolean, default: true },
        role: { type: mongoose.Schema.Types.ObjectId, ref: 'roles' },
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'company' },
        created_at: { type: Date, default: Date.now() },
        updated_at: Date
    })
UserSchema.pre('save', function (next) {
    let user = this
    if (!user.isModified('password'))
        return next()

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err)

            user.password = hash
            next()
        })
    })
})


module.exports = mongoose.model('user', UserSchema)