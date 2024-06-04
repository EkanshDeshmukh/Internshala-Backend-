require('dotenv').config('./.env')

const express = require('express')
const app = express()

const logger = require('morgan')
const ErrorHandler = require('./utils/ErrorHandler')
const { generatedErrors } = require('./middlewares/errors')
app.use(logger('tiny'))

app.use('/', require('./routes/indexRoutes'))


//error handling 
app.all('*',(req,res,next)=>{
    next(new ErrorHandler(`Requested URL Not Found ${req.url}`,404))
})

app.use(generatedErrors)

app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
})