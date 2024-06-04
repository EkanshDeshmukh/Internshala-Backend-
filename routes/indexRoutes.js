const express = require('express');
const { homepage, studentsignup } = require('../controllers/indexController');
const router = express.Router()


//GET /
router.get('/', homepage)

//POST/student/signup
router.post('/student/signup', studentsignup)

module.exports = router;