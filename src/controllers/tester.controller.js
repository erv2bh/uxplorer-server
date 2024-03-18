/* eslint-disable consistent-return */
const Test = require("../models/Test");

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
    res.status(500).json({ error: "Failed to retreive testUrl" });
  }
};
