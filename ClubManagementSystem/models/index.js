const sequelize = require("../config/database");

const User = require("./User");
const Club = require("./Club");
const Event = require("./Event");
const Application = require("./Application");

// Club -> Event
Club.hasMany(Event, {
    foreignKey: "clubId",
    onDelete: "CASCADE"
});

Event.belongsTo(Club, {
    foreignKey: "clubId"
});

// User -> Application
User.hasMany(Application, {
    foreignKey: "userId",
    onDelete: "CASCADE"
});

Application.belongsTo(User, {
    foreignKey: "userId"
});

// Event -> Application
Event.hasMany(Application, {
    foreignKey: "eventId",
    onDelete: "CASCADE"
});

Application.belongsTo(Event, {
    foreignKey: "eventId"
});

module.exports = {
    sequelize,
    User,
    Club,
    Event,
    Application
};