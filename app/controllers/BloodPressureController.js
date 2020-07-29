const BloodPressure = require("../models/BloodPressure");




exports.create = async (req,res) => {
    const { _id , accountType} = req.decoded;
    if(accountType != "PATIENT")
    {
        return res.status(403).send({success: false, error: "ACCESS FORBIDDEN"});
    }
    req.body.patientId = _id;
    const bloodPressure = BloodPressure.create(req.body)
    return res.send({success: true,bloodPressure});
}

exports.findMany = async (req, res) => {
    try
    {
        const bloodPressure = BloodPressure.find(req.query);
        return res.send({success: true, bloodPressure});
    }
    catch(error)
    {
        return res.status(400).send({success: false, error});
    }

}