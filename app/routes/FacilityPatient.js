const express = require("express");

module.exports = (app) => {
    const FacilitiesPatientsController = require('../controllers/FacilitiesPatientsController');
    const router = express.Router()
    const TokenMiddleware = require("../middleware/TokenMiddleware");
    const Validations = require("../middleware/Validations");


    router.get("/:object", TokenMiddleware.AuthorizeToken, FacilitiesPatientsController.findMany);
    router.post("/", TokenMiddleware.AuthorizeToken, Validations.APIValidator(Validations.createFacilityPatient), FacilitiesPatientsController.create);
    router.delete("/:id", TokenMiddleware.AuthorizeToken, FacilitiesPatientsController.delete);

    app.use("/api/v1/facilities-patients", router)
    
}