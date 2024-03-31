const db = require('../models/indexStart')
const createError =require('http-errors')
const {signAccessToken} = require('../helpers/jwtHelper')
const {authSchema} = require('../helpers/validateSchema')
const {signRefreshToken} = require('../helpers/jwtHelper')
//use the mode
const User = db.users

module.exports={

    //add user
     addUser :async(req, res, next)=>{
         try {
             const{email ,password}= await authSchema.validateAsync(req.body)
             const exists = await User.findOne({where: {email}})
             if (exists) {
                throw createError.Conflict(`${email} has already been regiterd`)
             }
             const newUser = new User({email, password})
             const savedUser = await newUser.save()

             const accessToken = await signAccessToken(savedUser.user_id)
             const refreshToken= await signRefreshToken(savedUser.user_id)
             res.status(200).send({accessToken,refreshToken});

        } catch (error) {
            next(error)
        }
    },

       //get all users
        getUser :async(req, res, next)=>{
            try {
                  let allUsers = await user.findAll({})
                  res.status(200).send(allUsers)

                 } catch (error) {
                    next(error)
                }
        },


    // login user
    loginUser :async(req, res, next)=>{
        try {
            const result = await authSchema.validateAsync(req.body)
            const user = await User.findOne({where: {email: result.email}});

            if (!user) {throw createError.NotFound(`User not registerd`)};

            //matching the password
            const isMatch = await user.isValidPassword(result.password);
            if (!isMatch) {throw createError.Unauthorized(`Username/Password not valid`)};
            
            //if password matches, then generate token
            const accessToken = await signAccessToken(user.user_id);
            const refreshToken= await signRefreshToken(user.user_id);

            res.send({accessToken, refreshToken});

       } catch (error) {
        if (error.isJoi ===true)
             return next(createError.BadRequest('Inavlid username/password'));
           next(error)
       }
   },
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