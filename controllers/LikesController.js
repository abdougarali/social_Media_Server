const Like=require('../Models/Poste_like_Model')
const Post=require('../Models/PostModel')


exports.addLike=async(req,res)=>{
    try {
       // check it
        // const {userId}=req.body
        const {postId}=req.params
        // console.log(postId)
        // console.log("params :",req.params)
        const {_id}=req.user
        // const LikeId=Post.find({})
        // console.log('like',LikeId)
        //  console.log("user current",_id)
        if(!postId){
            return res.status(400).send({msg:"please enter all fields"})
        }

        const isLike=await Like.findOne({userId:_id,postId})

        if(!isLike){
            const newLike=new Like({userId:_id,postId})
               
                
                if(newLike.userId.toHexString()!==_id.toHexString()){
                    return res.status(400).send({msg:"should be LOGIN for like post"})
                }
            //   const saveLike=await Post.Push(newLike.save())
            //   console.log(saveLike)
                 const savedLiked=await newLike.save()
                 await Post.findByIdAndUpdate(postId,{$push:{Likes:savedLiked._id}}).populate('Likes').exec()
                 return res.status(200).send({msg:"like saved succefully",likes:newLike})

        }else{
            await Like.deleteOne({userId:_id,postId})
            await Post.findByIdAndUpdate(postId,{$pull:{Likes:isLike._id}}).populate('Likes').exec()
            return res.status(200).send({msg:"Like is deleted with success..."})

        }
            //    console.log("save : ",savedLiked)
               
            
            //    console.log('update post:',updatePost)
            
            // const Like=await Post.findOne({_id:postId})
            // console.log("Like",Like)
            
            // const countLikes= UpdatePost.Likes.length
            //       console.log("count",countLikes)         
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg:"can not like this post"})
    }
}

// exports.deletLike=async(req,res)=>{
//  try {
    
//     const {postId}=req.params
//     const{_id}=req.user
//     //    console.log("postId",postId)


//   const unLike=await Like.findOne({userId:_id,postId})
// //   console.log("unlike",unLike._id)
//   //check it 
//   if(unLike.userId.toHexString()!==_id.toHexString()){
//     return res.status(400).send({msg:"you can't delete Like outSide the account!!!"})
//   }
//       await Post.findByIdAndUpdate(postId,{$pull:{Likes:unLike._id}}).populate('Likes').exec()
//        await Like.deleteOne({userId:_id,postId})
      

// //   if(!unLike){
// //     return res.status(400).send({msg:"Like not found !!!"})
// //   }
//       return res.status(200).send({msg:"post is deleted with success..."})
//  } catch (error) {
//     console.log(error)
//     return res.status(500).send({msg:"can not delete this Like"})
//  }

// }

exports.getLikes=async(req,res)=>{
    try {
        const{id}=req.params
        // console.log(id)
        // console.log('id',_id)
        const get=await Post.findById({_id:id}).populate({path:'Likes',populate:{path:'userId'}})
        // console.log('test',get)
        const like=get.Likes
        // console.log("get",get)
        // console.log('Like',like)
        return res.status(200).send({msg:"get all Likes with success",like})
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg:"can not get likes"})
    }
}

// check it
exports.getOneLike=async(req,res)=>{
     try {
        // const {userId}=req.body
     const{id}=req.params
     const {_id}=req.user



const getLike=await Post.findOne({userId:_id,_id:id})
// console.log('test',getLike)

// if(getLike.userId.toHexString()!==_id.toHexString()){
//     return res.status(400).send({msg:"accecss for search Likes!!!"})
// }
return res.status(200).send({msg:"get Like with success",likes:getLike})
     } catch (error) {
        console.log(error)
        return res.status(500).send({msg:"can not get this Like!!!"})
     }

}

// exports.foundLike=async(req,res)=>{
//     try {
//         const isLike=Like.find({userId,postId})

//     } catch (error) {
//         console.log(error)
        
//     }
// }



// exports.testGetUserLike =async(req,res)=>{
//     try {
//         const getTestLIke = await Like.findOne({postId:req.params.id , userId:req.user._id})
//         return res.status(200).send({msg:"get Likes with success",postUserLike:getTestLIke})

//     } catch (error) {
//         console.log(error)
//         return res.status(500).send({msg:"can not get this Like!!!"})

//     }
// }