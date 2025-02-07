const {Router}=require('express');
const blog=require('../models/blog');
const multer=require('multer');
const path=require('path');
const User = require('../models/user');
const { title } = require('process');
const {createToken,validateToken}=require('../Services/auth');
const comment=require('../models/comments');
const router=Router();



const storage=multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,path.resolve(__dirname,`../public/uploads`));
    },
    filename:function(rq,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`)
    },
})

const upload=multer({storage});


router.get('/add-new',(req,res)=>{
    try {
        return res.render("addBlog",{
            user:req.user,
        })
    } catch (error) {
        return res.status(401).render('errorPage',{
            errorMessage:'Some thing went wrong please try again and check login status'
        });
    }
    
})


router.post('/',upload.single('coverImage'),async (req,res)=>{
    try {
        const info=req.body;
    console.log(info);
    const newBlog=await blog.create({
        title:info.title,
        body:info.body,
        createdBy:req.user._id,
        coverImageUrl:`/uploads/${req.file.filename}`,
        readTime:info.readTime,
    }) 
    return res.redirect(`/`);
    } catch (error) {
        return res.status(401).render('errorPage',{
            errorMessage:'Some thing went wrong please try again later'
        });
    }
    
})

router.get('/find/:id',async (req,res)=>{
    try {
        const blogToBeFound=await blog.findById(req.params.id).populate('createdBy');
        const author=await User.findById(blogToBeFound.createdBy);
        const comments=await comment.find({blogId:req.params.id}).populate('createdBy').sort({createdAt:-1});
        console.log(comments);
        return res.render('blog',{
            user:req.user,
            blog:blogToBeFound,
            author:author.fullName,
            comments,
        });
    } catch (error) {
        return res.status(401).send("Some thing went wrong please try again and check login status");
    }
   
    
})


router.get('/editBlogs',async (req,res)=>{
    try{
        const user=req.user;
        const allBlogsByUser=await blog.find({createdBy:req.user._id});
        return res.render('editBlogs',{
            user:req.user,
            blogs:allBlogsByUser,
        });
    }
    catch(error){
        return res.status(401).render('errorPage',{
            errorMessage:'Some thing went wrong please try again and check login status'
        });
    }
    
})


router.post('/comment/:blogId',async (req,res)=>{
    try {
        const newComment=await comment.create({
            content:req.body.content,
            blogId:req.params.blogId,
            createdBy:req.user._id,
        })
        return res.redirect(`/blog/find/${req.params.blogId}`);
    } catch (error) {
        return res.status(401).render('errorPage',{
            errorMessage:'Some thing went wrong please try again and check login status'
        });
    }
})
router.get('/edit/:id',async (req,res)=>{
    try{ const blogToBeFound=await blog.findById(req.params.id);
        return res.render('editPage',{
            user:req.user,
            blog:blogToBeFound,
        })}
        catch(error){
            return res.status(401).render('errorPage',{
                errorMessage:'Some thing went wrong please try again and check login status'
            });
        }
   
})


router.post('/edit/:id',async (req,res)=>{
    try {
        const userToken=req.cookies['token'];
        const newBody=req.body;
            const updated={
                title:newBody.title,
                body:newBody.body,
                readTime:newBody.readTime,
            }
            const userInfo=validateToken(userToken);
            const tobeupdated=await blog.findById(req.params.id);
            if(tobeupdated.createdBy==userInfo._id){

                const updatedData=await blog.findByIdAndUpdate(req.params.id,updated);
                return res.redirect('/blog/editBlogs');
            }
            else{
                return res.send("Error cannt edit Blogs of other authors");
            }
        }
     catch (error) {
        return res.status(500).render("errorPage",{
            errorMessage:"Cann't edit the blogs of other users,please login to your own acccount to edit your blogs"
        });
    }
    
})



module.exports=router;