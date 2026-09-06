const express=require("express")
const path=require("path")
const jwt=require("jsonwebtoken")
const cookieParser=require("cookie-parser")
const bcrypt=require("bcrypt")

const userModel=require("./models/user")
const app=express()

app.set("view engine","ejs")
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))

app.get("/",(req,res)=>{
    res.render('index')
})

app.post("/create",(req,res)=>{
    let {username,email,password,age}=req.body;
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async(err,hash)=>{
            let createdUser=await userModel.create({
            username,
            email,
            password:hash,
            age
        })
        let token=jwt.sign({email},"37b1076825fa7f715ed0459d87998379aa7fd4048f7802de5610989ec78602a1")
        res.cookie("token",token)

        res.send(createdUser)
        })
    })
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.post("/login",async(req,res)=>{
    let user=await userModel.findOne({email:req.body.email})
    if(!user){
        res.send("something went wrong")
    }
    
    bcrypt.compare(req.body.password,user.password,function(err,result){
        if (result){
            let token=jwt.sign({email:user.email},"37b1076825fa7f715ed0459d87998379aa7fd4048f7802de5610989ec78602a1")
            res.cookie("token",token)
            res.send("u can login")
        }
        else res.send("something went wrong")
    })
})

app.get("/logout",(req,res)=>{
    res.token("token","")
    res.redirect("/")
})

app.listen(3000)