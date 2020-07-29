const BloodGlucose = require("../models/BloodGlucose");




exports.create = async (req,res) => {
    const { _id , accountType} = req.decoded;
    if(accountType != "PATIENT")
    {
        return res.status(403).send({success: false, error: "ACCESS FORBIDDEN"});
    }
    req.body.patientId = _id;
    const bloodGlucose = BloodGlucose.create(req.body)
    return res.send({success: true,bloodGlucose});
}

exports.findMany = async (req, res) => {
    try
    {
        const bloodGlucose = BloodGlucose.find(req.query);
        return res.send({success: true, bloodGlucose});
    }
    catch(error)
    {
        return res.status(400).send({success: false, error});
    }

}

