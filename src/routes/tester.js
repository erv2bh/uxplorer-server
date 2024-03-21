const express = require("express");
const multer = require("multer");

const testerController = require("../controllers/tester.controller");
const videoController = require("../controllers/video.controller");

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.get("/:testerid/testurls", testerController.getTestUrl);

router.get("/:testerid/missions", testerController.getAllMissions);
router.get("/:testerid/missions/:missionid", testerController.getSingleMission);
router.put("/:testerid/missions/:missionid", testerController.putTesterMission);

router.post(
  "/:testerid/videourls",
  upload.single("video"),
  videoController.getScreenRecord,
);

module.exports = router;
