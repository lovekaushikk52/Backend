require ('dotenv').config(); //used to fetch data from .env file

const app=require("./src/app")
const connectDB=require("./src/db/db")

connectDB();

app.listen(3000,()=>{
    console.log("Our server is started.....")
})