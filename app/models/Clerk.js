const mongoose = require("mongoose");

const ClerkSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: {type: String, unique: true},
    password: String,
    email: {type: String, unique: true},
    mobile: String,
    role: String,
    gender: {type: String, enum: ['male', 'female']},
    medicalFacilityId: {type: mongoose.Schema.Types.ObjectId, ref: "MedicalFacility"},
},
{
    timestamps: true
});

module.exports = mongoose.model('Clerk', ClerkSchema);