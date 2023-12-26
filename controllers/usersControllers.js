const users = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config("../.env");

exports.signup = async (req, res) => {
  try {
    const { Name, LastName, email, password } = req.body;

    // if (!email || !Name || !LastName || !password){
    //     return res.status(400).send({msg:"entre all fields!!!"})
    // }
    const isfound = await users.findOne({ email: email });
    if (isfound) {
      return res.status(400).send({ msg: "account not valid change Email" });
    }
    const newUser = new users({ ...req.body });
    saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    newUser.password = hashedPassword;
    await newUser.save();
    const payload = {
      id: newUser._id,
    };
    let token = await jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "3h",
    });
    return res
      .status(200)
      .send({ msg: "user saved succefully...", user: newUser, token });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Can Not Add this User!!!" });
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await users.findOne({ email: email });
    if (!user) {
      return res.status(400).send({ msg: "invalid Email " });
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.status(400).send({ msg: "invalid password" });
    }
    const payload = {
      id: user._id,
    };
    let token = await jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "3h",
    });
    // console.log(token)
    return res
      .status(200)
      .send({ msg: "Login with success ...", user: user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "can not find user" });
  }
};

exports.getUser = (req, res) => {
  return res.status(200).send({ user: req.user });
};

exports.getAlluser = async (req, res) => {
  // const {_id}=req.user
  try {
    // 
    // const curentUser=await users.findOne(_id)
    // const currentUser=await users.findOne(req.user._id)
    //  const IsFollowings=await currentUser.followings


    //  console.log("IsFollowings",IsFollowings)
    //  console.log('user',IsFollowings)
    
    const AllUser = await users.find({_id:{ $nin: [req.user._id, ...req.user.followers, ...req.user.followings] } });
    // console.log(AllUser)
    
    
  //  const currentUser=await AllUser.find(req.user)
        //  console.log("user",currentUser)
        //  console.log('user:', currentUser)
    return res
      .status(200)
      .send({ msg: "get all user with success...", user: AllUser });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "can not get all user" });
  }
};

exports.follow = async (req, res) => {
  try {
    const currentUser = await users.findOne({ _id: req.user._id });
    const { id } = req.params;
    const friendId = await users.findOne({ _id: id });
    // console.log(friendId)
    // console.log('firend',friendId._id)
    //Friend
    const FriendIsFollower = await friendId.followers.find((el) => el == id);
    const FriendIsFollowing = await friendId.followings.find((el) => el == id);
    // currentUser
    const currentUserIsFollower = await currentUser.followers.find(
      (el) => el == id
    );
    const currentUserIsFollowing = await currentUser.followings.find(
      (el) => el == id
    );

    // console.log("F isFollower : ", FriendIsFollower);
    // console.log("F isFollowing : ", FriendIsFollowing);
    // console.log("U isFollower : ", currentUserIsFollower);
    // console.log("U isFollowing : ", currentUserIsFollowing);
    if (
      !FriendIsFollower &&
      !FriendIsFollowing &&
      !currentUserIsFollower &&
      !currentUserIsFollowing
    ) {
      await currentUser.followings.push(id);
      await friendId.followers.push(req.user._id);
      await currentUser.save();
      await friendId.save();
        //  console.log(currentUser)
        //  console.log(friendId)

        // if (friendId.socketId) {
        //   io.to(friendId.socketId).emit('newFollower', { followerId: req.user._id });
        // }

    } else {
      // await currentUser.followers.delete((el)=>el==id)
      if (friendId) {
        await friendId.followings.pull(req.user._id);
        await friendId.followers.pull(req.user._id);

        await friendId.save();
      }
      if (currentUser) {
        // console.log("test")
        await currentUser.followings.pull(id);
        await currentUser.followers.pull(id);
             
        await currentUser.save();
      }
      
      // console.log("delete")
      return res.status(200).send({ msg: "unfollow with success" });

    }
    return res.status(200).send({ msg: "follow with success" });

    // console.log(friend)
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "can not follow!!!" });
  }
};


exports.profilePicture=async(req,res)=>{
  try {
    const {_id}=req.user
    const {file}=req;
    // console.log("filename",file)
    // console.log("file",file)
   const picture=file.filename
  //  console.log("picture",picture)
   await users.updateOne({_id:_id},{picture:picture})
   const updatePicture = await users.findById(_id)

   if(!updatePicture){
    return res.status(400).send({msg:"User Not found"})
   }
     return res.status(200).send({msg:"profile picture modified with success",picture:updatePicture})
  } catch (error) {
    console.log(error)
    return res.status(500).send({msg:"can not change your profile picture"})
  }
}



exports.coverPicture=async(req,res)=>{
  try {
    const {_id}=req.user
    const {file}=req;
    console.log("file",file)
    const coverpicture=file.filename;
    await users.updateOne({_id:_id},{coverPicture:coverpicture})
    const updateCoverpicture=await users.findById(_id)
 
  if(!updateCoverpicture){
    return res.status(400).send({msg:"user not found"})
  }
  return res.status(200).send({msg:"cover photo updated with success...",cover:updateCoverpicture})

  } catch (error) {
    console.log(error)
    return res.status(500).send({msg:"can not change your cover picture"})
  }
}