const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require('../models/studentModel');
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/sendToken");

exports.homepage = catchAsyncErrors(async (req, res, next) => {
    res.json({ message: "Homepage" });
});

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec()
    res.json({ student })
})

exports.studentsignup = catchAsyncErrors(async (req, res, next) => {
    const student = await new Student(req.body).save();
    sendtoken(student, 201, res);
});

exports.studentsignin = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findOne({ email: req.body.email }).select('+password').exec();
    if (!student) return next(new ErrorHandler('User Not Found With this Email', 404));

    const isMatch = await student.comparepassword(req.body.password);
    if (!isMatch) return next(new ErrorHandler('Wrong Credentials', 401));
    sendtoken(student, 201, res);
});

exports.studentsignout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie('token');
    res.json({ message: "Successfully signed out!" });
});
