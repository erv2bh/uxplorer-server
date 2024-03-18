/* eslint-disable consistent-return */
const Test = require("../models/Test");
const Tester = require("../models/Tester");

exports.getTestUrl = async function (req, res, next) {
  try {
    const testerId = req.params.testerid;

    const test = await Test.findOne({ testers: testerId }).select("testUrl");

    if (!test) {
      return res.status(404).json({ error: "TestURL Not Found" });
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