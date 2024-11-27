const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config();
const PORT = process.env.PORT || 5000
const cors = require('cors');

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send(q)
})
app.get('/headers',(req,res)=>{
    for(let i =0;i<=10;i++){
        if(i ===5 ){
            next('there was an error !')
        }else{
            res.write('a') //stream pass with headers
        }
    }
    res.end()
})

//404 error handling middleware
app.use((req,res,next)=>{
    res.status(404).send('request url not found')
    // next('request url not found')
})

//error handling middleware
app.use((err,req,res,next)=>{
    if(res.headersSent){
        next('There was a problem !')
    }else{
        if(err.massage){
            res.status(500).send(err.massage)
        }else{
            res.status(500).send("There was an error !")
        }
    }
    

})



app.listen(PORT,()=>console.log(`listening port : ${PORT}`))
