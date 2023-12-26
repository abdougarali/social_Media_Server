const Comment = require("../Models/CommentModel");
const Post=require('../Models/PostModel')
exports.createComment = async (req, res) => {
  try {
    
    const {comment} = req.body;
    const{_id}=req.user
    const{postId}=req.params
    // console.log("postId",postId)
    // console.log(_id)
    if (!comment) {
      return res.status(400).send({ msg: "please enter all fields" });
    }
    const newComment = new Comment({ ...req.body,userId:_id,postId});
    if(newComment.userId.toHexString()!==_id.toHexString()){
        return res.status(400).send({msg:"you can't create new commit here!!!"})
    }
    // console.log("new comment:",newComment)
    const savedComment=await newComment.save();
    await Post.findByIdAndUpdate(postId,{$push:{comment:savedComment._id}}).populate('comment').exec()
    return res
      .status(200)
      .send({ msg: "comment added successfully...",comment: newComment });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "can not create comment" });
  }
};

exports.getComment = async (req, res) => {
  try {
    const { id } = req.params;
    // const {_id}=req.user
   
    const getisEqualId=await Comment.findOne({_id:id})

  //   //check this : not logic
  //   if(getisEqualId.userId.toHexString()!==_id.toHexString()){
  // return res.status(400).send({msg:"can not get this Comment!!!"})
  //   }
    const getComm = await Comment.findById({ _id: id });
    if (!getComm) {
      return res.status(400).send({ msg: "ID not found!!!" });
    }
    return res
      .status(200)
      .send({ msg: "get comment with success", comment:getisEqualId});
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "can not get comment" });
  }
};

exports.getComments = async (req, res) => {  
  try {
    const {id}=req.params
    // console.log('postId',id)    
    // const {_id}=req.user
    //   const res=await Comment.findOne() 
        const  post=await Post.findById({_id:id}).populate({path:'comment',populate:{path:'userId'}})
        // console.log("post",post)
             const findpost=post.comment
    // console.log("find post",findpost)
    // check : Get Comment for postID Not UserID
    // const getAll = await Comment.find({postId:postId})
    // console.log(getAll)
    return res
      .status(200)
      .send({ msg: "get all Comments with success...", findpost});
  } catch (error) {
     console.log(error);
    return res.status(500).send({ msg: "can't get Comments" });
  }
};

exports.DeleteComment = async (req, res) => {
  try {
    // const { userId } = req.body;
    const {postId} = req.params;
    // console.log("postId",postId)
    const {_id} = req.user;
    // console.log("_id",_id)
    const userIdisEqual = await Comment.findOne({userId:_id,postId});
    // console.log("userIdisEqual",userIdisEqual.userId.toHexString())
    // console.log(req.user)
    // console.log(userIdisEqual.userId.toHexString())
    if (userIdisEqual.userId.toHexString() !==_id.toHexString()) {
      return res.status(400).send({ msg:"can not delete this comment!!!"});
    }
    await Comment.deleteOne({userId:_id,postId});
    await Post.findByIdAndUpdate(postId,{$pull:{comment:userIdisEqual._id}}).populate('comment').exec()
    return res.status(200).send({ msg:"Comment deleted with success"});
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "can not delete this Comment" });
  }
};
