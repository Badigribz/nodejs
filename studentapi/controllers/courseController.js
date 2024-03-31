const db = require('../models/indexStart')
const createError =require('http-errors')

//use the mode
const Course = db.courses

module.exports={
    //add course
     addCourse :async(req, res, next)=>{

        try {
             let info = {
                coursename: req.body.coursename
               
             }
             
             const addCourse = await Course.create(info)
             res.status(200).send(addStudent)
        } catch (error) {
            next(error)
        }
    },


    //     //get all students with course 
    //     getStudents :async(req, res, next)=>{
    //         try {
                
    //               let allStudents = await Student.findAll({
    //                  include: [{model: Course,attributes:['coursename']}]
    //               })
    //               res.status(200).send(addStudent)
    //              } catch (error) {
    //                 next(error)
    //             }
    //     },


    // //get student by id
    // getStudent :async(req, res, next)=>{

    //     try {
    //          let id = req.params.id 
             
    //          let student = await Student.findOne({ where: {student_id: id}})

    //          if(!student){
    //               throw(createError(404, "Student does not exist"))
    //          }
    //          res.status(200).send(addStudent)
    //          } catch (error) {
    //             next(error)
    //         }
    // },

    //  //update student
    // updateStudent :async(req, res, next)=>{

    //     try {
    //          let id = req.params.id 
             
    //          const student = await Student.update(req.body, { where: {student_id: id}})
    //          if(!student){
    //               throw(createError(404, "Student does not exist"))
    //          }
    //          res.status(200).send(addStudent)
    //          } catch (error) {
    //             next(error)
    //         }
    // },

    //delete student
    deleteCourse :async(req, res, next)=>{

        try {
             let id = req.params.id
             
             await Course.destroy({ where: {course_id: id}})
             res.status(200).send("Course Deleted Successfully")
        } catch (error) {
            next(error)
        }
    }
}