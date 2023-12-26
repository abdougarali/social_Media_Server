const express=require('express')
const router=express.Router();
const {createPosts,getPostbyid,getposts,updatePost,deletebyid,getpost, getpostByID}=require('../controllers/postsControllers');
const isAuth = require('../MiddelWare/isAuth');
const upload=require('../MiddelWare/upload')


router.post('/new',isAuth,upload.single('image'),createPosts);
// router.get('/:id',isAuth,getPostbyid);
// router.get('/count/:id',isAuth,countLike)
router.get('/',isAuth,getposts);
router.get('/All',isAuth,getpost);
router.put('/update/:id',isAuth,updatePost);
router.delete('/Delete/:id',isAuth,deletebyid);
router.get("/:id" ,isAuth, getpostByID)





module.exports=router;