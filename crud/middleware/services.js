const {user} = require('../model/user');
const token=require('../Auth/auth');
const express =require('express');
const mongoose = require('mongoose');
const app= express();
const route = express.Router();
const jwt = require('jsonwebtoken');
const {secret} = require('../config.json')
const decode = require('jwt-decode')

route.post('/create_user', async (req,res)=>{
 let newuser = new user({
        username : req.body.username,
        password :req.body.password
    })
    let accesstoken = token({username:req.body.username});
    newuser= await newuser.save();
    res.send({newuser :newuser,accesstoken :accesstoken});

});

route.post('/login',async (req,res)=>{

    let user_details = await user.findOne({username:req.body.username});
    if (!user_details) res.send("no user found");
    if (req.body.password !== user_details.password) res.send("password mismatch")
    let accesstoken = token({username:req.body.username});
    res.send({userdetails:user_details,accesstooken: accesstoken});
   });
   

route.get('/list',authenticate,async (req,res)=>{
    const list = await user.find().sort('username').select('username password');
    res.send(list)
})

route.put('/:id',authenticate,async (req,res)=>{

    const updateduser = await user.findByIdAndUpdate(req.params.id,{
        username: req.body.username,
        password :req.body.password
    },{new : true});
    res.send(updateduser);
});


route.delete('/:id',authenticate,async(req,res)=>{
    const deleteuser =await user.findByIdAndDelete(req.params.id);
    res.send(deleteuser)
    })


function authenticate(req,res,next){
    const authhead = req.headers['authorization'];
    const jwttoken = authhead && authhead.split(' ')[1];
    const decode_token = decode(jwttoken);
    if (jwttoken === null ) return res.status(401).send('invalid token')
    jwt.verify(jwttoken,secret,(err, user) => {
      
        if (err) return res.sendStatus(403)

         if (user.username === decode_token.username){
        next();
         }
         else{
             res.send("invalid user")
         }
      
         });
      }

module.exports=route;