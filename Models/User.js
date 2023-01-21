const mongoose  = require("mongoose");
  const UserSchema = mongoose.Schema({
         name:{type:String},
         email:{type:String},
         username:{type:String},
         mob_Num:{type:Number},
         password:{type:String},
         age:{type:Number},
         address:{type:String},
         city:{type:String},
         status:{type:String},
         location:{type:String},
         bio:{type:String},
         company:{type:String},
         gitHub_ID:{type:String},
         twitter_username:{type:String},
         facebook_username:{type:String},
         instagram_username:{type:String}

  })
  const userMOdel =  mongoose.model("user", UserSchema)
  module.exports = userMOdel
