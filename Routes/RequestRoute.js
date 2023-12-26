const express=require('express')
const router=express.Router()
// const {requestController}=require('../controllers/requestController')
const {createRequest,deleteRequest,getAllRequest}=require('../controllers/requestController');
const isAuth = require('../MiddelWare/isAuth');


router.post('/:friendId',isAuth,createRequest);
router.delete('/:id',isAuth,deleteRequest);
router.get('/',isAuth,getAllRequest)
module.exports=router;