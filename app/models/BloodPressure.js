const mongoose = require("mongoose");

const BloodPressureSchema = mongoose.Schema({
    value: {
       diastolic: Number,
       systolic: Number,
    },
    note: String,
    date: Date,
    patientId: {type: mongoose.Schema.Types.ObjectId, ref: "Patient"},
},
{
    timestamps: true
});

module.exports = mongoose.model('BloodPressure', BloodPressureSchema);