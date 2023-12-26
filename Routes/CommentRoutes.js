const express=require('express')
const router=express.Router();
const {createComment,getComment,getComments,DeleteComment}=require('../controllers/commentcontrolller');
const isAuth = require('../MiddelWare/isAuth');

router.post('/:postId',isAuth,createComment);
router.get('/:id',isAuth,getComment);
router.get('/gets/:id',isAuth,getComments);
router.delete('/Delete/:postId',isAuth,DeleteComment);
module.exports=router;