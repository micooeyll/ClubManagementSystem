exports.isAuthenticated = (req, res, next) => {

    if (!req.session.userId) {
        return res.redirect("/login");
    }

    next();

};

exports.isAdmin = (req, res, next) => {

    if (req.session.role !== "admin") {
        return res.status(403).send("Access Denied");
    }

    next();
};