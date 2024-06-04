const mongoose = require('mongoose')

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

module.exports = mongoose.model('students', studentModel)