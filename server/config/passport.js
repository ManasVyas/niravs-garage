const passport = require("passport");
const User = require("../models/user.model");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.jwtSecret,
  algorithm: ["HS256"],
};

const strategy = new JwtStrategy(options, async (payload, done) => {
  try {
    const user = await User.findOne({ _id: payload.sub });
    if (user) done(null, user);
    else done(null, false);
  } catch (error) {
    done(error, null);
  }
});

module.exports = (passport) => {
  passport.use(strategy);
};
