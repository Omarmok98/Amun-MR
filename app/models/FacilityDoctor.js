const mongoose = require("mongoose");

const FacilityDoctorSchema = mongoose.Schema({
    medicalFacility: {type: mongoose.Schema.Types.ObjectId, ref: "MedicalFacility"},
    doctor: {type: mongoose.Schema.Types.ObjectId, ref: "Doctor"}
},
{
    timestamps: true
});

module.exports = mongoose.model('FacilityDoctor', FacilityDoctorSchema);