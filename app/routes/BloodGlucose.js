const express = require("express");

module.exports = (app) => {
    const BloodGlucoseController = require('../controllers/BloodGlucoseController');
    const router = express.Router()
    const TokenMiddleware = require("../middleware/TokenMiddleware");
    const Validations = require("../middleware/Validations");


    router.post("/", TokenMiddleware.AuthorizeToken, Validations.APIValidator(Validations.createBloodGlucose), BloodGlucoseController.create);
    router.get("/",TokenMiddleware.AuthorizeToken, BloodGlucoseController.findMany);
    app.use("/api/v1/blood-glucose", router)
    
}