const express = require('express');

const studentController = require('../controllers/studentController')

const routes = express.Router();


routes.post('/addstudents',  studentController.addStudent)
routes.post('/getAllstudents',  studentController.getStudents)
routes.get( '/getstudents', studentController.getStudent)
routes.get( '/deleteStudent', studentController.deleteStudent)



module.exports = routes;