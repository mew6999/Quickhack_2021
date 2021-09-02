const mongoose = require('mongoose');

const diary_schema = new mongoose.Schema({

    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type:String,
        required: true
    },
    dateCreated: { // store the date created in the form of yyyy/mm/dd
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: false
    },
    public:{
        type: Boolean,
        required: true,

    }

})

module.exports = mongoose.model('Diary', diary_schema, 'diary')