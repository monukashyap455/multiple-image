const mongoose = require("mongoose")

const imageSchema = new mongoose.Schema({
    userId:{
        type:"ObjectId"
    },
    set :{
        type:String,
        required:true
    },
    
    name: {
        type: String,
        required: true
    },
   
    discription: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,

    },
});

module.exports = new mongoose.model("image", imageSchema);