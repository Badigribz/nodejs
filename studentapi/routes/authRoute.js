const express = require('express');

const authController = require('../controllers/auth.controller')

const routes = express.Router();


routes.post('/addUser',  authController.addUser)
routes.post('/getAllUsers',  authController.getUser)
routes.post( '/login', authController.loginUser)
// routes.get( '/deleteStudent', studentController.deleteStudent)


module.exports = routes;