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
        if(_id != req.body.medicalFacility)
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
        const id = req.params.id;
        const { _id } = req.decoded;
        const facilityDoctor = await FacilityDoctor.findById(id).lean();
        if(_id != facilityDoctor.medicalFacility)
        {
            return res.status(403).send({success: false, error: "ACCESS FORBIDDEN"}); 
        }
        await FacilityDoctor.findByIdAndDelete(id);
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
            query.medicalFacility = _id;
            const facilitiesDoctors =  await FacilityDoctor.find(query).select("doctor").populate("doctor");
            return res.send({success: true, facilitiesDoctors});
        }
        else if(accountType === "DOCTOR")
        {
            query.doctor = _id;
            const facilitiesDoctors =  await FacilityDoctor.find(query).select("medicalFacility").populate("medicalFacility");
            return res.send({success: true, facilitiesDoctors});
        }else if (accountType ==="CLERK") {
            query.medicalFacility = req.decoded.medicalFacilityId;
            const facilitiesDoctors =  await FacilityDoctor.find(query).select("doctor").populate("doctor");
            return res.send({success: true, facilitiesDoctors});
            
        }else {
            const facilitiesDoctors =  await FacilityDoctor.find(query).pppulate("doctor");
            return res.send({success: true, facilitiesDoctors});
        }

        
    }
    catch(error)
    {
        return res.status(400).send({success: false, error});
    }
}
