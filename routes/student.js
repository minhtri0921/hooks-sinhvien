const express = require('express')
const StudentsController = require('../controllers/StudentsController')
const router = express.Router();

router.get('/',StudentsController.getListStudents)
router.post('/add',StudentsController.addStudent)
router.put('/edit',StudentsController.editStudent)
router.delete('/delete/:id',StudentsController.deleteStudent)

module.exports = router;