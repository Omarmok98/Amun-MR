const FacilityPatient = require("../models/FacilityPatient");
const { string } = require("@hapi/joi");

const _cleanFacilityPatient = (facilityPatient) => {
    delete facilityPatient["__v"];
    return facilityPatient;
}



exports.create = async (req, res) => {
    try
    {
        const { _id } = req.decoded;
        req.body.patient = _id;
        const checkDuplicate  = (await FacilityPatient.find(req.body));
        if(checkDuplicate.length  != 0 ){
            return res.status(400).send({success: false, error: "DUPLICATES"}); 
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
        if(_id != facilityPatient.patient)
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
        const param = req.params.object;
        const query = req.query;
        const { _id, accountType } = req.decoded;
        var facilitiesPatients = null;
        if(accountType === "MEDICAL_FACILITY")
        {
            query.medicalFacility = _id;
            if(!param){
                 facilitiesPatients =  (await FacilityPatient.find(query).populate('doctor').populate('patient'));
            }else {
                 facilitiesPatients =  (await FacilityPatient.find(query).select(param).populate(param));
            }
            return res.send({success: true, facilitiesPatients});
        }
        else if(accountType === "PATIENT")
        {
            query.patient = _id;
            if(!param){
                facilitiesPatients =  (await FacilityPatient.find(query).populate('medicalFacility').populate('doctor'));
           }else {
                facilitiesPatients =  (await FacilityPatient.find(query).select(param).populate(param));
           }
            return res.send({success: true, facilitiesPatients});
        }
        else if(accountType === "DOCTOR")
        {
            query.doctor = _id;
            if(!param){
                facilitiesPatients =  (await FacilityPatient.find(query).populate('medicalFacility').populate('patient'));
           }else {
                facilitiesPatients =  (await FacilityPatient.find(query).select(param).populate(param));
           }
            return res.send({success: true, facilitiesPatients});
        }
        else if(accountType === "CLERK"){
            query.medicalFacility = req.decoded.medicalFacilityId;
            if(!param){
                facilitiesPatients =  (await FacilityPatient.find(query).populate('patient').populate('doctor'));
           }else {
                facilitiesPatients =  (await FacilityPatient.find(query).select(param).populate(param));
           }
            return res.send({success: true, facilitiesPatients});
        }
        else
        {
            return res.status(403).send({success: false, error: "ACCESS FORBIDDEN"});    
        }
       /*  const facilitiesPatients =  await FacilityPatient.find(query).populate();
        return res.send({success: true, facilitiesPatients}); */
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).send({success: false, error});
    }
}
