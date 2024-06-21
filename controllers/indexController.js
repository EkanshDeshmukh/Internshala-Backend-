const path = require('path')
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require('../models/studentModel');
const ErrorHandler = require("../utils/ErrorHandler");
const { sendmail } = require("../utils/nodemailer");
const { sendtoken } = require("../utils/sendToken");
const imagekit = require("../utils/imagekit").initImageKit();

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

exports.studentsendmail = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findOne({ email: req.body.email }).exec()

    if (!student)
        return next(new ErrorHandler('User Not Found With this email', 404))

    const url = `${req.protocol}://${req.get('host')}/student/forget-link/${student._id}`
    sendmail(req, res, next, url)
    student.resetpasswordtoken = 1
    await student.save()
    res.json({ student, url })
})

exports.studentforgetmail = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.params.id).exec()
    if (!student)
        return next(new ErrorHandler('User Not Found With this Email Address', 404))
    if (student.resetpasswordtoken == '1') {
        student.resetpasswordtoken = '0'
        student.password = req.body.password
        await student.save()
    }
    else {
        return next(
            new ErrorHandler(
                "Invalid Reset Password Link! Please try again",
                500
            )
        );
    }
    res.status(200).json({
        message: "Password has been successfully Changed",
    });
})

exports.studentresetpassword = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec()
    student.password = req.body.password
    await student.save()
    sendtoken(student, 201, res)
})

exports.studentupdate = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body)
    sendtoken(student, 201, res)
})

exports.studentavatar = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.params.id).exec();
    const file = req.files.avatar;
    const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(
        file.name
    )}`;

    if (student.avatar.fileId !== "") {
        await imagekit.deleteFile(student.avatar.fileId);
    }

    const { fileId, url } = await imagekit.upload({
        file: file.data,
        fileName: modifiedFileName,
    });
    student.avatar = { fileId, url };
    await student.save();
    res.status(200).json({
        success: true,
        message: "Profile updated!",
    });
});


// ------apply internship ----
exports.applyinternship = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const internship = await Internship.findById(
        req.params.internshipid
    ).exec();

    student.internships.push(internship._id);
    internship.students.push(student._id);
    await student.save();
    await internship.save();

    res.json({ student, internship });
});

// ------apply job ----
exports.applyjob = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const job = await Job.findById(req.params.jobid).exec();

    student.jobs.push(job._id);
    job.students.push(student._id);
    await student.save();
    await job.save();
    res.json({ student, job });
});

// -----------------------read all jobs---------------

exports.readalljobs = catchAsyncErrors(async (req, res, next) => {
    const jobs = await Job.find().exec();

    res.status(200).json({ jobs });
});

// -------------------read all internships ----
exports.readallinternships = catchAsyncErrors(async (req, res, next) => {
    const internships = await Internship.find().exec();

    res.status(200).json({ internships });
});