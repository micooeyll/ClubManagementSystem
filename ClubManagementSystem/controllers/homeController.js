exports.index = (req, res) => {
    res.render("index");
};

exports.dashboard = (req, res) => {

    if (!req.session.userId) {
        return res.redirect("/login");
    }

    res.render("dashboard", {
        firstName: req.session.firstName,
        lastName: req.session.lastName
    });
};