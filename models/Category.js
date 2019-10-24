const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        unique: [true, 'This category already exist']
    }
});


module.exports = mongoose.model('Category', categorySchema);