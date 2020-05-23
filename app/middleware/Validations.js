const Joi = require("@hapi/joi");

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const APIValidator = (schema, property) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        const valid = error == null;
        if(valid)
        {
            return next();
        }
        return res.status(400).send({success: false, error});
    }
}

const createPatientSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
    mobile: Joi.string().min(10).regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).required(),
    birthDate: Joi.date().iso().required(),
    username: Joi.string().min(3).required(),
    gender: Joi.string().valid(...["male", "female"]).required(),
});




const loginPatientSchema = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().min(8).required(),
    username: Joi.string().min(3)
}).xor("email", "username");


const updatePatientSchema = Joi.object().keys({
    email: Joi.string().email().forbidden(),
    firstName: Joi.string().min(3).forbidden(),
    lastName: Joi.string().min(3).forbidden(),
    password: Joi.string().min(8).optional(),
    mobile: Joi.string().min(10).optional().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im),
    birthDate: Joi.date().iso().optional(),
    username: Joi.string().min(3).forbidden(),
    allergies: Joi.array().optional(),
    conditions: Joi.array().optional(),
    bloodType: Joi.string().valid(...BLOOD_TYPES).optional(),
    gender: Joi.string().valid(...["male", "female"]).optional(),
});

const createDoctorSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
    mobile: Joi.string().min(10).regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).required(),
    birthDate: Joi.date().iso().required(),
    username: Joi.string().min(3).required(),
    gender: Joi.string().valid(...["male", "female"]).required(),
    specialization: Joi.string().min(3).required(),
});

const loginDoctorSchema = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().min(8).required(),
    username: Joi.string().min(3)
}).xor("email", "username");

const updateDoctorSchema = Joi.object().keys({
    email: Joi.string().email().forbidden(),
    firstName: Joi.string().min(3).forbidden(),
    lastName: Joi.string().min(3).forbidden(),
    password: Joi.string().min(8).optional(),
    mobile: Joi.string().min(10).optional().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im),
    birthDate: Joi.date().iso().optional(),
    username: Joi.string().min(3).forbidden(),
    bio: Joi.string().optional(),
    specialization: Joi.string().optional(),
    gender: Joi.string().valid(...["male", "female"]).optional(),
})

const createMedicalFacilitySchema = Joi.object().keys({
    email: Joi.string().email().required(),
    Name: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
    mobile: Joi.string().min(10).regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).required(),
    username: Joi.string().min(3).required(),
    Type: Joi.string().min(3).required(),
    Description: Joi.string().min(3).optional(),
    address: Joi.string().min(3).required(),
});

const loginMedicalFacilitySchema = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().min(8).required(),
    username: Joi.string().min(3)
}).xor("email", "username");

const updateMedicalFacilitySchema = Joi.object().keys({
    email: Joi.string().email().forbidden(),
    Name: Joi.string().min(3).forbidden(),
    password: Joi.string().min(8).required(),
    mobile: Joi.string().min(10).regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).required(),
    username: Joi.string().min(3).forbidden(),
    Type: Joi.string().min(3).required(),
    Description: Joi.string().min(3).optional(),
    address: Joi.string().min(3).required(),
})
module.exports = {
    APIValidator,
    createPatientSchema,
    loginPatientSchema,
    updatePatientSchema,
    createDoctorSchema,
    loginDoctorSchema,
    updateDoctorSchema,
    createMedicalFacilitySchema,
    loginMedicalFacilitySchema,
    updateMedicalFacilitySchema
    
}
