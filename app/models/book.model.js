const { INTEGER } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("books", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        available: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        }
    });

    return Book;
};