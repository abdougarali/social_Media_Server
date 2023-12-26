const mongoose=require('mongoose')
const{Schema,model,Types}=mongoose


const friendRequestSchema=new Schema({
userId:{
    type:Types.ObjectId,
    ref:'users',
    required:true
},
friendId:{
    type:Types.ObjectId,
    ref:'users',
    required:true
}
})


const FriendRequest=model('request',friendRequestSchema)

module.exports=FriendRequest