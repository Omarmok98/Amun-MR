const BloodPressure = require("../models/BloodPressure");




exports.create = async (req,res) => {
    const { _id , accountType} = req.decoded;
    if(accountType != "PATIENT")
    {
        return res.status(403).send({success: false, error: "ACCESS FORBIDDEN"});
    }
    req.body.patientId = _id;
    const bloodPressure = (await BloodPressure.create(req.body)).toJSON();
    return res.send({success: true,bloodPressure});
}

exports.findMany = async (req, res) => {
    try
    {
        const { _id , accountType} = req.decoded;
        if(accountType == "PATIENT"){
            req.query.patientId = _id;
            const bloodPressure = await BloodPressure.find(req.query).lean();
            return res.send({success: true, bloodPressure});
        }else if(accountType == "DOCTOR"){           
            const bloodPressure = await BloodPressure.find(req.query).lean();
            return res.send({success: true, bloodPressure});
        }
        else{
            return res.status(403).send({success: false, error: "ACCESS FORBIDDEN"});           
        }

    }
    catch(error)
    {
        return res.status(400).send({success: false, error});   
    }

}