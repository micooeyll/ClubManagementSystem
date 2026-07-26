const { Event, Club, Application, User } = require("../models");
const { Op } = require("sequelize");

exports.index = async (req, res) => {

    const search = req.query.search || "";

    const events = await Event.findAll({

        where: {

            title: {

                [Op.like]: `%${search}%`

            }

        },

        include: [{

            model: Club,
            required: true

        }]

    });

    const formattedEvents = [];

    for (const event of events) {

        const approvedCount = await Application.count({

            where: {
                eventId: event.id,
                status: "Approved"
            }

        });

        formattedEvents.push({

            ...event.toJSON(),

            remaining: event.quota - approvedCount

        });

    }

    res.render("events/index", {

        events: formattedEvents,
        search,
        role: req.session.role,
        userId: req.session.userId,
        
        success: req.session.success,
        error: req.session.error


    });

    req.session.success = null;
    req.session.error = null;

};

exports.showCreate = async (req, res) => {

    const clubs = await Club.findAll();

    res.render("events/create", {

        clubs,
        role: req.session.role

    });

};

exports.create = async (req, res) => {

    const {

        title,
        description,
        location,
        eventDate,
        quota,
        clubId

    } = req.body;

    await Event.create({

        title,
        description,
        location,
        eventDate,
        quota,
        clubId

    });

    res.redirect("/events");

};

exports.apply = async (req, res) => {

    if (req.session.role === "admin") {

        req.session.error = "Admins cannot apply to events.";
        return res.redirect("/events");

    }

    try {

        const event = await Event.findByPk(req.params.id);

        if (!event) {

            return res.send("Event not found.");

        }

        const approvedCount = await Application.count({

            where: {

                eventId: req.params.id,
                status: "Approved"

            }

        });

        if (approvedCount >= event.quota) {
            req.session.error = "Event quota is full.";
            return res.redirect("/events");
        }

        const existingApplication = await Application.findOne({

            where: {

                userId: req.session.userId,
                eventId: req.params.id

            }

        });

        if (existingApplication) {
            req.session.error = "You have already applied for this event.";
            return res.redirect("/events");
        }

        await Application.create({
            userId: req.session.userId,
            eventId: req.params.id
        });

        req.session.success = "Application submitted successfully!";
        res.redirect("/events");

    }

    catch (err) {

        console.log(err);

        res.send("Something went wrong.");

    }

};

exports.showEdit = async (req, res) => {

    const event = await Event.findByPk(req.params.id);

    const clubs = await Club.findAll();

    res.render("events/edit", {

        event,
        clubs,
        role: req.session.role

    });

};

exports.update = async (req, res) => {

    await Event.update(

        {

            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            eventDate: req.body.eventDate,
            quota: req.body.quota,
            clubId: req.body.clubId

        },

        {

            where: {

                id: req.params.id

            }

        }

    );

    res.redirect("/events");

};

exports.delete = async (req, res) => {

    await Event.destroy({

        where: {

            id: req.params.id

        }

    });

    res.redirect("/events");

};

exports.applicants = async (req, res) => {

    const event = await Event.findByPk(req.params.id, {

        include: {

            model: Application,

            include: User

        }

    });

    res.render("events/applicants", {

        event,
        role: req.session.role

    });

};