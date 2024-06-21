const express = require('express')
const router = express.Router()

const { isAuthenticated } = require('../middlewares/auth')
const { homepage, employesignup, employesignin, employesignout, employesendmail, employeforgetlink, employeresetpassword, employeupdate, employeavatar, currentEmploye, createinternship, readinternship, readsingleinternship, createjob, readjob, readsinglejob } = require('../controllers/employeController')

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


// -------------- Internship --------
// POST /employe/internship/create
router.post("/internship/create", isAuthenticated, createinternship);

// POST /employe/internship/read
router.post("/internship/read", isAuthenticated, readinternship);

// POST /employe/internship/read/:id
router.post("/internship/read/:id", isAuthenticated, readsingleinternship);

// -------------- Job --------
// POST /employe/job/create
router.post("/job/create", isAuthenticated, createjob);

// POST /employe/job/read
router.post("/job/read", isAuthenticated, readjob);

// POST /employe/job/read/:id
router.post("/job/read/:id", isAuthenticated, readsinglejob);


module.exports = router