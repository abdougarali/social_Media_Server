const mongoose=require('mongoose')
const {Schema,model}=mongoose;


const commentSchema=new Schema({
userId:{type:Schema.Types.ObjectId,ref:'users',required:true},
postId:{type:Schema.Types.ObjectId,ref:'Post',required:true},
comment:{type:String,required:true},
from:{type:String},
createdAt:{type:Date,default:Date.now()}
},
{timestamps:true}
)

const Comment=model('comments',commentSchema)

module.exports=Comment;

