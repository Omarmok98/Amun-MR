const express = require("express");

module.exports = (app) => {
    const FacilitiesDoctorssController = require('../controllers/FacilitiesDoctorsController');
    const router = express.Router()
    const TokenMiddleware = require("../middleware/TokenMiddleware");
    const Validations = require("../middleware/Validations");


    router.get("/", TokenMiddleware.AuthorizeToken, FacilitiesDoctorssController.findMany);
    router.post("/", TokenMiddleware.AuthorizeToken, Validations.APIValidator(Validations.createFacilityDoctor), FacilitiesDoctorssController.create);
    router.delete("/:id", TokenMiddleware.AuthorizeToken, FacilitiesDoctorssController.delete);

    app.use("/api/v1/facilities-doctors", router)
    
}