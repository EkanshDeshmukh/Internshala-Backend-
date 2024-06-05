require('dotenv').config('./.env')

const express = require('express')
const app = express()
require('./models/database').connectDatabase()

//MORGAN
const logger = require('morgan')
app.use(logger('tiny'))

//BODY-PARSER
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//SESSION & COOKIES
const session = require('express-session')
const cookieparser = require('cookie-parser')
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET
}))
app.use(cookieparser())

const ErrorHandler = require('./utils/ErrorHandler')
const { generatedErrors } = require('./middlewares/errors')


app.use('/', require('./routes/indexRoutes'))


//error handling 
app.all('*', (req, res, next) => {
    next(new ErrorHandler(`Requested URL Not Found ${req.url}`, 404))
})

app.use(generatedErrors)

app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
})