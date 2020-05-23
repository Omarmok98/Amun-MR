const mongoose = require("mongoose");

const DoctorSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: {type: String, unique: true},
    password: String,
    email: {type: String, unique: true},
    mobile: String,
    birthDate: Date,
    gender: {type: String, enum: ['male', 'female']},
    specialization: String,
    bio: String,
},
{
    timestamps: true
});

module.exports = mongoose.model('Doctor', DoctorSchema);