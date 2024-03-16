const express = require("express");

const testController = require("../controllers/test.controller");

const router = express.Router();

router.get("/:userid/tests", testController.getAllTests);
router.post("/:userid/tests", testController.createTest);

module.exports = router;
