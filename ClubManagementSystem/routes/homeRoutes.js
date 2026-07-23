const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");

router.get("/", homeController.index);
router.get("/dashboard", homeController.dashboard);

module.exports = router;