const express=require('express');
const router=express.Router();
const Blog=require('../models/blog');
const user=require('../models/user');

router.get('/',async (req,res)=>{
        const allBlogs=await Blog.find({}).sort("-createdAt");
        return res.render('home',{
            user:req.user,
            blogs:allBlogs,
        });
})

router.get('/settings',(req,res)=>{
    return res.render('settings',{
        user:req.user,
        
    })
})

router.get('/overview',(req,res)=>{
    return res.render('overview',{
        user:req.user,

    });
})


router.get('/pricing',(req,res)=>{
    return res.render('pricing',{
        user:req.user,

    });
})


router.get('/customer',(req,res)=>{
    return res.render('customers',{
        user:req.user,

    });
})


router.get('/contact',(req,res)=>{
    return res.render('contact',{
        user:req.user,

    });
})


router.get('/sources',(req,res)=>{
    return res.render('sources',{
        user:req.user,

    });
})


router.get('/faq',(req,res)=>{
    return res.render('faq',{
        user:req.user,

    });
})


router.get('/tos',(req,res)=>{
    return res.render('tos',{
        user:req.user,

    });
})


router.get('/privacy-policy',(req,res)=>{
    return res.render('privacyPolicy',{
        user:req.user,

    });
})


router.get('/cookies',(req,res)=>{
    return res.render('cookies',{
        user:req.user,

    });
})


module.exports=router;