
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const userMOdel = require('../Models/User');
require('dotenv').config();
passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://oauthg.onrender.com/google/callback",
    scope: ['profile','email']
  },
  async function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      console.log(profile._json)
      console.log(accessToken)
      let user = profile._json;
      //console.log(user)
      const {sub , name , email , picture} = user;
      const findUser = await userMOdel.findOne({$and:[{name} ,{id:sub}]})
      console.log(findUser)
      if(findUser == null){
       const saveUser = await userMOdel({name , email, img:picture ,id:sub});
       saveUser.save();
      }
       return cb(null, profile , accessToken);
    // })
  }
));
module.exports = passport
