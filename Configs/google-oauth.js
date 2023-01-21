
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const passport = require('passport');
// require('dotenv').config();
// passport.use(new GoogleStrategy({
//     clientID:process.env.GOOGLE_CLIENT_ID,
//     clientSecret:process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:7000/auth/google/callback",
//     scope: ['profile','email']
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     // User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       console.log(profile._json)
//       console.log(accessToken)
//        return cb(null, profile , accessToken);
//     // })
//   }
// ));
// module.exports = passport
