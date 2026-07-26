const express = require("express");
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");
const eventController = require("../controllers/eventController");


router.post(
    "/events/apply/:id",
    isAuthenticated,
    eventController.apply
);

// Everyone
router.get("/events", eventController.index);

// Admin
router.get("/events/create", isAdmin, eventController.showCreate);
router.post("/events/create", isAdmin, eventController.create);

router.post(
    "/events/apply/:id",
    isAuthenticated,
    eventController.apply
);

router.get(
    "/events/edit/:id",
    isAdmin,
    eventController.showEdit
);

router.post(
    "/events/edit/:id",
    isAdmin,
    eventController.update
);

router.post(
    "/events/delete/:id",
    isAdmin,
    eventController.delete
);

router.get(
    "/events/applicants/:id",
    isAdmin,
    eventController.applicants
);

module.exports = router;

