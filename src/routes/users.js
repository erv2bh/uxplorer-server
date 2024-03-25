const express = require("express");

const testController = require("../controllers/test.controller");
const surveyController = require("../controllers/survey.controller");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

router.get("/:userid/tests", verifyToken, testController.getAllTests);
router.post("/:userid/tests", verifyToken, testController.createTest);

router.get("/:userid/tests/:testid", verifyToken, testController.getTest);

router.get(
  "/:userid/tests/:testid/missions",
  verifyToken,
  testController.getUserMissionDetails,
);

router.get(
  "/:userid/tests/:testid/surveys",
  verifyToken,
  surveyController.getSurveyResults,
);

module.exports = router;
