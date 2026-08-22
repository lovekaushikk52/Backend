const mongoose=require("mongoose");

//schema is created so that we can tell which kind of db we wanna create
const noteSchema=new mongoose.Schema({
    title:String,
    description:String,
    // age:Number,
    // dob:Date
})

const noteModel=mongoose.model("note",noteSchema)

// if we have to perform crud operations we have to create noteModel

module.exports=noteModel