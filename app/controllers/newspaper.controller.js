const db = require("../models");
const Newspaper = db.newspapers;
const Op = db.Sequelize.Op;

// Create and Save a new Newspaper
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Newspaper
    const newspaper = {
        title: req.body.title,
        available: req.body.available ? req.body.available : false
    };

    // Save Newspaper in the database
    Newspaper.create(newspaper)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Newspaper."
            });
        });
};

// Retrieve all Newspapers from the database.
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
        const { count: totalItems, rows: newspapers } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, newspapers, totalPages, currentPage };
    };

    const { limit, offset } = getPagination(page, size);
    Newspaper.findAndCountAll({ where: condition, limit, offset })
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving newspapers."
            });
        });
};


// Find a single Newspaper with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Newspaper.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Newspaper with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Newspaper with id=" + id
            });
        });
};

// Update a Newspaper by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Newspaper.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Newspaper was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Newspaper with id=${id}. Maybe Newspaper was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Newspaper with id=" + id
            });
        });
};

// Delete a Newspaper with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Newspaper.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Newspaper was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Newspaper with id=${id}. Maybe Newspaper was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Newspaper with id=" + id
            });
        });
};

// Delete all Newspapers from the database.
exports.deleteAll = (req, res) => {
    Newspaper.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} Newspapers were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all newspapers."
            });
        });
};

// find all available Newspaper
exports.findAllAvailable = (req, res) => {
    Newspaper.findAll({
            where: { available: true }
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving newspapers."
            });
        });
};