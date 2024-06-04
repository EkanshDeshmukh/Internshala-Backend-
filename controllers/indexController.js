const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors")
const Student = require('../models/studentModel')
const ErrorHandler = require("../utils/ErrorHandler")

exports.homepage = catchAsyncErrors(async (req, res, next) => {
    res.json({ message: "Homepage" })
})
exports.studentsignup = catchAsyncErrors(async (req, res, next) => {
    //res.json(req.body)
    const student = await new Student(req.body).save()
    res.status(201).json({ message: "Student registered successfully", student });
})

exports.studentsignin = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findOne({ email: req.body.email }).select('+password').exec()
    if (!student) return next(new ErrorHandler('User Not Found With this Email', 404))

    const isMatch = student.comparepassword(req.body.password)
    if (!isMatch) return next(new ErrorHandler('Wrong Credientials', 500))
    res.status(201).json({ message: "Student Login successfully", student });

})

exports.studentsignout = catchAsyncErrors(async (req, res, next) => {

})
