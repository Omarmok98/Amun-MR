const mongoose = require("mongoose");

const BloodGlucoseSchema = mongoose.Schema({
    value: Number,
    type: {type: String},
    note: String,
    date: Date,
    patientId: {type: mongoose.Schema.Types.ObjectId, ref: "Patient"},
},
{
    timestamps: true
});

module.exports = mongoose.model('BloodGlucose', BloodGlucoseSchema);