const express = require("express");

const testerController = require("../controllers/tester.controller");

const router = express.Router();

router.get("/:testerid/testurls", testerController.getTestUrl);

module.exports = router;
