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
    enteredBy: String,
    clerk: {type: mongoose.Schema.Types.ObjectId, ref: "Clerk"},
    patient: {type: mongoose.Schema.Types.ObjectId, ref: "Patient"},
    doctor: {type: mongoose.Schema.Types.ObjectId, ref: "Doctor"},
    medicalFacility: {type: mongoose.Schema.Types.ObjectId, ref: "MedicalFacility"},
},
{
    timestamps: true
});

module.exports = mongoose.model('MedicalRecord', MedicalRecordSchema);