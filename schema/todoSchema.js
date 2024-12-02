const mongoose = require('mongoose')
const todoSchema = mongoose.Schema({
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

module.exports = todoSchema
