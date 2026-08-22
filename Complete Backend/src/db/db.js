const mongoose=require("mongoose")

async function connectDB(){

    //mongoose.connect will connect to database it connect to the name given if not present it will create a databse with tht name
    await mongoose.connect("mongodb+srv://yt:2fQJHP9rsGLXvUs2@yt-complete-backend.xtge0xx.mongodb.net/halley") //will connect to a database
    //unit net is our uri and after that halley is our db name

    console.log("connected to db..")

}

module.exports=connectDB