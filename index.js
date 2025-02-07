const path=require('path')
const express=require('express');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const Blog = require('./models/blog');


const app=express();
const Port=4001;


mongoose.connect('mongodb://127.0.0.1:27017/Bloggzz')
.then(()=>{
    console.log("MongoDb connected succesfully");
})
.catch((err)=>{
    if(err){
        console.log("Error occurred, ",err);
    }
})


const userRouter=require('./routes/user');
const blogRouter=require('./routes/blog');
const staticRouter=require('./routes/static');


const { checkForAuthenticationCookie } = require('./middlewares/authentication');


app.set('view engine','ejs');
app.set('views',path.resolve("./views"));

app.use(express.json({ limit: '1000mb' }));
app.use(express.urlencoded({ limit: '1000mb', extended: true }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));
app.use(express.static(path.resolve('./public')));



app.use('/user',userRouter);
app.use('/blog',blogRouter);
app.use('/',staticRouter);

app.listen(Port,()=>{console.log("Server initialised successfully on PORT: ",Port)});
 