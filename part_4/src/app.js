const express=require("express")
const validationRules=require('./middlewares/validation.middlewares')

const app=express()
app.use(express.json());


// app.get("/",(req,res)=>{
//     res.status(200).json({message:"hello,world!"})
// })

app.post("/register",validationRules.registerUserValidationRules,(req,res)=>{
    const {username,email,password}=req.body;

    res.status(201).json({message:"user registered successfully",user:{
        username,email
    }})
})

module.exports=app;
