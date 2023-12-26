const express=require('express');
const app=express();
require('dotenv').config();
const ConnectionDB=require('./config/connectionDB')
const PORT=process.env.PORT||4510;
const userRouter=require('./Routes/UsersRoutes')
const postRouter=require('./Routes/PostsRoutes')
const commentRouter=require('./Routes/CommentRoutes')
const LikesRouter=require('./Routes/LikesRoutes')
const requestController=require('./Routes/RequestRoute')
ConnectionDB();

app.use('/public', express.static('public'))

app.use(express.json())
app.use('/api/user',userRouter)
app.use('/api/Posts',postRouter)
app.use('/api/Comment',commentRouter)
app.use('/api/Likes',LikesRouter)
// app.use('/api/Request',requestController)




app.listen(PORT,(err)=>{

    err?console.log('server not work',err)
    :console.log(`server running on port ${PORT}`) 
})