const express=require('express')
const router=express.Router();
const {signup,Login,getUser,getAlluser,follow,profilePicture,coverPicture}=require('../controllers/usersControllers');
const {validation,loginRules,signupRules}=require('../MiddelWare/Validation');
// const AdimnAuth=require('../MiddelWare/AdminAuth')
const isAuth = require('../MiddelWare/isAuth');
const upload=require('../MiddelWare/upload')

router.post('/SignUp',signupRules(),validation,signup);
router.post('/Login',loginRules(),validation,Login);
router.put('/newPicture',isAuth,upload.single('picture'),profilePicture)
router.put('/newCover',isAuth,upload.single('coverPicture'),coverPicture)
router.get('/User',isAuth,getUser)
router.get('/',isAuth,getAlluser)
router.post('/:id',isAuth,follow)
module.exports=router;