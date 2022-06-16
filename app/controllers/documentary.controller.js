const db = require("../models");
const Documentary = db.documentaries;
const Op = db.Sequelize.Op;

// Create and Save a new Documentary
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Documentary
    const documentary = {
        title: req.body.title,
        available: req.body.available ? req.body.available : false
    };

    // Save Documentary in the database
    Documentary.create(documentary)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Documentary."
            });
        });
};

// Retrieve all Documentaries from the database.
exports.findAll = (req, res) => {
    const { page, size, title } = req.query;
    var condition = title ? {
        title: {
            [Op.like]: `%${title}%`
        }
    } : null;

    const getPagination = (page, size) => {
        const limit = size ? +size : 3;
        const offset = page ? page * limit : 0;
        return { limit, offset };
    };

    const getPagingData = (data, page, limit) => {
        const { count: totalItems, rows: documentaries } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, documentaries, totalPages, currentPage };
    };

    const { limit, offset } = getPagination(page, size);
    Documentary.findAndCountAll({ where: condition, limit, offset })
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving documentaries."
            });
        });
};


// Find a single Documentary with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Documentary.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Documentary with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Documentary with id=" + id
            });
        });
};

// Update a Documentary by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Documentary.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Documentary was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Documentary with id=${id}. Maybe Documentary was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Documentary with id=" + id
            });
        });
};

// Delete a Documentary with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Documentary.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Documentary was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Documentary with id=${id}. Maybe Documentary was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Documentary with id=" + id
            });
        });
};

// Delete all Documentaries from the database.
exports.deleteAll = (req, res) => {
    Documentary.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} Documentaries were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all documentaries."
            });
        });
};

// find all available Documentary
exports.findAllAvailable = (req, res) => {
    Documentary.findAll({
            where: { available: true }
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving documentaries."
            });
        });
};