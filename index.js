const express  = require('express');
const cors = require('cors');
const app = express();
const connection = require("./db");
const userMOdel = require("./Models/User")
const passport = require('./Configs/google-oauth');
const jwt =  require("jsonwebtoken");
const PORT = process.env.PORT || 4000;
const userDataFrom_GITHUB = require('./Configs/GutHub-Oauth');
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
const argon2  = require('argon2')
const secret_key = process.env.JWT_SECRET_KEY
  let Google_Token ;
  let GitHub_Token



app.get("/"  ,(req, res)=>{
      res.send("home page ")
})


app.get("/github/callback",async(req, res)=>{
      const token = req.query.code;
      const user = await  userDataFrom_GITHUB(token)
      //console.log(user);
      GitHub_Token=user[1];
      const userDATA = user[0]
         console.log(userDATA)
        const {login,id,name ,email ,   location , bio, company , public_repos, twitter_username} =userDATA
       const check_For_USER = await userMOdel({username:login ,gitHub_ID:id ,name ,email ,   location , bio , company , public_repos, twitter_username})
       check_For_USER.save();
       //console.log(GitHub_Token , userDATA , check_For_USER)
       res.redirect("/home")
})
 app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' , session:false}),
  function(req, res, accessToken) {
    // Successful authentication, redirect home
      Google_Token = "gviutfgtdiyiguihuihEDTAtha";
    res.redirect('/home');
  });
  app.post("/signup", async (req, res)=>{
      const  {username , email , age , password , city , address , mob_Num , name , status} = req.body;
        const hashPassword = await argon2.hash(password)
          const user =  await   userMOdel({username , password:hashPassword,email, age , city , address , mob_Num , name , status})
          user.save((err , sucess)=>{
            if(sucess){
              res.status(200).send({message : "data savavd to data bases" , sucess:true})
            }else{
            res.status(500).send({message:'oops something went wrong try again', error:true})
            }
          })
  })
  app.post("/login", async (req, res)=>{
      const {username , password , email}= req.body;
      const user =  await   userMOdel.findOne({username});
      const verification = await argon2.verify(user.password, password)
      //console.log(verification)
      if(verification){
          const jwt_token = jwt.sign({user} , secret_key, {expiresIn:'24 hr'});
          res.status(201).send({message :"login sucessful",jwt_token , sucess:true})
      } else{
            res.status(401).send({message: 'oops user is not registred please sign up first', error:true})
      }
        
    })

  app.get("/home",async (req, res)=>{
      const token = req.headers.authorsization
      console.log(req.headers.authorization)
      if(GitHub_Token!=undefined  || Google_Token!=undefined ){
            res.send({msg:"Welcome To Home Page ", token:GitHub_Token || Google_Token , sucess:true})
      }else{
            if(token){
            const decode = jwt.verify(token ,secret_key);
            res.status(201).send({msg:"Welcome To Home Page ", sucess:true})
            }else{
            res.status(401).send({msg: "Error In Varifying Token Please Try Again", error:true})
            }
      }
})
app.listen(PORT, async ()=>{
    try{ await connection;
          console.log('connected to dataBase Suceefully');
          console.log(`running on port  ${PORT}`)
    }catch{
          console.log("data base connection errro")
    }
})
