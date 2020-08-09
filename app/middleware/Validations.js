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
        console.log(error)
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
    allergies: Joi.array().optional(),
    conditions: Joi.array().optional(),
    medications: Joi.array().optional(),
    username: Joi.string().min(3).required(),
    bloodType: Joi.string().valid(...BLOOD_TYPES).optional(),
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
    medications: Joi.array().optional(),
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
    bio: Joi.string().optional()
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
    name: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
    mobile: Joi.string().min(10).regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).required(),
    username: Joi.string().min(3).required(),
    type: Joi.string().min(3).required(),
    description: Joi.string().min(3).optional(),
    address: Joi.string().min(3).required(),
    maxNumberOfClerks: Joi.number().default(2)
});

const loginMedicalFacilitySchema = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().min(8).required(),
    username: Joi.string().min(3)
}).xor("email", "username");

const updateMedicalFacilitySchema = Joi.object().keys({
    email: Joi.string().email().forbidden(),
    name: Joi.string().min(3).forbidden(),
    password: Joi.string().min(8).required(),
    mobile: Joi.string().min(10).regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).required(),
    username: Joi.string().min(3).forbidden(),
    type: Joi.string().min(3).required(),
    description: Joi.string().min(3).optional(),
    address: Joi.string().min(3).required(),
    maxNumberOfClerks: Joi.number().optional()
})

const createMedicalRecordSchema = Joi.object().keys({
    title: Joi.string().required(),
    enteredBy: Joi.string().required(),
    notes: Joi.string().allow("").optional(),
    date:Joi.date().iso().required(),
    patient: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
    doctor: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
    medicalFacility: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
    clerk: Joi.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
    type: Joi.string().required()
})

const createClerkSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    password: Joi.string().min(8).required(),
    mobile: Joi.string().min(10).regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).required(),
    role: Joi.string().required(),
    username: Joi.string().min(3).required(),
    gender: Joi.string().valid(...["male", "female"]).required(),
});

const loginClerkSchema = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().min(8).required(),
    username: Joi.string().min(3)
}).xor("email", "username");

const updateClerkSchema = Joi.object().keys({
    email: Joi.string().email().optional(),
    firstName: Joi.string().min(3).forbidden(),
    lastName: Joi.string().min(3).forbidden(),
    password: Joi.string().min(8).optional(),
    mobile: Joi.string().min(10).regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).forbidden(),
    role: Joi.string().optional(),
    username: Joi.string().min(3).forbidden(),
    gender: Joi.string().valid(...["male", "female"]).forbidden,
})
const createFacilityPatient = Joi.object().keys({
    patient: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    medicalFacility: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    doctor: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),

})
const createFacilityDoctor = Joi.object().keys({
    medicalFacility: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    doctor: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),

})
const createBloodPressure = Joi.object().keys({
    value: Joi.object().keys({
        diastolic: Joi.number().required(),
        systolic: Joi.number().required()
    }),
    date:Joi.date().iso().required(),
    note: Joi.string().required()

})
const createBloodGlucose = Joi.object().keys({
    value: Joi.number().required(),
    note: Joi.string().required(),
    date:Joi.date().iso().required(),
    type: Joi.string().required()

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
    updateMedicalFacilitySchema,
    createMedicalRecordSchema,
    createClerkSchema,
    loginClerkSchema,
    updateClerkSchema,
    createFacilityPatient,
    createFacilityDoctor,
    createBloodPressure,
    createBloodGlucose
}
