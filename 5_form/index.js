const express=require("express")
const app=express()
const path=require('path')
//parsers and middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
//dirname gives current path and whole line wil, tell us that wee will find all of our static files in public
app.set('view engine','ejs')

app.get("/",(req,res)=>{
    // res.send("chal raha h")
    res.render("index")
})

app.get("/profile/:username",(req,res)=>{
    res.send(`welcome, ${req.params.username}`)
})

app.listen(3000,()=>{
    console.log("code is running")
})

//setup ejs