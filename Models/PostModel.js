const mongoose=require('mongoose')
const {Schema,model}=mongoose

const postModel=new Schema({
  name:{type:String},
  description:{String},
  userId:{type:Schema.Types.ObjectId, ref:"users",required:true},
  content:{type:String,},
  image:{type:String},
  created_AT:{type:Date,default:Date.now()},
  updated_AT:{type:Date,default:Date.now()},
  comment:[{type:Schema.Types.ObjectId,ref:'comments'}],
  Likes:[{type:Schema.Types.ObjectId, ref:'like'}]

},
{timestamps:true} 
)

const Post=model('Post',postModel)

module.exports=Post;