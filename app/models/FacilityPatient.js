const mongoose = require("mongoose");

const FacilityPatientSchema = mongoose.Schema({
    patient: {type: mongoose.Schema.Types.ObjectId, ref: "Patient"},
    medicalFacility: {type: mongoose.Schema.Types.ObjectId, ref: "MedicalFacility"},
    doctor: {type: mongoose.Schema.Types.ObjectId, ref: "Doctor"}
},
{
    timestamps: true
});

module.exports = mongoose.model('FacilityPatient', FacilityPatientSchema);