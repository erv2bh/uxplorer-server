/* eslint-disable consistent-return */
const Survey = require("../models/Survey");

exports.getSurveyResults = async function (req, res, next) {
  try {
    const testId = req.params.testid;

    const surveyResults = await Survey.find({ test: testId }).select(
      "SUS NPS -_id",
    );

    if (!surveyResults) {
      return res.status(404).json({ error: "Survey Result Not Found" });
    }

    res.status(200).json(surveyResults);
  } catch (error) {
    res.status(500).json({ error: "Failed to retreive Survey Results" });
  }
};
