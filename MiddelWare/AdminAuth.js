// const users=require('../Models/UserModel')



const AdimnAuth=async(req,res,next)=>{
    try {
        if(req.user && req.user.role === 'admin'){
            next()
        }else
        returnres.status(400).send({msg:"you don't have access"})


    } catch (error) {
        console.log(error)
        return res.status(500).send({msg:"server error"})
    }
}

module.exports=AdimnAuth;