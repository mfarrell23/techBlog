const express = require('express');
const router = express.Router();
const {User,Blog} = require('../models');

router.get("/",(req,res)=>{
    Blog.findAll().then(blogs=>{
        const blogHandBsData = blogs.map(blog=>blog.get({plain:true}))
        console.log(blogs);
        console.log("==============")
        console.log(blogHandBsData)

        res.render("home",{
            projects:blogHandBsData,
            logged_in:req.session.logged_in
        })
    })
})

router.get("/sessions",(req,res)=>{
    res.json(req.session)
})
router.get("/blog/:id",(req,res)=>{
    Blog.findByPk(req.params.id,{
        include:[User]
    }).then(blog=>{
        const blogHandBsData = blog.get({plain:true});
        console.log(blog);
        console.log("==============")
        console.log(blogersData)
        blogHandBsData.logged_in=req.session.logged_in
        res.render("blog-details",blogHandBsData)
    })
})

router.get("/login",(req,res)=>{
    if(req.session.logged_in){
        return res.redirect("/home")
    }
    res.render("login")
})

router.get("/home",(req,res)=>{
    if(!req.session.logged_in){
        return res.redirect("/login")
    }
    User.findByPk(req.session.user_id,{
        include:[Blog]
    }).then(userInfo=>{
        const handleBarsData = userInfo.toJSON();
        console.log(hpsData)
        handleBarsData.logged_in=req.session.logged_in
        res.render("home",handleBarsData)
    })
})

module.exports = router;