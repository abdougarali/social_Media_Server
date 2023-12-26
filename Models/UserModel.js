const mongoose=require('mongoose');
const{Schema,model,Types}=mongoose
const UserSchema=new Schema({
    Name:{type:String,required:true},
    LastName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{
        type:String,
        enum:['Admin','User'],
        default:'User'
    },
    // bio:String,
    picture:{
        type:String,
        default:''
    },
    coverPicture:{
        type:String,
        default:''
    },
    BirthDay:Date,
    // u need to make ref with friendReq and this model
    followers:[{type:Schema.Types.ObjectId,ref:'users'}],
    followings:[{type:Schema.Types.ObjectId,ref:'users'}]

})

const users=model('users',UserSchema);

module.exports=users;