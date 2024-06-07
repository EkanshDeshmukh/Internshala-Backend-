const express = require('express');
const { homepage, studentsignup, studentsignin, studentsignout, currentUser, studentsendmail, studentforgetmail, studentresetpassword, studentupdate, studentavator, studentavatar } = require('../controllers/indexController');
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

router.post('/student/send-mail', isAuthenticated, studentsendmail)

router.post('/student/forget-link/:id', isAuthenticated, studentforgetmail)

router.post('/student/reset-password/:id', isAuthenticated, studentresetpassword)

router.post('/student/update/:id', isAuthenticated, studentupdate)

router.post('/student/avatar/:id', isAuthenticated, studentavatar)





module.exports = router;