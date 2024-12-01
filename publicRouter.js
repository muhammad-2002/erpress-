const express = require('express')
const publicRouter = express.Router()

publicRouter.get('/login',(req,res)=>{
    res.send('public routing...')
})

publicRouter.param((param,option)=>(req,res,next,id)=>{
    if(option === id){
        req.user = 'admin'
        next()
    }else{
        res.sendStatus(403)
    }
})
publicRouter.param('user','12')
// publicRouter.param('user',(req,res,next,id)=>{
//     console.log('i am running')
//     req.user = id === '1'?'admin':'user'
//     next()
// })
// publicRouter.get('/:user',(req,res)=>{
//     console.log(`Hello ${req.user}`)
//     res.send('success')
// })
publicRouter.get('/login/:user',(req,res)=>{
    console.log(`login ${req.user}`)
    res.send('success')
})

module.exports = publicRouter