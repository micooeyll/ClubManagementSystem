const express = require("express");
const path = require("path");
const homeRoutes = require("./routes/homeRoutes");
const { sequelize } = require("./models");
const authRoutes = require("./routes/authRoutes");
const session = require("express-session");
const clubRoutes = require("./routes/clubRoutes");

const app = express();

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: "clubmanagementsecret",
    resave: false,
    saveUninitialized: false
}));

// Static Files
app.use(express.static(path.join(__dirname, "public")));

app.use("/", homeRoutes);
app.use("/", authRoutes);
app.use("/", clubRoutes);


// Server
const PORT = 3000;

sequelize.sync()
.then(() => {
    console.log("Database connected.");
})
.catch(err => {
    console.log(err);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});