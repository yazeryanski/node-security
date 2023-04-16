const express = require("express");
const helmet = require("helmet");
const path = require("path");
const cookieSession = require("cookie-session");

const config = require("./config/config");
const passport = require("./config/passport");
const checkLoginMW = require("./middlewares/checkLogin.middleware");

const app = express();

// Security Middlewares
app.use(helmet());
// CookieSession
app.use(cookieSession({
  name: 'session',
  maxAge: 24 * 60 * 60 * 1000,
  keys: [ config.COOKIE_KEY_1, config.COOKIE_KEY_2 ],
}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "../", "public", "index.html"));
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  }),
  (req, res) => {
    return console.log("Pushed to google auth");
  }
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
    successRedirect: "/",
    session: true,
  }),
  (req, res) => {
    return console.log("Google called us back");
  }
);

app.get("/auth/failure", (req, res) => {
  return res.send("<h2>Failed to login</h2>");
});

app.get("/secret", checkLoginMW, (req, res) => {
  return res.send("<h2>TOP SECRET: Michael Jackson is alive!</h2>");
});

app.get('/auth/logout', (req, res) => {
  req.logout(); //Removes req.user and clears any logged in session
  return res.redirect('/');
});

app.listen(3000, () => {
  console.log("Listening on 3000 port");
});
