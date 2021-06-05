
const mongoose = require('mongoose');

const user = mongoose.model('user',new mongoose.Schema({
    username: {
        type : String,
        required:true,
        minlength:5,
        maxlength:10
    },
    password: {
        type:String,
        required:true
    }

}));

module.exports.user = user;