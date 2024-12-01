const express = require('express')
const app = express()
const adminRouter = require('./adminRouter')
const publicRouter = require('./publicRouter')
const dotenv = require('dotenv')
dotenv.config();
const PORT = process.env.PORT || 5000
const cors = require('cors');

app.use(cors())
app.use(express.json())
app.use('/admin',adminRouter)
app.use('/user',publicRouter)



app.listen(PORT,()=>console.log(`listening port : ${PORT}`))
