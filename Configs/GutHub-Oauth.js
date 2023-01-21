  require('dotenv').config();
  const axios =  require('axios')

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
      //console.log('Value Of Accces Token ',access_token.data.access_token);
      const user=  await axios.get('https://api.github.com/user',{
       headers:{
         Authorization:`Bearer ${access_token.data.access_token}`
       }
      })
         let GitHub_Token = access_token.data.access_token;
         let userDATA = user.data;
     //console.log(userDATA.data)
       return [userDATA , GitHub_Token]
    //     const oAuth_User = userDATA.data
    //   const user =  await   userMOdel({oAuth_User});
    //   user.save();
    //   GITHUB_TOKEN = access_token.data.access_token
    //  //  res.status(200).send({message : "data savavd to data bases", access_token:tkn_acess})
    //  res.redirect("/home")

  }

  module.exports = userDataFrom_GITHUB;
       
  
      