const mongoose = require('mongoose');


const PatientSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: {type: String, unique: true},
    password: String,
    email: {type: String, unique: true},
    mobile: String,
    birthDate: Date,
    gender: {type: String, enum: ['male', 'female']},
    bloodType: {type: String, enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]},
    medications: [{type: String}],
    allergies: [{type: String}],
    conditions: [{type: String}]

},
{
    timestamps: true
});



module.exports = mongoose.model('Patient', PatientSchema);
