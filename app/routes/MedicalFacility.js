const express = require("express");

module.exports = (app) => {
    const MedicalFacilityController = require('../controllers/MedicalFacilitiesController');
    const router = express.Router()
    const TokenMiddleware = require("../middleware/TokenMiddleware");
    const Validations = require("../middleware/Validations");

    router.get("/", TokenMiddleware.AuthorizeToken, MedicalFacilityController.findMany);    
    router.post("/", Validations.APIValidator(Validations.createMedicalFacilitySchema), MedicalFacilityController.createMedicalFacility);
    router.post("/auth",Validations.APIValidator(Validations.loginMedicalFacilitySchema), MedicalFacilityController.login)
    router.patch("/", TokenMiddleware.AuthorizeToken, Validations.APIValidator(Validations.updateMedicalFacilitySchema), MedicalFacilityController.update );
    app.use("/api/v1/medical-facilities", router)
    
}