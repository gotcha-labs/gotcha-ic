require("dotenv").config()
const status = require("http-status")
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const db = require("../models/index")
const APIError = require("../utils/APIError")
const { MESSAGES,MODELS } = require("../utils/constants")

exports.getJwtStrategy = () => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY
  }

  return new JwtStrategy(options, async (jwtPayload, done) => {
    const useR = await db[MODELS.USER].findByPk(jwtPayload.id)
    if (!useR)
      return done(
        new APIError({
          message: MESSAGES.TOKEN_NOT_FOUND,
          status: status.BAD_REQUEST
        }),
        null
      )
const user = {...useR,...jwtPayload}
    done(false, user)
  })
}
