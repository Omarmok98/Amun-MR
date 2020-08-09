const express = require("express");

module.exports = (app) => {
    const medicalRecordsController = require('../controllers/MedicalRecordsController.js');
    const router = express.Router()
    const TokenMiddleware = require("../middleware/TokenMiddleware");
    const Validations = require("../middleware/Validations");
    const multer = require('multer');
    const path = require('path');

    const storage = multer.memoryStorage({
        
        filename: function (req, file, cb) {
            let trimmedTitle = req.body.title.replace(/\s/g, "-");
            cb(null,  trimmedTitle + "-" + file.fieldname + "-" + Date.now() + path.extname(file.originalname))
        }
    })


    const upload = multer({
        storage: storage
    })

    router.get("/",TokenMiddleware.AuthorizeToken, medicalRecordsController.findMany);
    

    router.post("/", 
        upload.fields([{ name: 'report', maxCount: 1 }, { name: 'prescriptionImage', maxCount: 1 }, { name: 'radiograph', maxCount: 1 }]), 
        Validations.APIValidator(Validations.createMedicalRecordSchema),
        TokenMiddleware.AuthorizeToken, 
        medicalRecordsController.create);

    router.delete("/:id",TokenMiddleware.AuthorizeToken, medicalRecordsController.delete);

        
    app.use("/api/v1/medical-records", router)
    
}
