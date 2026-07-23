const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Application = sequelize.define("Application", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    status: {
        type: DataTypes.STRING,
        defaultValue: "Pending"
    }

});

module.exports = Application;