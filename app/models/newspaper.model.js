const { INTEGER } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Newspaper = sequelize.define("newspapers", {
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

    return Newspaper;
};