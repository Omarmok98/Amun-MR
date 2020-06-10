const mongoose = require("mongoose");

const FacilityPatientSchema = mongoose.Schema({
    patientId: {type: mongoose.Schema.Types.ObjectId, ref: "Patient"},
    medicalFacilityId: {type: mongoose.Schema.Types.ObjectId, ref: "MedicalFacility"},
    doctorId: {type: mongoose.Schema.Types.ObjectId, ref: "Doctor"}
},
{
    timestamps: true
});

module.exports = mongoose.model('FacilityPatient', FacilityPatientSchema);