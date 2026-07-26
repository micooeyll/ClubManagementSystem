const { Club } = require("../models");
const { Op } = require("sequelize");

exports.index = async (req, res) => {

    try {

        const search = req.query.search || "";

        const clubs = await Club.findAll({

            where: {

                name: {
                    [Op.like]: `%${search}%`
                }

            }

        });

        res.render("clubs/index", {

            clubs,
            search,
            role: req.session.role,
            success: req.session.success,
            error: req.session.error

        });

        req.session.success = null;
        req.session.error = null;

    } catch (err) {

        console.error(err);
        res.send("Error loading clubs.");

    }

};

exports.showCreate = (req, res) => {

    res.render("clubs/create", {
        role: req.session.role
    });
};



exports.create = async (req, res) => {

    try {

        const { name, description } = req.body;

        await Club.create({

            name,
            description

        });

        req.session.success = "Club created successfully.";

        res.redirect("/clubs");

    } catch (err) {

        console.error(err);

        req.session.error = "Error creating club.";

        res.redirect("/clubs");

    }

};

exports.showEdit = async (req, res) => {

    try {

        const club = await Club.findByPk(req.params.id);

        if (!club) {

            req.session.error = "Club not found.";

            return res.redirect("/clubs");

        }

        res.render("clubs/edit", {

            club,
            role: req.session.role

        });

    } catch (err) {

        console.error(err);

        req.session.error = "Error loading club.";

        res.redirect("/clubs");

    }

};

exports.update = async (req, res) => {

    try {

        const { name, description } = req.body;

        await Club.update(

            {

                name,
                description

            },

            {

                where: {

                    id: req.params.id

                }

            }

        );

        req.session.success = "Club updated successfully.";

        res.redirect("/clubs");

    } catch (err) {

        console.error(err);

        req.session.error = "Error updating club.";

        res.redirect("/clubs");

    }

};

exports.delete = async (req, res) => {

    try {

        await Club.destroy({

            where: {

                id: req.params.id

            }

        });

        req.session.success = "Club deleted successfully.";

        res.redirect("/clubs");

    } catch (err) {

        console.error(err);

        req.session.error = "Error deleting club.";

        res.redirect("/clubs");

    }

};