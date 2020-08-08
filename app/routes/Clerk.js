const express = require("express");

module.exports = (app) => {
    const clerksController = require('../controllers/ClerksController.js');
    const router = express.Router()
    const TokenMiddleware = require("../middleware/TokenMiddleware");
    const Validations = require("../middleware/Validations");

    router.post("/", Validations.APIValidator(Validations.createClerkSchema), TokenMiddleware.AuthorizeToken, clerksController.createClerk);
    router.post("/auth",Validations.APIValidator(Validations.loginClerkSchema), clerksController.login)
    router.patch("/:id", TokenMiddleware.AuthorizeToken, Validations.APIValidator(Validations.updateClerkSchema), clerksController.update );
    router.get("/",TokenMiddleware.AuthorizeToken, clerksController.findMany);
    router.delete("/:id", TokenMiddleware.AuthorizeToken, clerksController.delete);
    app.use("/api/v1/clerks", router)
    
}