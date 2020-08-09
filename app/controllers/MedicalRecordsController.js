const MedicalRecord = require("../models/MedicalRecord");
const FilesManager = require("../helpers/FilesManager");
const fs = require("fs");
const path = require("path")
const REPORT_FIELD = "report";
const PRESCRIPTION_FIELD = "prescriptionImage";
const RADIOGRAPH_FIELD = "radiograph";
const MEDICAL_RECORDS_FOLDER = "medical_records";


exports.create = async (req, res) => {

    try
    {
        const {_id, accountType} = req.decoded;
        req.body.enteredBy = accountType;
        if(accountType === "CLERK"){
            const {medicalFacilityId} = req.decoded;
            req.body.clerk = _id;
            req.body.medicalFacility = medicalFacilityId;
        }else if(accountType === "PATIENT"){
            req.body.patient = _id;
        }

        let medicalRecord = req.body;
        console.log(req.files)

        if(accountType != "CLERK" && accountType !="PATIENT")
        {
            return res.status(403).send({success: false, error: "ACCESS FORBIDDEN"});
        }
        if(req.files[REPORT_FIELD] && req.files[REPORT_FIELD][0])
        {
            medicalRecord.report = {}
            let trimmedTitle = req.body.title.replace(/\s/g, "-");
            medicalRecord.report.fileName =  trimmedTitle + "-" + req.files[REPORT_FIELD][0].fieldname + "-" + Date.now() + path.extname(req.files[REPORT_FIELD][0].originalname);
            medicalRecord.report.url = await FilesManager.uploadBuffer({buffer: req.files[REPORT_FIELD][0].buffer, fileName: medicalRecord.report.fileName, folder: MEDICAL_RECORDS_FOLDER});
        }

        if( req.files[PRESCRIPTION_FIELD] && req.files[PRESCRIPTION_FIELD][0])
        {
            medicalRecord.prescriptionImage = {}
            let trimmedTitle = req.body.title.replace(/\s/g, "-");
            medicalRecord.prescriptionImage.fileName =  trimmedTitle + "-" + req.files[PRESCRIPTION_FIELD][0].fieldname + "-" + Date.now() + path.extname(req.files[PRESCRIPTION_FIELD][0].originalname);
            medicalRecord.prescriptionImage.url = await FilesManager.uploadBuffer({buffer: req.files[PRESCRIPTION_FIELD][0].buffer, fileName: medicalRecord.prescriptionImage.fileName, folder: MEDICAL_RECORDS_FOLDER});
        }

        if(req.files[RADIOGRAPH_FIELD] && req.files[RADIOGRAPH_FIELD][0])
        {
            medicalRecord.radiograph = {}
            let trimmedTitle = req.body.title.replace(/\s/g, "-");
            medicalRecord.radiograph.fileName =  trimmedTitle + "-" + req.files[RADIOGRAPH_FIELD][0].fieldname + "-" + Date.now() + path.extname(req.files[RADIOGRAPH_FIELD][0].originalname);
            medicalRecord.radiograph.url = await FilesManager.uploadBuffer({buffer: req.files[RADIOGRAPH_FIELD][0].buffer, fileName: medicalRecord.radiograph.fileName, folder: MEDICAL_RECORDS_FOLDER});
            
        }

        medicalRecord = (await MedicalRecord.create(medicalRecord)).toJSON();

        return res.send({success: true, medicalRecord});

    }
    catch(error)
    {
        return res.status(400).send({success: false, error});
    }

}



exports.delete = async (req, res) => {
    try
    {
        
        const {_id} = req.decoded;
        const medicalRecord = await MedicalRecord.findById(req.params.id).lean();
        if(medicalRecord.patient != _id){
            return res.status(403).send({success: false, error: "ACCESS FORBIDDEN"});
        }

        if(medicalRecord.report && medicalRecord.report.fileName)
        {
            await FilesManager.deleteFile(MEDICAL_RECORDS_FOLDER + "/" + medicalRecord.report.fileName)
        }

        if(medicalRecord.prescriptionImage && medicalRecord.prescriptionImage.fileName)
        {
            await FilesManager.deleteFile(MEDICAL_RECORDS_FOLDER + "/" + medicalRecord.prescriptionImage.fileName)
        }

        if(medicalRecord.radiograph && medicalRecord.radiograph.fileName)
        {
            await FilesManager.deleteFile(MEDICAL_RECORDS_FOLDER + "/" + medicalRecord.radiograph.fileName)
        }

        await MedicalRecord.findByIdAndDelete(req.params.id);

        return res.send({success: true});

    }
    catch(error)
    {
        console.log(error)
        return res.status(400).send({success: false, error});
    }
}


exports.findMany = async (req, res) => {

    try
    {   console.log("running");
        const {_id , accountType} =  req.decoded;
        console.log(_id);
        if(accountType == "PATIENT"){
            req.query.patient = _id;
            const medicalRecords = await MedicalRecord.find(req.query).populate("clerk").populate('doctor').populate('medicalFacility').lean();
            console.log(medicalRecords);
            return res.send({success: true, medicalRecords});
        }
        const medicalRecords = await MedicalRecord.find(req.query).populate("clerk").populate('doctor').populate('medicalFacility').lean();
        return res.send({success: true, medicalRecords});

    }
    catch(error)
    {
        return res.status(400).send({success: false, error});
    }
}
