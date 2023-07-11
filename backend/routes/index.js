const user = require("./user.router")
const captcha = require("./createCAptcha")
module.exports = (router) => {
  user(router)
  captcha(router)

  return router
}