var auth = require('./auth');

module.exports = app => {
    const newspapers = require("../controllers/newspaper.controller.js");

    var router = require("express").Router();

    // Create a new Newspaper
    router.post("/", newspapers.create);

    // Retrieve all Newspapers
    router.get("/", auth.isAuthorized, newspapers.findAll);

    // Retrieve all published Newspapers
    router.get("/available", newspapers.findAllAvailable);

    // Retrieve a single Newspaper with id
    router.get("/:id", newspapers.findOne);

    // Update a Newspaper with id
    router.put("/:id", newspapers.update);

    // Delete a Newspaper with id
    router.delete("/:id", newspapers.delete);

    // Delete all Newspapers
    router.delete("/", newspapers.deleteAll);

    app.use('/api/newspapers', router);
};