/* eslint-disable consistent-return */
const { Upload } = require("@aws-sdk/lib-storage");
const s3Client = require("../aws/s3Client");

const Test = require("../models/Test");
const Tester = require("../models/Tester");

exports.getScreenRecord = async function (req, res, next) {
  const testerId = req.params.testerid;
  const videoFile = req.file;

  try {
    const test = await Test.findOne({ testers: testerId }).exec();

    if (!test) {
      return res.status(404).json({ error: "Test not found for this tester" });
    }

    const tester = await Tester.findOne({ _id: testerId }).exec();

    const videoKey = `${test.title}/${testerId}`;

    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: videoKey,
        Body: videoFile.buffer,
        ContentType: "video/mp4",
      },
    });

    const uploadResult = await upload.done();

    tester.s3Key = uploadResult.Key;

    await tester.save();

    res.status(200).json({ tester });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload video" });
  }
};
