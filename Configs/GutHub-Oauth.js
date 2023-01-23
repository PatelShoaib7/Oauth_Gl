  require('dotenv').config();
  const axios =  require('axios');
const userMOdel = require('../Models/User');

// app.get("/github/callback",async(req, res)=>{
//     const token = req.query.code;
//     console.log(token)
  const userDataFrom_GITHUB =async (token)=>{
    const access_token = await axios.post("https://github.com/login/oauth/access_token", null ,{
        params:{
         client_id:process.env.GITHUB_CLIENT_ID,
         client_secret:process.env.GITHUB_CLIENT_SECRET,
         code:token
        },
        headers:{
          accept:"application/json"
        }
      })
      console.log('Value Of Accces Token ',access_token.data.access_token);
      const user=  await axios.get('https://api.github.com/user',{
       headers:{
         Authorization:`Bearer ${access_token.data.access_token}`
       }
      })
         let GitHub_Token = access_token.data.access_token;
         console.log(GitHub_Token , ' GitHub_Token')
         let userDATA = user.data;
         const {login,id,name ,email ,   location , bio, company , public_repos, twitter_username} =userDATA;
         const check_For_USER  = await userMOdel.findOne({$and:[{name},{email}]});
         if(check_For_USER == null){
         const user_DATA_SAVE = await userMOdel({username:login ,gitHub_ID:id ,name ,email ,   location , bio , company , public_repos, twitter_username});
           user_DATA_SAVE.save();
        }
       return GitHub_Token
  }

  module.exports = userDataFrom_GITHUB;
       
  
      
