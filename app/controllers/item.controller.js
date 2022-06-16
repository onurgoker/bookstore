const db = require("../models");
const Book = db.books;
const Documentary = db.documentaries;
const Newspaper = db.newspapers;
const Op = db.Sequelize.Op;

// Retrieve all Documentaries from the database.
exports.findAll = (req, res) => {
    const { page, size, title, type } = req.query;

    if (type == "books") {
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
            const { count: totalItems, rows: books } = data;
            const currentPage = page ? +page : 0;
            const totalPages = Math.ceil(totalItems / limit);
            return { totalItems, books, totalPages, currentPage };
        };

        const { limit, offset } = getPagination(page, size);
        Book.findAndCountAll({ where: condition, limit, offset })
            .then(data => {
                const response = getPagingData(data, page, limit);
                res.send(response);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving books."
                });
            });

    } else if (type == "documentaries") {
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

    } else {
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

    }




};