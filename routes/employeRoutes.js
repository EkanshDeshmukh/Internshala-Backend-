const express = require('express')
const router = express.Router()

const { isAuthenticated } = require('../middlewares/auth')
const { homepage, employesignup, employesignin, employesignout, employesendmail, employeforgetlink, employeresetpassword, employeupdate, employeavatar, currentEmploye } = require('../controllers/employeController')

//  GET/
router.get('/', homepage)

//POST /SIGNUP
router.post('/signup', employesignup)

//POST /SIGNIN
router.post('/signin', employesignin)


router.post("/current", isAuthenticated, currentEmploye);

//GET //SIGNOUT
router.get('/signout', isAuthenticated,employesignout)

//POST //SEND-MAIL
router.post('/send-mail', employesendmail)

//POST //FORGET-LINK
router.get('/forget-link/:id', employeforgetlink)

// POST /employe/reset-password/:employeid
router.post('/reset-password/:id', isAuthenticated,employeresetpassword)

// POST /employe/update/:employeid
router.post('/update/:id',isAuthenticated, employeupdate)

// POST /employe/avatar/:employeid
router.post('/avatar/:id', isAuthenticated,employeavatar)


//


module.exports = router