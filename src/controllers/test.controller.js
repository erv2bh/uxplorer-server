/* eslint-disable consistent-return */
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const bcrypt = require("bcrypt");
const s3Client = require("../aws/s3Client");

const User = require("../models/User");
const Test = require("../models/Test");
const Tester = require("../models/Tester");
const Mission = require("../models/Mission");
const sendEmail = require("../service/mailer");
const Survey = require("../models/Survey");

exports.createTest = async function (req, res, next) {
  try {
    const {
      testName,
      testDescription,
      testUrl,
      testerEmails,
      testDeadline,
      missions,
    } = req.body;

    const userId = req.params.userid;
    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

    const existingTest = await Test.findOne({ title: testName });

    if (existingTest) {
      return res.status(400).json({ error: "Same Title already existed" });
    }

    const newTest = await Test.create({
      owner: userId,
      title: testName,
      description: testDescription,
      testUrl,
      deadline: testDeadline,
    });

    const testerPromises = testerEmails.map(async (email, index) => {
      const testerId = `${testName}_${String(index + 1).padStart(2, "0")}`;
      const testerPassword = `${Math.random().toString(36).substring(2, 8)}`;

      const hashedTesterPassword = await bcrypt.hash(
        testerPassword,
        saltRounds,
      );

      const newTester = await Tester.create({
        testerEmail: email,
        testerId,
        testerPassword: hashedTesterPassword,
      });

      const emailSubject = "테스트 정보입니다";
      const emailText = `테스트 아이디: ${testerId}, 테스트 비밀번호 : ${testerPassword}`;

      sendEmail(email, emailSubject, emailText);

      return newTester._id;
    });

    const testerIds = await Promise.all(testerPromises);

    const missionPromises = missions.map(async (mission, index) => {
      const newMission = await Mission.create({
        description: mission.description,
        expectedDuration: mission.expectedDuration,
        order: index,
        completedBy: testerIds.map((testerId) => ({ tester: testerId })),
      });

      return newMission._id;
    });

    const missionIds = await Promise.all(missionPromises);

    const testerMissionUpdatePromises = testerIds.map(async (testerId) => {
      return Tester.findByIdAndUpdate(testerId, {
        $push: { missions: { $each: missionIds } },
      });
    });

    await Promise.all(testerMissionUpdatePromises);
    await Test.findByIdAndUpdate(newTest._id, {
      $push: { missions: { $each: missionIds } },
    });

    await Test.findByIdAndUpdate(newTest._id, {
      $push: { testers: { $each: testerIds } },
    });

    await User.findByIdAndUpdate(userId, {
      $push: { createdTests: newTest._id },
    });

    res.status(200).json({ success: true, newTest });
  } catch (error) {
    console.error(error);
  }
};

exports.getAllTests = async function (req, res, next) {
  const userId = req.params.userid;

  try {
    const userWithTests = await User.findById(userId).populate("createdTests");

    if (!userWithTests) {
      return res.status(404).json({ error: "User Not Found" });
    }
    const { createdTests } = userWithTests;

    res.status(200).json({ createdTests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get Tests" });
  }
};

exports.getTest = async function (req, res, next) {
  const testId = req.params.testid;

  try {
    const test = await Test.findById(testId).lean();

    if (!test) {
      return res.status(404).json({ error: "Test Not Found" });
    }

    const testers = await Tester.find({
      _id: { $in: test.testers },
    }).lean();

    const loggedInTesters = await Tester.find({
      _id: { $in: test.testers },
      isLoggedIn: true,
    }).lean();

    const testerDataPromises = testers.map(async (tester) => {
      let testerVideoUrl = null;

      if (tester.s3Key) {
        const command = new GetObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: tester.s3Key,
        });
        testerVideoUrl = await getSignedUrl(s3Client, command, {
          expiresIn: 60000,
        });
      }

      return {
        testerEmail: tester.testerEmail,
        testerId: tester._id,
        testerVideo: testerVideoUrl,
      };
    });

    const testerData = await Promise.all(testerDataPromises);

    const missions = await Mission.find({
      _id: { $in: test.missions },
    }).lean();

    const completedMission = await Mission.aggregate([
      { $match: { _id: { $in: test.missions } } },
      { $unwind: "$completedBy" },
      {
        $match: {
          "completedBy.tester": {
            $in: loggedInTesters.map((tester) => tester._id),
          },
          "completedBy.completed": true,
        },
      },
    ]);

    res
      .status(200)
      .json({ test, testerData, missions, completedMission, loggedInTesters });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve test" });
  }
};

exports.getUserMissionDetails = async function (req, res, next) {
  const { missionIds, testerId } = req.query;
  const missionIdList = missionIds.split(",");

  try {
    const missionDetails = await Promise.all(
      missionIdList.map(async (id) => {
        const mission = await Mission.findById(id);

        if (!mission) {
          return res.status(404).json({ error: "Mission Not Found" });
        }

        const testerMissionDetail = mission.completedBy.find(
          (detail) => detail.tester.toString() === testerId,
        );

        if (!testerMissionDetail) {
          return res.status(404).json({ error: "Tester's Mission Not Found" });
        }

        if (testerMissionDetail.completed) {
          return {
            missionId: id,
            description: mission.description,
            completed: testerMissionDetail.completed,
            duration: testerMissionDetail.duration,
            createdAt: testerMissionDetail.createdAt,
            completedAt: testerMissionDetail.completedAt,
            feedback: testerMissionDetail.feedback,
          };
        }

        return {
          missionId: id,
          description: mission.description,
          completed: false,
        };
      }),
    );

    const filteredMissionDetails = missionDetails.filter(
      (detail) => detail !== null,
    );

    res.status(200).json(filteredMissionDetails);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user's mission" });
  }
};

exports.deleteTest = async function (req, res, next) {
  const testId = req.params.testid;

  try {
    const test = await Test.findById(testId)
      .populate("missions")
      .populate("testers");

    if (test) {
      await Promise.all(
        test.missions.map(async (mission) => {
          await Mission.findByIdAndDelete(mission._id);
        }),
      );

      await Promise.all(
        test.testers.map(async (tester) => {
          await Tester.findByIdAndDelete(tester._id);
        }),
      );
    }

    await Survey.deleteMany({ test: testId });

    const user = await User.findOne({ createdTests: testId });

    if (user) {
      user.createdTests.pull(testId);
      await user.save();
    }

    await Test.findByIdAndDelete(testId);

    res.status(200).json({ message: "Test Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to Delete Test" });
  }
};
