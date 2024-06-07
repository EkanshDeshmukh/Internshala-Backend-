const nodemailer = require('nodemailer')
const ErrorHandler = require('./ErrorHandler')


exports.sendmail = (req, res, next, url) => {
    const transport = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        post: 465,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.MAIL_PASSWORD
        }
    })
    const mailOptions = {
        from: 'EKANSH PRIVATE LIMITED',
        to: req.body.email,
        subject: "Password Reset Link",
        html: `<h1>Click link for reset password</h1>`
    }
    transport.sendMail(mailOptions, (err, info) => {
        if (err)
            return next(new ErrorHandler(err, 500))
        console.log(info);
        return res.status(200).json({
            message: 'Mail sent successfully',

        })
    })

}