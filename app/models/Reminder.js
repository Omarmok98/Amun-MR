const mongoose = require("mongoose");

const ReminderSchema = mongoose.Schema({
    start: Date,
    end: Date,
    note: String,
    type:{type: String},
    patientId: {type: mongoose.Schema.Types.ObjectId, ref: "Patient"},
},
{
    timestamps: true
});

module.exports = mongoose.model('Reminder', ReminderSchema);