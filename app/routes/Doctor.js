const express = require("express");

module.exports = (app) => {
    const doctorsController = require('../controllers/DoctorsController.js');
    const router = express.Router()
    const TokenMiddleware = require("../middleware/TokenMiddleware");
    const Validations = require("../middleware/Validations");

    router.post("/", Validations.APIValidator(Validations.createDoctorSchema), doctorsController.createDoctor);
    router.post("/auth",Validations.APIValidator(Validations.loginDoctorSchema), doctorsController.login)
    router.patch("/:id", TokenMiddleware.AuthorizeToken, Validations.APIValidator(Validations.updateDoctorSchema), doctorsController.update );

    app.use("/api/v1/doctors", router)
    
}