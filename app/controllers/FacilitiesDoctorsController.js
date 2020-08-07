const FacilityDoctor = require("../models/FacilityDoctor");

const _cleanFacilityDoctor = (FacilityDoctor) => {
    delete FacilityDoctor["__v"];
    return FacilityDoctor;
}



exports.create = async (req, res) => {
    try
    {
        const { _id } = req.decoded;
        const checkDuplicate  = (await FacilityDoctor.find(req.body));
        if(_id != req.body.medicalFacilityId)
        {
            return res.status(403).send({success: false, error: "ACCESS FORBIDDEN"}); 
        }
        if(checkDuplicate.length  != 0 ){
            return res.status(400).send({success: false, error: "DUPLICATES"}); 
        }
        const facilityDoctor = (await FacilityDoctor.create(req.body)).toJSON();
        _cleanFacilityDoctor(facilityDoctor);
        return res.send({success: true, facilityDoctor});
    }
    catch(error)
    {
        return res.status(400).send({success: false, error});
    }
}

exports.delete = async (req, res) => {
    try
    {
        const facilityDoctor = await FacilityDoctor.findById(req.params.id).lean();
        const { _id } = req.decoded;
        if(_id != facilityDoctor.medicalFacilityId)
        {
            return res.status(403).send({success: false, error: "ACCESS FORBIDDEN"}); 
        }
        
        await FacilityDoctor.findByIdAndDelete(req.params.id);
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
        else if(accountType === "DOCTOR")
        {
            query.doctorId = _id;
        }
        const facilitiesDoctors =  await FacilityDoctor.find(query);
        return res.send({success: true, facilitiesDoctors});
    }
    catch(error)
    {
        return res.status(400).send({success: false, error});
    }
}
