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
        if(accountType == "PATIENT"){
            req.query.patientId = _id;
            const bloodGlucose = await BloodGlucose.find(req.query).lean();
            return res.send({success: true, bloodGlucose});
        }else if(accountType == "DOCTOR"){           
            const bloodGlucose = await BloodGlucose.find(req.query).lean();
            return res.send({success: true, bloodGlucose});
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

