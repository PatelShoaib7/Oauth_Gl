const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
require('dotenv').config();
passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://oauthg.onrender.com/auth/google/callback",
    scope: ['profile','email']
  },
  async function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      console.log(profile._json)
      console.log(accessToken);
      let user = profile._json
      const saveUser = await userMOdel({user});
      saveUser.save();
       return cb(null, profile , accessToken);
    // })
  }
));
module.exports = passport
