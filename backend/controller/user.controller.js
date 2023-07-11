const APIError = require("../utils/APIError");
const { APIresponse } = require("../utils/APIresponse");
const catchAsync = require("../utils/catchasync");
const status = require("http-status");
const crypto = require("crypto");
const dbFunctions = require("../utils/dbFunctions");
const { MODELS, MESSAGES } = require("../utils/constants");
const jwt = require("jsonwebtoken");

const createUser = catchAsync(async (req, res, next) => {
  const { principle } = req.body;
  console.log("---principle---", principle);
  if (!principle) {
    return next(
      new APIError("Principle is a required Filed", status.BAD_REQUEST)
    );
  }
  const check = await dbFunctions.find(MODELS.USER, {
    where: {
      principle: principle,
    },
  });
  if (check) {
    return next(
      new APIError(MESSAGES.PRINCIPLE_ALREADY_EXISTS, status.BAD_REQUEST)
    );
  }
  const sitekey = "site-" + crypto.randomUUID() + "-key";
  const create = await dbFunctions.create(MODELS.USER, {
    principle: principle,
  });
  const create1 = await dbFunctions.create(MODELS.KEY, {
    siteKey: sitekey,
    UserId: create.id,
  });
  const obj = {};
  (obj.principle = create.principle), (obj.siteKey = create1.siteKey);
  console.log("--------obj ", obj);
  const jwtToken = jwt.sign(
    {
      id: create.id,
    },
    process.env.JWT_SECRET_KEY
  );

  APIresponse(res, MESSAGES.SUCCESS_MESSAGE, { obj, jwtToken });
});

const userLogin = catchAsync(async (req, res, next) => {
  const { principle } = req.body;
  if (!principle) {
    return next(
      new APIError("Principle is a required Filed", status.BAD_REQUEST)
    );
  }
  const check = await dbFunctions.find(MODELS.USER, {
    attributes: ["principle", "id"],
    where: {
      principle: principle,
    },
  });
  if (!check) {
    return next(new APIError(MESSAGES.NO_USER_FOUND, status.BAD_REQUEST));
  }
  const jwtToken = jwt.sign(
    {
      id: check.id,
    },
    process.env.JWT_SECRET_KEY
  );
  APIresponse(res, MESSAGES.SUCCESS_MESSAGE, {
    jwtToken,
    check,
  });
});

const addKey = catchAsync(async (req, res, next) => {
  const createKey = await dbFunctions.create(MODELS.KEY, {
    siteKey: "site-" + crypto.randomUUID() + "-key",
    UserId: req.user.id,
  });
  APIresponse(res, MESSAGES.SUCCESS_MESSAGE, createKey);
});
module.exports = {
  createUser,
  userLogin,
  addKey,
};
