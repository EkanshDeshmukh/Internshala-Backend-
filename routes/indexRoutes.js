const express = require('express');
const { homepage, studentsignup, studentsignin, studentsignout, currentUser } = require('../controllers/indexController');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router()


//GET /
router.get('/', isAuthenticated, homepage)

router.post('/student', isAuthenticated, currentUser)

//POST/student/signup
router.post('/student/signup', studentsignup)

//POST/student/signin
router.post('/student/signin', isAuthenticated, studentsignin)

//GET /student/signout
router.get('/student/signout', isAuthenticated, studentsignout)


module.exports = router;