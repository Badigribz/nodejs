const express =require('express')

const courseController =require('../controllers/courseController')
const {verifyAccessToken} =require('../helpers/jwtHelper')

const routes = express.Router();


routes.post('/addCourse', courseController.addCourse)
routes.get('/getAllCourses', verifyAccessToken, courseController.getCourses)



module.exports = routes