const express = require('express')
const router = express.Router()

const { isAuthenticated } = require('../middlewares/auth')
const { resume, addeducation, editeducation, deleteeducation } = require('../controllers/resumeController')


//GET /resume/
router.get('/', isAuthenticated, resume)

//POST /resume/add-edu
router.post('/add-edu', isAuthenticated, addeducation)

router.post('/edit-edu/:eduid', isAuthenticated, editeducation)

router.post('/delete-edu/:eduid', isAuthenticated, deleteeducation)




module.exports = router