const express=require('express');
const user=require('../models/user');
const Blog=require('../models/blog');
const router=express.Router();
const {createHmac,randomBytes}=require('crypto')


router.get('/login',(req,res)=>{
    return res.render('login');
})

router.get('/signup',(req,res)=>{
    return res.render('signup');
})

router.post('/login',async (req,res)=>{
    try {
        const {email,password}=req.body;
        const userLogin=await user.findOne({email});
        if(!userLogin) return res.render('login',{error:"User does not exist",route:"login"});
        try {
            const token=await user.matchPasswordandGenerateToken(email,password);
            return res.cookie('token',token).redirect('/');
        } catch (error) {
            return res.render('login',{error:"Incorrect email or password"});
        }
    } catch (error) {
        return res.status(401).render('errorPage',{
            errorMessage:'Some thing went wrong please try again later'
        });
    }
});

router.post('/signup',async (req,res)=>{
  try {
      const {fullName,email,password,userRole,gender}=req.body;
      if(await user.findOne({email})){
          return res.render('signup',{error:"Email already exists",route:'signup'});
      };
      const newUser=await user.create({
          fullName:fullName,
          email:email,
          password:password,
          role:userRole,
          gender:gender,
      })
      // console.log(newUser);
      return res.render('login',{message:"User created successfully login to continue"});
  } catch (error) {
    return res.status(401).render('errorPage',{error:"Some thing went wrong please try again later"});
  }
});



router.get('/logout',(req,res)=>{
   try {
     return res.clearCookie('token').redirect('/');
   }
   catch(error){
    return res.redirect('/');
   }
})

router.get('/delete-account',(req,res)=>{
    return res.render('deleteAccount',{
        user:req.user,
    });
})

//using post request here because unable to resolve the error using delete request
// router.delete('/delete-account',async (req,res)=>{
//     const userToBeDeleted=req.user;
//     await user.findByIdAndDelete({_id:userToBeDeleted._id});
//     return res.redirect('/');
// })

router.post('/delete-account',async (req,res)=>{
    try {
        const userToBeDeleted=req.user;
        await user.findByIdAndDelete({_id:userToBeDeleted._id});
        await Blog.deleteMany({ createdBy: userToBeDeleted._id });
        return res.clearCookie('token').redirect('/');
    } catch (error) {
        return res.status(401).render('errorPage',{
            errorMessage:'To delete your account please login and try again'
        });
    }
    
})

router.get('/upgrade',(req,res)=>{
    return res.redirect('/settings');
})

router.post('/upgradeToAuthor',async (req,res)=>{
    try {
        const userToBeUpgraded=req.user;
        const updatedData={role:"author"};
        const updatedUser=await user.findByIdAndUpdate(userToBeUpgraded._id,updatedData);
        const blogs=await Blog.find({});
        return res.render('home',{
            user:req.user,
            message:'User upgraded, please login again to get full access',
            blogs,
        });
    } catch (error) {
        return res.redirect('/');
    }
})





module.exports=router;
