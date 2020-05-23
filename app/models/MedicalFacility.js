const mongoose = require("mongoose");

const MedicalFacilitySchema = mongoose.Schema({
    Name: String,
    username: {type: String, unique: true},
    password: String,
    email: {type: String, unique: true},
    mobile: String,
    address: String,
    Type: String,
    Description: String,
},
{
    timestamps: true
});

module.exports = mongoose.model('MedicalFacility', MedicalFacilitySchema);