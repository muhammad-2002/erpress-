const express = require('express')

const mongoose = require('mongoose')
const todoSchema = require('../schema/todoSchema')
const router = express.Router()
const Todo = new mongoose.model('Todo',todoSchema)

router.get('/activeInstance',async(req,res)=>{
    const newTodo = new Todo()
    const resp = await newTodo.findActive()
    res.status(200).json({
        resp,
    })
    
});


//statics method  
router.get('/js',async(req,res)=>{
    
    const resp = await Todo.findJs()
    res.status(200).json({
        resp,
    })
    
});
router.get('/language',async(req,res)=>{
    
    const resp = await Todo.find().findByQuery("react")
    res.status(200).json({
        resp,
    })
    
});

// router.get('/active-callback',(req,res)=>{
//     const newTodo = new Todo()
//      newTodo.findActiveCallback((err,data)=>{
//             res.status(500).json({
//                 data
//             })
//     })
   
    
// });
router.get('/',async(req,res)=>{
    try{
        const todo = await Todo.find({status:'active'}).select({
            _id:0,
            date:0
        }).limit(1)
        res.status(200).json({
            data: todo,
        });
    
    
        } catch (err) {
            res.status(500).json({ message: 'There was an error', error: err.message });
        }
    
});

router.get('/:id',async(req,res)=>{
    try{
    const todo = await Todo.findOne()
    res.status(200).json({
        data: todo,
    });
    } catch (err) {
        res.status(500).json({ message: 'There was an error', error: err.message });
    }
})
router.post('/', async (req, res) => {
    try {
      
        const newTodo = new Todo(req.body);
         await newTodo.save();
        res.status(200).json({
            message: 'Todo was inserted successfully',
        });
    } catch (err) {
        res.status(500).json({ message: 'There was an error', error: err.message });
    }
});

router.post('/all', async (req, res) => {
    const todos = req.body; 
    try {
        const savedTodos = await Todo.insertMany(todos);
        res.status(200).json({
            message: "Successfully inserted todos",
            data: savedTodos
        });
    } catch (err) {
        res.status(500).json({
            error: 'Error inserting todos',
            details: err.message
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            { _id: req.params.id }, // Filter
            { $set: { status: 'active' } }, // Update
            { new: true } // Return the updated document
        );

        if (!updatedTodo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        res.status(200).json({
            message: "Successfully updated",
            data: updatedTodo
        });
    } catch (err) {
        res.status(500).json({
            error: 'Error updating the todo',
            details: err.message
        });
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        await Todo.deleteOne({_id:req.params.id})
        res.status(500).json({
            message:"successfully deleted.."
        })
    }catch(err){
        res.status(500).json({
            error: 'Error inserting todos',
            details: err.message
        });
    }
})

module.exports = router