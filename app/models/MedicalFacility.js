const mongoose = require("mongoose");

const MedicalFacilitySchema = mongoose.Schema({
    name: String,
    username: {type: String, unique: true},
    password: String,
    email: {type: String, unique: true},
    mobile: String,
    address: String,
    type: {type: String},
    description: String,
    maxNumberOfClerks: Number,
},
{
    timestamps: true
});

module.exports = mongoose.model('MedicalFacility', MedicalFacilitySchema);