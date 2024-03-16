const express = require("express");

const authController = require("../controllers/auth.controller");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/google", authController.google);
router.post("/check", verifyToken, authController.check);
router.post("/logout", authController.logout);

module.exports = router;
