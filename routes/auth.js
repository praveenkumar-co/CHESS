const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');
router.get('/register',(req,res)=>{
   res.render('register',{
       title :  "REGISTER"
   });
});
router.post('/register',async(req,res)=>{
   const {username , email,password} = req.body;
   const existing = await User.findOne({email});
   if(existing){
    res.send("User already exist !");
   }
   const hashed = await bcrypt.hash(password,12);
   const user = await User.create({
    username,email,password:hashed
   });
   req.session.user = user ;
   res.redirect('/login');
});
router.get('/login',(req,res)=>{
   res.render('login',{
       title : "LOGIN"
   });
});
router.post('/login',async(req,res)=>{
   const {email,password} = req.body ;
   const user =await  User.findOne({email});
   if(!user){
     return res.send("No such User");
   }
   const valid = await bcrypt.compare(password,user.password);
   if(!valid){
    return res.send("Invalid password");
   }
   req.session.user = user ;
   res.redirect('/index');
});
router.get('/logout',(req,res)=>{
   req.session.destroy();
   res.redirect('/home');
});
module.exports = router ;