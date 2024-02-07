const mongoose=require('mongoose');

const messageSchema = new mongoose.Schema({
    messageFrom: {
        required:false,
        type:String
    },
    messageTo: {
        required:true,
        type:String
    },
    sentTime: {
        required: false,
        type: Number
    },
    message: {
        required: false,
        type: String
    },
})

module.exports = mongoose.model("messages",messageSchema)