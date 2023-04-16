const dotenv = require('dotenv');
dotenv.config()


const config = {
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  SESSION_KEY1: process.env.SESSION_KEY1,
  SESSION_KEY2: process.env.SESSION_KEY2,
}

const passportConfig = {
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
  scope: ['email', 'profile'],
}


module.exports = {
  config: config,
  passport: passportConfig
}