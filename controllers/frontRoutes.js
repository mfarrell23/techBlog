const express = require('express');
const router = express.Router();
const {User,Blog} = require('../models');

//Getting all the blogs
router.get("/",(req,res)=>{
    Blog.findAll().then(blogs=>{
        const blogHandBsData = blogs.map(blog=>blog.get({plain:true}))
        console.log(blogs);
        console.log(blogHandBsData)

        res.render("home",{
            projects:blogHandBsData,
            logged_in:req.session.logged_in
        })
    })
})

//Getting current session
router.get("/sessions",(req,res)=>{
    res.json(req.session)
})

//Getting Blog data by Id
router.get("/blog/:id",(req,res)=>{
    Blog.findByPk(req.params.id,{
        include:[User]
    }).then(blog=>{
        const blogHandBsData = blog.get({plain:true});
        console.log(blog);
        console.log(blogHandBsData)
        blogHandBsData.logged_in=req.session.logged_in
        res.render("blog-deets",blogHandBsData)
    })
})
//This redirects you to home page(profile)
router.get("/login",(req,res)=>{
    if(req.session.logged_in){
        return res.redirect("/home")
    }
    res.render("login")
})

//redirect user to home if logged in setting the session login data to handlebar login data
router.get("/home",(req,res)=>{
    if(!req.session.logged_in){
        return res.redirect("/login")
    }
    User.findByPk(req.session.user_id,{
        include:[Blog]
    }).then(userInfo=>{
        const handleBarsData = userInfo.toJSON();
        console.log(handleBarsData)
        handleBarsData.logged_in=req.session.logged_in
        res.render("home",handleBarsData)
    })
})

module.exports = router;