const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = require('../schema/userSchema')
const jwt = require('jsonwebtoken')
const express = require('express')

const User = new mongoose.model("User",userSchema)

const router = express.Router()

router.post('/',async(req,res)=>{
   
   const users =await Promise.all( req.body.map(async (item) => {
      return {
          ...item, 
          password: await bcrypt.hash(item.password, 10),
      };
  }))
     try{
    
      const newUser= await User.insertMany(users)
      res.status(200).json({
         newUser
      })
     }catch(err){
      res.status(500).json({
         error:"This is server side error"
      })
     }
})
router.post('/login',async(req,res)=>{
   try{
      const user = await User.find({username:req.body[0].username})
      console.log(req.body)
      if(user && user.length >0){
         const isValidPass = await bcrypt.compare(req.body[0].password,user[0].password);
         console.log(isValidPass)
     
         if(isValidPass){
            const token =  jwt.sign({
               username:user[0].username,
               userId:user[0]._id
           },process.env.Secret_key,{
               expiresIn: '1hr'
           })
           res.status(200).json({
            "access_token":token,
            "message":"login successfully"
        })
         }else{
            res.status(403).json({
               error:"authentication error"
            })
         }
      }else{
         res.status(403).json({
            error:"authentications error"
         })
      }
     

   }catch(err){
      res.status(500).json({
         message:"there was and error"
      })
   }
})
module.exports = router