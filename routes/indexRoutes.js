const express = require('express');
const { homepage, studentsignup, studentsignin, studentsignout, currentUser, studentsendmail, studentforgetmail, studentresetpassword, studentupdate, studentavator, studentavatar, readalljobs, readallinternships, applyinternship, applyjob } = require('../controllers/indexController');
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


// --------------------read all jobs-----------------------------
router.post("/student/alljobs/", isAuthenticated, readalljobs);

// --------------------read all jobs-----------------------------
router.post("/student/allinternships/", isAuthenticated, readallinternships);

// ------------apply internship--------------
// POST /student/apply/internship/:internshipid
router.post(
    "/student/apply/internship/:internshipid",
    isAuthenticated,
    applyinternship
);

// ------------apply job--------------
// POST /student/apply/job/:jobid
router.post("/student/apply/job/:jobid", isAuthenticated, applyjob);




module.exports = router;