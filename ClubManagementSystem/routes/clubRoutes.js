const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();
const clubController = require("../controllers/clubController");

router.get("/clubs", clubController.index);

router.get("/clubs/create", isAdmin, clubController.showCreate);
router.post("/clubs/create", isAdmin, clubController.create);

router.get("/clubs/edit/:id", isAdmin, clubController.showEdit);
router.post("/clubs/edit/:id", isAdmin, clubController.update);

router.post("/clubs/delete/:id", isAdmin, clubController.delete);

module.exports = router;
