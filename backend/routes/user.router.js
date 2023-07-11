const {
    createUser,
    userLogin,
    addKey
  } = require("../controller/user.controller")
  const {authJwt} =  require('../middlewares/authJwt')
  module.exports = (router) => {
    router.route("/createUser").post(createUser)
    router.route("/userLogin").post(userLogin)
    router.route("/addKey").post(authJwt,addKey)
    return router
  }
  