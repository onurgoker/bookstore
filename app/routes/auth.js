module.exports.isAuthorized = function(req, res, next) {
    if (req.body.username != "onurgoker" || req.body.password != "123456") {
        res.status(400).send("Authentication error!");
    }

    next();
}