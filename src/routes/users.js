const express = require("express");

const testController = require("../controllers/test.controller");

const router = express.Router();

router.get("/:userid/tests", testController.getAllTests);
router.post("/:userid/tests", testController.createTest);

router.get("/:userid/tests/:testid", testController.getTest);

router.get(
  "/:userid/tests/:testid/missions",
  testController.getUserMissionDetails,
);

module.exports = router;
