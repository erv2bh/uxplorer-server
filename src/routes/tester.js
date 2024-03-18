const express = require("express");

const testerController = require("../controllers/tester.controller");

const router = express.Router();

router.get("/:testerid/testurls", testerController.getTestUrl);

router.get("/:testerid/missions", testerController.getAllMissions);
router.get("/:testerid/missions/:missionid", testerController.getSingleMission);

module.exports = router;
