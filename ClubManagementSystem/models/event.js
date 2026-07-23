const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Event = sequelize.define("Event", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT
    },

    location: {
        type: DataTypes.STRING,
        allowNull: false
    },

    eventDate: {
        type: DataTypes.DATE,
        allowNull: false
    },

    quota: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

});

module.exports = Event;