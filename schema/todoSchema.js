const mongoose = require('mongoose')
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false, // Optional
    },
    status: {
        type: String,
        enum: ['active', 'completed'], // Restricts to specific values
        default: 'active',
    },
    date: {
        type: Date,
        default: Date.now, // Automatically sets the current date
    },
});
//instance methods
todoSchema.methods ={
    findActive:()=>{
        return mongoose.model('Todo').find({status:"active"})
    },
    // findActiveCallback:(cb)=>{
    //     return mongoose.model('Todo').find({status:"active"},cb)
    // }
}
todoSchema.statics ={
    findJs:function(){
        return this.find({title:/js/i})
    }

}
todoSchema.query ={
    findByQuery:function(language){
        return this.find({title: new RegExp(language,'i')})
    }
}
module.exports = todoSchema
