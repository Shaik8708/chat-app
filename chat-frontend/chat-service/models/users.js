const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        required:true,
        type:String
    },
    username: {
        required:false,
        type:String
    },
    password: {
        required: false,
        type: String
    },
})

module.exports = mongoose.model("users",userSchema)