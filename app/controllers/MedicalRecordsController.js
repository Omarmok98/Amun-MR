const MedicalRecord = require("../models/MedicalRecord");
const FilesManager = require("../helpers/FilesManager");
const fs = require("fs");
const REPORT_FIELD = "report";
const PRESCRIPTION_FIELD = "prescriptionImage";
const RADIOGRAPH_FIELD = "radiograph";
const MEDICAL_RECORDS_FOLDER = "medical_records";


exports.create = async (req, res) => {

    try
    {
        let medicalRecord = req.body;

        if(req.files[REPORT_FIELD] && req.files[REPORT_FIELD][0])
        {
            const { path, filename } = req.files[REPORT_FIELD][0];
            medicalRecord.report = {}
            medicalRecord.report.fileName = filename;
            medicalRecord.report.url = await FilesManager.upload({fileToBeUploadedPath: path, fileName: filename, folder: MEDICAL_RECORDS_FOLDER});
        }

        if( req.files[PRESCRIPTION_FIELD] && req.files[PRESCRIPTION_FIELD][0])
        {
            const { path, filename } = req.files[PRESCRIPTION_FIELD][0];
            medicalRecord.prescriptionImage = {}
            medicalRecord.prescriptionImage.fileName = filename;
            medicalRecord.prescriptionImage.url = await FilesManager.upload({fileToBeUploadedPath: path, fileName: filename, folder: MEDICAL_RECORDS_FOLDER});
        }

        if(req.files[PRESCRIPTION_FIELD] && req.files[RADIOGRAPH_FIELD][0])
        {
            const { path, filename } = req.files[RADIOGRAPH_FIELD][0];
            medicalRecord.radiograph = {}
            medicalRecord.radiograph.fileName = filename;
            medicalRecord.radiograph.url = await FilesManager.upload({fileToBeUploadedPath: path, fileName: filename, folder: MEDICAL_RECORDS_FOLDER});
            
        }

        medicalRecord = (await MedicalRecord.create(medicalRecord)).toJSON();

        return res.send({success: true, medicalRecord});

    }
    catch(error)
    {
        console.log(error);
        if(req.files[REPORT_FIELD][0] && fs.existsSync(req.files[REPORT_FIELD].path))
        {
            fs.unlinkSync(req.files[REPORT_FIELD].path)
        }

        if(req.files[PRESCRIPTION_FIELD][0]  && fs.existsSync(req.files[PRESCRIPTION_FIELD].path))
        {
            fs.unlinkSync(req.files[PRESCRIPTION_FIELD].path)
        }

        if(req.files[RADIOGRAPH_FIELD][0] && fs.existsSync(req.files[RADIOGRAPH_FIELD].path))
        {
            fs.unlinkSync(req.files[RADIOGRAPH_FIELD].path)
        }
        return res.status(400).send({success: false, error});
    }

}



exports.delete = async (req, res) => {
    try
    {
        

        const medicalRecord = await MedicalRecord.findById(req.params.id).lean();

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
    {
        const medicalRecords = await MedicalRecord.find(req.query).lean();
        return res.send({success: true, medicalRecords});

    }
    catch(error)
    {
        return res.status(400).send({success: false, error});
    }
}