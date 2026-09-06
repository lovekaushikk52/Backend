const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/testingDatabase")

const userSchema=mongoose.Schema({
    username:String,
    email:String,
    age:Number,
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post' //posts is array of id containing reference of other model post
    }],
})

module.exports=mongoose.model("user",userSchema)