const mongoose = require("mongoose");

const MedicalRecordSchema = mongoose.Schema({
    title: String,
    type: {type: String},
    report: {
        url: String,
        fileName: String
    },
    radiograph: {
        url: String,
        fileName: String
    },
    prescriptionImage: {
        url: String,
        fileName: String
    },
    notes: String,
    date: Date,
    clerkId: {type: mongoose.Schema.Types.ObjectId, ref: "Clerk"},
    patientId: {type: mongoose.Schema.Types.ObjectId, ref: "Patient"},
    doctorId: {type: mongoose.Schema.Types.ObjectId, ref: "Doctor"},
    medicalFacilityId: {type: mongoose.Schema.Types.ObjectId, ref: "MedicalFacility"},
},
{
    timestamps: true
});

module.exports = mongoose.model('MedicalRecord', MedicalRecordSchema);