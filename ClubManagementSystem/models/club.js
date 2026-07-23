const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Club = sequelize.define("Club", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT
    }

});

module.exports = Club;