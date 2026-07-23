const { Club } = require("../models");

exports.index = async (req, res) => {
    try {
        const clubs = await Club.findAll();

        res.render("clubs/index", {
            clubs
        });
    } catch (err) {
        console.error(err);
        res.send("Error loading clubs.");
    }
};

exports.showCreate = (req, res) => {
    res.render("clubs/create");
};

exports.create = async (req, res) => {
    try {
        const { name, description } = req.body;

        await Club.create({
            name,
            description
        });

        res.redirect("/clubs");

    } catch (err) {
        console.error(err);
        res.send("Error creating club.");
    }
};