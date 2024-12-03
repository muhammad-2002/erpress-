const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const todoHandler = require('./handler/todoHandler')
const userHandler = require('./handler/userHandler')
dotenv.config()
const cors = require('cors')
const PORT = process.env.PORT
//mongodb connection




const app = express()
app.use(express.json())
app.use(cors())
mongoose.connect('mongodb://localhost:27017/todo')
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.error('Database connection error:', err));

app.use('/todo',todoHandler)
app.use('/user',userHandler)

app.listen(PORT,()=>console.log(`listening Port ${PORT}`))