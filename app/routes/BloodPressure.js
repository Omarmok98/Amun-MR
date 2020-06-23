const express = require("express");

module.exports = (app) => {
    const BloodPressureController = require('../controllers/BloodPressureController');
    const router = express.Router()
    const TokenMiddleware = require("../middleware/TokenMiddleware");
    const Validations = require("../middleware/Validations");


    router.post("/", TokenMiddleware.AuthorizeToken, Validations.APIValidator(Validations.createBloodPressure), BloodPressureController.create);
    router.get("/",TokenMiddleware.AuthorizeToken, BloodPressureController.findMany);
    app.use("/api/v1/blood-pressure", router)
    
}