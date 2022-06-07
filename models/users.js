const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true,
    },
    bio:{
        type: String,
        required: true,
    },
    ratings:{
        type: String,
        required: true,
    },
    image :{
        type: String,
        required: true,
    },
    dob :{
        type: String,
        required: true,
        // default: Date.now,
    },
})
module.exports = mongoose.model("User", userSchema);