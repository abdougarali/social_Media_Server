const FriendRequest=require('../Models/friendRequest')
const users=require('../Models/UserModel')



exports.createRequest=async(req,res)=>{
try {
    const{friendId}=req.params
    // const{userId,friendId}=req.body
//     const friendId=await users.find({_id:id})
// console.log(friendId)
    // console.log(friendId)
   const {_id}=req.user
//    if(!userId || !friendId){
//        return res.status(400).send({msg:"please enter all fields!!!"}) 
// }

// console.log("id:",id)
 
// console.log(userid)
   const isExistRequest=await FriendRequest.findOne({userId:_id,friendId})
  
if(isExistRequest){
    return res.status(400).send({msg:"request is already sent"})
}

const friendRequest=new FriendRequest({userId:_id,friendId})
   if(friendRequest.userId.toHexString()!==_id.toHexString()){
    return res.status(400).send({msg:"should be access for send request!!!"})
   }
  await friendRequest.save()
return res.status(200).send({msg:"request sended with success...",request:friendRequest})
     
} catch (error) {
    console.log(error)
    return res.status(500).send({msg:"can not send request..."})
}
}

exports.deleteRequest=async(req,res)=>{
    try {
        // const{userId}=req.body
        const{id}=req.params
        const{_id}=req.user
   const deleteREQ=await FriendRequest.findOne({_id:id})
//    if(!deleteREQ){
//     return res.status(400).send({msg:"request not found"})
//    }
 
   if(deleteREQ.userId.toHexString()!==_id.toHexString()){
    return res.status(400).send({msg:"should be Connect for delete request"})
   }
            await FriendRequest.deleteOne({_id:id})
        return res.status(200).send({msg:"delete request with success..."})             
    } catch (error) {
     console.log(error)
     return res.status(500).send({msg:"can not delete request"})   
    }
}

exports.getAllRequest=async(req,res)=>{
    try {
        // const{friendId}=req.params
        // const{_id}=req.user 
    const All= await FriendRequest.find({})
       return res.status(200).send({msg:"get all requester...",Req:All})
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg:"can not get requestList"})
    }
}