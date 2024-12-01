const express = require('express')
const adminRouter = express.Router()

adminRouter.get('/login',(req,res)=>{
    res.send('This is admin login')
})
adminRouter.get('/singIn',(req,res)=>{
    res.send('This is admin signIn')
})

module.exports = adminRouter