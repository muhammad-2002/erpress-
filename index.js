const express = require('express')
const multer = require('multer')
const path = require('path')
const app = express()
const dotenv = require('dotenv')
dotenv.config();
const PORT = process.env.PORT || 5000
const cors = require('cors');
const Upload_Destination = './uploads'
app.use(cors())
app.use(express.json())
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,Upload_Destination)
    },
    filename:(req,file,cb)=>{
        const ext = path.extname(file.originalname)
       const fileName = file.originalname.replace(ext,'').toLowerCase().split(" ").join("_")+"_"+Date.now()
       cb(null,fileName+ext)

    }
})
const upload = multer({
    
        storage:storage,
        limits:{
          fileSize:1000000
        },
        fileFilter:(req, file, cb)=>{
            console.log(file.mimetype)
            
            if(file.fieldname === 'avatar'){
                if(file.mimetype ==='image/png'||file.mimetype ==='image/jpg'||file.mimetype ==='image/jpeg'){
                    cb(null,true)
                }
                else{
                    cb(new Error("only png, jpg,jpeg allowed "))
                }
            }else if(file.fieldname === 'gallery'){
                if(file.mimetype ==='application/pdf'){
                    cb(null,true)
                }
                else{
                    cb(new Error("only pdf allowed "))
                }

            }else{
                cb(new Error('There was an unknon error'))
            }
        }
    
})

const cpUpload = upload.fields([{ name: 'avatar', maxCount: 2 }, { name: 'gallery', maxCount: 1 }])
app.post('/profile',cpUpload,(req,res,next)=>{
console.log(req.files )
res.send('success')
})

app.use((err,req,res,next)=>{
    if(err){
        if(err instanceof multer.MulterError){
            res.status(500).send('There was an upload error')
        }else{
            res.status(500).send(err.message)
        }
    }else{
        res.send('success')
    }

})


app.listen(PORT,()=>console.log(`listening port : ${PORT}`))
