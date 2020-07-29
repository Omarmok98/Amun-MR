const FacilityPatient = require("../models/FacilityPatient");

const _cleanFacilityPatient = (facilityPatient) => {
    delete facilityPatient["__v"];
    return facilityPatient;
}



exports.create = async (req, res) => {
    try
    {
        const { _id } = req.decoded;
        if(_id != req.body.patientId)
        {
            return res.status(403).send({success: false, error: "ACCESS FORBIDDEN"}); 
        }
        const facilityPatient = (await FacilityPatient.create(req.body)).toJSON();
        _cleanFacilityPatient(facilityPatient);
        return res.send({success: true, facilityPatient});
    }
    catch(error)
    {
        return res.status(400).send({success: false, error});
    }
}

exports.delete = async (req, res) => {
    try
    {
        const facilityPatient = await FacilityPatient.findById(req.params.id).lean();
        const { _id } = req.decoded;
        if(_id != facilityPatient.patientId)
        {
            return res.status(403).send({success: false, error: "ACCESS FORBIDDEN"}); 
        }
        
        await FacilityPatient.findByIdAndDelete(req.params.id);
        return res.send({success: true});
    }
    catch(error)
    {
        return res.status(400).send({success: false, error});
    }
}


exports.findMany = async (req, res) => {
    try
    {
        const query = req.query;
        const { _id, accountType } = req.decoded;
        if(accountType === "MEDICAL_FACILITY")
        {
            query.medicalFacilityId = _id;
        }
        else if(accountType === "PATIENT")
        {
            query.patientId = _id;
        }
        else if(accountType === "DOCTOR")
        {
            query.doctorId = _id;
        }
        else
        {
            return res.status(403).send({success: false, error: "ACCESS FORBIDDEN"});    
        }
        const facilitiesPatients =  await FacilityPatient.find(query);
        return res.send({success: true, facilitiesPatients});
    }
    catch(error)
    {
        return res.status(400).send({success: false, error});
    }
}