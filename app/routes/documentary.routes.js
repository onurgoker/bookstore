var auth = require('./auth');

module.exports = app => {
    const documentaries = require("../controllers/documentary.controller.js");

    var router = require("express").Router();

    // Create a new Documentary
    router.post("/", documentaries.create);

    // Retrieve all Documentaries
    router.get("/", auth.isAuthorized, documentaries.findAll);

    // Retrieve all published Documentaries
    router.get("/available", documentaries.findAllAvailable);

    // Retrieve a single Documentary with id
    router.get("/:id", documentaries.findOne);

    // Update a Documentary with id
    router.put("/:id", documentaries.update);

    // Delete a Documentary with id
    router.delete("/:id", documentaries.delete);

    // Delete all Documentaries
    router.delete("/", documentaries.deleteAll);

    app.use('/api/documentaries', router);
};