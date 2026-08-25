const mongoose=require("mongoose")

async function connectDB(){
    try{

        await mongoose.connect(process.env.MONGO_URI)
        console.log("database connected successfully")

    }
    catch(err){
        console.error("database connection error...")
    }
}

module.exports=connectDB;