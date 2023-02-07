const mongoose = require('mongoose')

const NotesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    Note: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true,
        default: 'general'
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Notes',NotesSchema)