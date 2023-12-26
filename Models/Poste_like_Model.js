const mongoose=require('mongoose');
const{Schema,model}=mongoose;


const likeSchema=new Schema({
userId:{type:Schema.Types.ObjectId,ref:'users',required:true},
postId:{type:Schema.Types.ObjectId,ref:'Post',required:true},
createdAT:{type:Date,default:Date.now()},
updatedAT:{type:Date,default:Date.now()}   
},
{timestamps:true}
)

const Like=model('like',likeSchema)


module.exports=Like;


