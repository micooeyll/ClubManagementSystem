const { Club, Event, User, Application } = require("../models");

exports.index = (req, res) => {
    res.render("index");
};

exports.dashboard = async (req, res) => {

    const clubCount = await Club.count();
    const eventCount = await Event.count();
    const userCount = await User.count();
    const applicationCount = await Application.count();

    res.render("dashboard", {

        firstName: req.session.firstName,
        lastName: req.session.lastName,
        role: req.session.role,

        clubCount,
        eventCount,
        userCount,
        applicationCount

    });

};
