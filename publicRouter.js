const express = require('express')
const publicRouter = express.Router()

publicRouter.get('/login',(req,res)=>{
    res.send('public routing...')
})

module.exports = publicRouter