const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const studentModel = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is Required'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        select: false,
        required: true
    }
}, { timestamps: true })

studentModel.pre('save', function () {
    if (!this.isModified('password')) return;
    let salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt);
})

studentModel.methods.comparepassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

studentModel.methods.getjwttoken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES
    })
}

module.exports = mongoose.model('student', studentModel)