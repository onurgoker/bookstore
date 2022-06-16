var auth = require('./auth');

module.exports = app => {
    const items = require("../controllers/item.controller.js");

    var router = require("express").Router();

    // Retrieve all Items
    router.get("/", auth.isAuthorized, items.findAll);

    app.use('/api/items', router);
};