const Post=require('../Models/PostModel')


exports.createPosts=async(req,res)=>{
 try {
    const{content}=req.body
    const{_id}=req.user
    const{file}=req;

   //  const filePath=file.path

    const image= !file  ? "" : file.filename
   // console.log('img',image)
   //  console.log("User",_id)
    
    // check like
   //  if( !content ){
   //      return res.status(400).send({msg:"please enter all fields"})
   //  }

   //  const isExist=await  Post.findOne({userId:_id})
   //  console.log("exist",isExist)
   //  if(!isExist){
   //    return res.status(400).send({msg:"all fields was obligated!!!"})
   //  }
    const newPost=new Post({...req.body,userId:_id,image})
    
      if(newPost.userId.toHexString()!==_id.toHexString()){
         return res.status(400).send({msg:"should be log in for create new post"})
      }
         await newPost.save();
         // await newPost.populate("userId").exec()
      //  console.log("newPost",newPost)
      
         return res.status(200).send({msg:"post created with success...",post:newPost})   
 } catch (error) {
    console.log(error)
    return res.status(500).send({msg:"Post not valid"})
 }

}


// exports.getPostbyid=async(req,res)=>{
//    try {
//       const{id}=req.params
//       const{_id}=req.user


//       const Posts=await Post.findById({_id:id})
//       if(Posts.userId.toHexString()!==_id.toHexString()){
//          return res.status(400).send({msg:"you can't get this post without Login"})
//       }
//       return res.status(200).send({msg:"get post with success",post:Posts})
//    } catch (error) {
//       console.log(error)
//       return res.status(500).send({msg:"can not get this post"})
//    }
// } 

exports.getposts=async(req,res)=>{
   try {
      // console.log("first")
      const{_id}=req.user
      const posts=await Post.find({userId:_id}).populate('userId').exec();
      // console.log("user",userId)
      //    console.log('post',posts)      
      if(!posts){
         return res.status(400).send({msg:"should be access for get posts!!!"})
      }
      // const populateLikes = posts.map((post)=>post.populate("Likes"))

      return res.status(200).send({msg:"get all posts with success",post:posts})
   } catch (error) {
      console.log(error)
      return res.status(500).send({msg:"Can not get post"})
   }
}

exports.updatePost=async(req,res)=>{
   try {
      //remove like update
      const{name,content,userId}=req.body
      const{id}=req.params
      const{_id}=req.user
      // console.log("req.user:",req.user._id.toHexString())

      const IDupdated=await Post.findOne({_id:id})
      if(IDupdated.userId.toHexString()!==_id.toHexString()){
         return res.status(400).send({msg:"should access to account for update post!!!"})
      }

      const updatePosts=await Post.updateOne({id,...req.body})
      // if(updatePosts.userId.toHexString() !==_id.toHexString()){
      //    return res.status(400).send({msg:"you can't update post without login!!!"})
      // }
      return res.status(200).send({msg:"post updated with success",post:updatePosts})
   } catch (error) {
      console.log(error)
      return res.status(500).send({msg:"can not update post"})
   }
} 


exports.deletebyid=async(req,res)=>{
   try {
      const{id}=req.params
      // console.log(req.params)
      const{_id}=req.user
  
      const deleteEqualId=await Post.findOne({_id:id})

    if(deleteEqualId.userId.toHexString()!==_id.toHexString()){
      return res.status(400).send({msg:"you can't access to this post!!!"})
    }

      const deletee=await Post.deleteOne({_id:id})
      return res.status(200).send({msg:"post deleted successfully...",post:deletee})
   } catch (error) {
      console.log(error)
      return res.status(500).send({msg:"can not delete this post"})
   }
}

exports.getpost=async(req,res)=>{
   try {
      // const{_id}=req.user
      // console.log("first")
    const posts=await Post.find({}).populate('userId').populate('Likes').exec()
    
     return res.status(200).send({msg:"get posts successfully...",post:posts})
              
   } catch (error) {
      console.log(error)
      return res.status(500).send({msg:"can not get all posts for all users"})
   }

}

exports.getpostByID=async(req,res)=>{
   try {
      // const{_id}=req.user
      // console.log("first")
    const post=await Post.findOne({_id:req.params.id}).populate('Likes')
    
     return res.status(200).send({msg:"get posts successfully..." , post})
              
   } catch (error) {
      console.log(error)
      return res.status(500).send({msg:"can not get all posts for all users"})
   }

}


// exports.countLike=async(req,res)=>{
//    try { 
//        const{postId}=req.params
//        console.log("_id post",postId)
//        const {_id}=req.user
    
//     const post =await Post.findById({userId:_id,_id:postId})
//    //  console.log("posts:",post)

//     if(!post){
//        return res.status(400).send({msg:"post not found!!!"})
//     }

//     const Likecount=post.Likes.length
//      //  console.log(Likecount)
//        return res.status(200).send({msg:"get nbr like succefully",post:Likecount})

//    } catch (error) {
//        console.log(error)
//        return res.status(500).send({msg:"can not count Like"})
//    }
// }