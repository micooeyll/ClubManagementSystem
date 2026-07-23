const express = require("express");
const router = express.Router();

const clubController = require("../controllers/clubController");

router.get("/clubs", clubController.index);
router.get("/clubs/create", clubController.showCreate);
router.post("/clubs/create", clubController.create);

module.exports = router;