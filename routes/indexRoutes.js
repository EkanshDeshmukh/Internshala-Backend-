const express = require('express');
const { homepage, studentsignup, studentsignin, studentsignout } = require('../controllers/indexController');
const router = express.Router()


//GET /
router.get('/', homepage)

//POST/student/signup
router.post('/student/signup', studentsignup)

//POST/student/signin
router.post('/student/signin', studentsignin)

//GET /student/signout
router.post('/student/signout', studentsignout)


module.exports = router;