const {
  createCaptcha,
  verifyCaptcha,
} = require("../controller/generateCaptchaController");
const { authJwt } = require("../middlewares/authJwt");
module.exports = (router) => {
  router.route("/captcha/create").post(createCaptcha);
  router.route("/captcha/verify").post(authJwt, verifyCaptcha);

  return router;
};
