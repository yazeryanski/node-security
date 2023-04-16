const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");

const config = require("./config");


passport.use(
  new Strategy(config.passport, (accessToken, refreshToken, profile, done) => {
    console.log("Google Login", profile);
    done(null, profile);
  })
);


// SAVE A COOKIE
passport.serializeUser((user, done) => {
  console.log("Serializing User ID", user.id);
  done(null, user.id);
});

// READ THE COOKIE
passport.deserializeUser((id, done) => {
  // User.findById(id).then(user => {
  //   done(null, user);
  // });
  console.log("Reading the cookie (userID): ", id);
  done(null, id);
});

module.exports = passport;