const { APIresponse } = require("../utils/APIresponse");
const catchAsync = require("../utils/catchasync");
const { MESSAGES, MODELS } = require("../utils/constants");
var sliderCaptcha = require("../core/index");
const { getCaptchaCanister } = require("../dfx/canister");
const { blockchain_server ,CAPTCHA_CANISTER_ID} = require("../dfx/canister.ids");
const db = require("../models");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const createCaptcha = catchAsync(async (req, res, next) => {
  const characters = "ABCDEFGHIJKLvwxyz0123456789/-@#%^&*()";
  function generateString(length) {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const getString = generateString(5);
  const getActor = async () => {
    captchaActor = getCaptchaCanister(
      CAPTCHA_CANISTER_ID,
      blockchain_server
    );
    return captchaActor;
  };
  const actor = await getActor();
  const findUser = await db[MODELS.KEY].findOne({
    where: {
      siteKey: req.body.siteKey,
    },
  });
  const findPrinc = await db[MODELS.USER].findOne({
    where: {
      id: findUser.UserId,
    },
  });
  const coordinates = await actor.generate(getString, findPrinc.principle);
  const create = await sliderCaptcha.create(coordinates);
  const token = jwt.sign(
    {
      id: findPrinc.id,
      keys: req.body.siteKey,
    },
    process.env.JWT_SECRET_KEY
  );
  const rand = crypto.randomUUID();
  actor.addSession(rand, findUser.siteKey, create.solution);
  actor.captchaServed(findPrinc.principle, findUser.siteKey);
  APIresponse(res, MESSAGES.SUCCESS_MESSAGE, { create, rand, token });
});

const verifyCaptcha = catchAsync(async (req, res, next) => {
  const getActor = async () => {
    const captchaActor = await getCaptchaCanister(
      CAPTCHA_CANISTER_ID,
      blockchain_server
    );
    return captchaActor;
  };
  let captchaActor = await getActor();
  const resp = await captchaActor.checkCaptcha(
    req.body.response,
    req.body.rand.toString()
  );
  const characters = "ABCDEFGHIJKLvwxyz0123456789abcdefg";
  function generateString(length) {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const getString = generateString(9);
  const User = await db[MODELS.USER].findOne({
    where: {
      id: req.user.id,
    },
  });
  if (!resp) {
    console.log("captcha UnVerified");
    await captchaActor.captchaVerified(User.principle, req.user.keys, false);
    return res.status(200).send({
      result: "failure",
    });
  }
  await captchaActor.captchaVerified(User.principle, req.user.keys, true);
  console.log("captcha verified");
  res.status(200).send({
    result: "success",
    token: getString,
  });
});
module.exports = {
  createCaptcha,
  verifyCaptcha,
};
