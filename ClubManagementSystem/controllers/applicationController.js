const { Application, Event, User } = require("../models");

exports.index = async (req, res) => {

    const applications = await Application.findAll({

        include: [User, Event]

    });

    res.render("applications/index", {
        applications,
        role: req.session.role
    });

};

exports.approve = async (req, res) => {

    const application = await Application.findByPk(req.params.id);
    const event = await Event.findByPk(application.eventId);
    const approvedCount = await Application.count({

        where: {
            eventId: application.eventId,
            status: "Approved"
        }

    });

    if (approvedCount >= event.quota) {

        return res.send("Event quota has been reached. Cannot approve more applications.");

    }

    await Application.update(

        { status: "Approved" },

        {
            where: {
                id: req.params.id
            }
        }

    );
    res.redirect("/applications");
};

exports.reject = async (req, res) => {

    await Application.update(

        { status: "Rejected" },

        {
            where: {
                id: req.params.id
            }
        }

    );

    res.redirect("/applications");

};


exports.myApplications = async (req, res) => {

    const applications = await Application.findAll({

        where: {
            userId: req.session.userId
        },

        include: [Event]

    });

    res.render("applications/myApplications", {
        applications,
        role: req.session.role
    });

};