/* eslint-disable consistent-return */
const bcrypt = require("bcrypt");

const User = require("../models/User");
const jwt = require("../service/jwtUtils");
const errors = require("../constants/error");
const CONFIG = require("../constants/config");
const Tester = require("../models/Tester");
const Test = require("../models/Test");

exports.google = async function (req, res, next) {
  let member;

  try {
    const { email, username } = req.body;

    member = await User.findOne({ email });

    if (!member) {
      member = await User.create({ email, username });
    }
    const accessToken = jwt.sign(member);
    const refreshToken = jwt.refresh();

    const user = await User.findByIdAndUpdate(member._id, { refreshToken });

    const userInfo = {
      username: user.username,
      userId: member._id,
    };

    res
      .status(201)
      .cookie("AccessToken", accessToken, {
        maxAge: CONFIG.HOUR_IN_MS,
        httpOnly: true,
      })
      .json({ success: true, userInfo });
  } catch (error) {
    error.message = errors.NOT_AUTHORIZED.message;
    error.status = errors.INTERNAL_SERVER_ERROR.status;

    next(error);
  }
};

exports.login = async function (req, res, next) {
  const today = new Date();

  try {
    const { testerId, testerPassword } = req.body;

    const testerData = await Tester.findOne({
      testerId,
    });

    const testData = await Test.findOne({
      testers: testerData._id,
    }).exec();

    if (!testerData) {
      return res.status(401).json({ message: "Authentication Failed" });
    }

    if (testerData.isLoggedIn === true) {
      return res.status(403).json({ message: "Already participated Tester" });
    }

    if (testData.deadline < today) {
      return res.status(400).json({ message: "Test Deadline has passed" });
    }

    const passwordMatch = await bcrypt.compare(
      testerPassword,
      testerData.testerPassword,
    );

    if (!passwordMatch) {
      return res.status(401).json({ message: "Password Not Matched" });
    }

    await Tester.findByIdAndUpdate(testerData._id, {
      $set: { isLoggedIn: true },
    });

    res.json({
      message: "Login Success",
      testerObjectId: testerData._id,
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = async function (req, res, next) {
  try {
    res.clearCookie("AccessToken", { httpOnly: true });
    res.json({ success: true });
  } catch (error) {
    error.message = errors.INTERNAL_SERVER_ERROR.message;
    error.status = errors.INTERNAL_SERVER_ERROR.status;

    next(error);
  }
};

exports.check = async function (req, res, next) {
  if (!req.user) {
    const error = new Error(errors.NOT_AUTHORIZED.message);
    error.status = errors.NOT_AUTHORIZED.status;

    next(error);
  }

  const user = await User.findById(req.user);

  const userInfo = {
    username: user.username,
    userId: req.user,
  };

  res.status(200).json({ success: true, userInfo });
};
