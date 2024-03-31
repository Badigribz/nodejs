const Joi = require('joi');

const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
})

// const vendorValidate = Joi.object({
//     firstname: Joi.string().required(),
//     lastname: Joi.string().required(),
//     phonenumber: Joi.string().required(),
//     email: Joi.string().required(),
//     address: Joi.string().required(),
// })

module.exports ={
   authSchema,
//    vendorValidate

}

