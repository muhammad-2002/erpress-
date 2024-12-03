const jwt = require('jsonwebtoken')
const verifyToken = async(req,res,next)=>{
    const {authorization} =req.headers
    console.log(authorization)
    try{
        
        const token =  authorization.split(" ")[1]
        console.log(token)
        const decoded =jwt.verify(token,process.env.Secret_key)
        const {username,userId} = decoded
        req.username =username;
        req.userId = userId;
      
        next()

    }catch(err){
        // res.status(500).json({
        //     message:"there was an error"
        // })
        next("authentication Failure!")
    }

}
module.exports = verifyToken