const users=require('../Models/UserModel')
const jwt=require('jsonwebtoken');
require('dotenv').config({path:"../.env"})



const isAuth=async(req,res,next)=>{
  try {
    let token=req.headers["x-auth-token"]
    if(!token){
      return res.status(400).send({msg:"token not found"})
    }

    try{
      let decoded=await jwt.verify(token,process.env.SECRET_KEY)
      const user=await users.findById(decoded.id)
       if (!user){
     return res.status(400).send({msg:"invalid token"})
     }
    //  console.log("user:",user)


     //Get user
     
     req.user=user
    //  console.log('isAuth req.user',)
     return next();
    } catch (error) {
      console.log(error)
      return res.status(400).send({msg:'JWT'})
    }
    } catch (error) {
    console.log(error)
    return res.status(500).send({msg:"problem in the token"})
  }
}

module.exports=isAuth;