const express = require("express");

const router = express.Router();

const applicationController = require("../controllers/applicationController");

const {
    isAuthenticated,
    isAdmin
} = require("../middleware/authMiddleware");

router.get(
    "/applications",
    isAuthenticated,
    isAdmin,
    applicationController.index
);

router.post(
    "/applications/approve/:id",
    isAuthenticated,
    isAdmin,
    applicationController.approve
);

router.post(
    "/applications/reject/:id",
    isAuthenticated,
    isAdmin,
    applicationController.reject
);
    
router.get(
    "/applications/my",
    isAuthenticated,
    applicationController.myApplications
);

module.exports = router;