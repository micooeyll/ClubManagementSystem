const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.showLogin = (req, res) => {
    res.render("auth/login");
};

exports.showRegister = (req, res) => {
    res.render("auth/register");
};

exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.send("Email already exists.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        res.redirect("/login");

    } catch (err) {
        console.error(err);
        res.send("Something went wrong.");
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.send("Invalid email or password.");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.send("Invalid email or password.");
        }

        req.session.userId = user.id;
        req.session.email = user.email;
        req.session.firstName = user.firstName;
        req.session.lastName = user.lastName;

        res.redirect("/dashboard");

    } catch (err) {
        console.error(err);
        res.send("Something went wrong.");
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
};