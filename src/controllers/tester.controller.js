/* eslint-disable consistent-return */
const Mission = require("../models/Mission");
const Survey = require("../models/Survey");
const Test = require("../models/Test");
const Tester = require("../models/Tester");

exports.getTestUrl = async function (req, res, next) {
  const today = new Date();

  try {
    const testerId = req.params.testerid;

    const test = await Test.findOne({ testers: testerId }).select(
      "testUrl deadline",
    );

    if (!test) {
      return res.status(404).json({ error: "TestURL Not Found" });
    }

    if (test.deadline < today) {
      return res.status(400).json({ error: "Test Deadline has passed" });
    }

    const { testUrl } = test;

    res.status(200).json({ testUrl });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve testUrl" });
  }
};

exports.getAllMissions = async function (req, res, next) {
  try {
    const testerId = req.params.testerid;

    const tester = await Tester.findOne({ _id: testerId }).select(
      "missions -_id",
    );

    if (!tester) {
      return res.status(404).json({ error: "Tester Not Found" });
    }

    const missions = tester.missions.map((mission) => mission.toString());

    res.status(200).json(missions);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve missions" });
  }
};

exports.getSingleMission = async function (req, res, next) {
  try {
    const missionId = req.params.missionid;

    const mission = await Mission.findById(missionId).select(
      "description expectedDuration",
    );

    if (!mission) {
      return res.status(404).json({ error: "Mission Not Found" });
    }

    res.status(200).json(mission);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve mission" });
  }
};

exports.putTesterMission = async function (req, res, next) {
  const { missionid, testerid } = req.params;
  const missionData = req.body;

  try {
    const mission = await Mission.findById(missionid);

    if (!mission) {
      return res.status(404).json({ error: "Mission Not Found" });
    }

    const index = mission.completedBy.findIndex(
      (item) => item.tester.toString() === testerid,
    );

    if (index === -1) {
      return res.status(404).json({ error: "Tester Not Found" });
    }

    mission.completedBy[index] = {
      ...mission.completedBy[index].toObject(),
      ...missionData,
    };

    await mission.save();

    res.status(200).json(mission);
  } catch (error) {
    res.status(500).json({ error: "Failed to Update Mission" });
  }
};

exports.createSurvey = async function (req, res, next) {
  const testerId = req.params.testerid;
  const { susScore, npsScore } = req.body;

  try {
    const test = await Test.findOne({ testers: testerId });

    if (!test) {
      return res
        .status(404)
        .json({ error: "Test not found for given testerId" });
    }

    const newSurvey = new Survey({
      tester: testerId,
      test: test._id,
      SUS: susScore,
      NPS: npsScore,
    });

    await newSurvey.save();

    res.status(201).json(newSurvey);
  } catch (error) {
    res.status(500).json({ error: "Failed to Create Survey" });
  }
};
