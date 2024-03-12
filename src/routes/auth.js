const express = require("express");

const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/google", authController.google);

module.exports = router;
