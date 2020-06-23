const mongoose = require("mongoose");

const FacilityDoctorSchema = mongoose.Schema({
    medicalFacilityId: {type: mongoose.Schema.Types.ObjectId, ref: "MedicalFacility"},
    doctorId: {type: mongoose.Schema.Types.ObjectId, ref: "Doctor"}
},
{
    timestamps: true
});

module.exports = mongoose.model('FacilityDoctor', FacilityDoctorSchema);