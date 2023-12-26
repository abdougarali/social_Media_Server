const express=require('express');
const router=express.Router();
const {addLike,deletLike,getLikes,getOneLike,countLike,testGetUserLike}=require('../controllers/LikesController');
const isAuth = require('../MiddelWare/isAuth');



router.post('/:postId',isAuth,addLike);
// router.delete('/:postId',isAuth,deletLike);
router.get('/:id',isAuth,getLikes);
// router.get('/:id',isAuth,countLike);
router.get('/one/:id',isAuth,getOneLike);
// router.get('/:id',isAuth,testGetUserLike)
module.exports=router;