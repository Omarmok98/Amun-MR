const BloodGlucose = require("../models/BloodGlucose");




exports.create = async (req,res) => {

    try {

        const { _id , accountType} = req.decoded;
        if(accountType != "PATIENT")
        {
            return res.status(403).send({success: false, error: "ACCESS FORBIDDEN"});
        }
        req.body.patientId = _id;
        const bloodGlucose = (await BloodGlucose.create(req.body)).toJSON();
        return res.send({success: true,bloodGlucose});

    } catch (error) {
        console.log(error)
        return res.status(400).send({success: false, error});
    }
}

exports.findMany = async (req, res) => {
    try
    {
        const { _id , accountType} = req.decoded;
        if(accountType == "DOCTOR" || accountType == "PATIENT"){
            const bloodGlucose = await BloodGlucose.find(req.query).lean();
            return res.send({success: true, bloodGlucose});
        }
        
    }
    catch(error)
    {
        return res.status(400).send({success: false, error});
    }

}

