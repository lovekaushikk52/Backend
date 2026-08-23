const mongoose=require("mongoose")

const postSchema=new mongoose.Schema({
    image:String,
    caption:String,
})

/* post={
         image:url which is a string
         caption:String   } */

const postModel=mongoose.model("post",postSchema)

module.exports=postModel;