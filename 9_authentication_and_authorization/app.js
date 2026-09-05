const express=require("express")
const app=express()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const cookieParser=require("cookie-parser")

app.use(cookieParser())

// app.get("/",(req,res)=>{
//     // res.cookie("name","love")
//     // res.send("hey")

//     // bcrypt.genSalt(10,function(err,salt){
//     //     bcrypt.hash("hellomoto",salt,function(err,hash){
//     //         console.log(hash)
//     //     })
//     // })

//     bcrypt.compare("hellomoto","$2b$10$7CbpvTXQIWg8QoHfL4FkduvpUSAM.3KJ1p85cfzBEf18D8pzczeYm",function(err,result){
//         console.log(result)
//     })
// })


app.get("/",(req,res)=>{
    let token=jwt.sign({email:"love@gmail.com"},"secret")
    res.send("hello")
    res.cookie("token",token)
    console.log(token)
})

app.get("/read",(req,res)=>{
    res.send("read page")
    let data=jwt.verify(req.cookies.token,"secret")
    console.log(data)
})

app.listen(3000)