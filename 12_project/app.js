const cookieParser = require("cookie-parser")
const express=require("express")
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken");
const app=express()
const userModel=require("./models/user")
const postModel=require("./models/post")

app.set("view engine","ejs")
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.render("index")
})

app.get('/login',(req,res)=>{
    res.render("login")
})

//protected route
app.get('/profile',isLoggedIn,async(req,res)=>{ //protected route
    let user=await userModel.findOne({email:req.user.email}).populate("posts") //we get post id thats why we are using populate so we get real content
    console.log(user)
    res.render("profile",{user})
})

app.post('/post',isLoggedIn,async(req,res)=>{ //protected route
    let user=await userModel.findOne({email:req.user.email})

    let {content}=req.body;
    let post=await postModel.create({
        user:user._id,
        content,
    })
    user.posts.push(post._id);
    await user.save() //coz we are manually saving post.id into users
    res.redirect("/profile")
})

app.post("/register",async(req,res)=>{
    let {email,password,username,name,age}=req.body
    
    let user=await userModel.findOne({email});

    if (user){
        return res.status(500).send("user already registered")
    }

    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async(err,hash)=>{
           let user=await userModel.create({
                username,
                password:hash,
                name,
                age,
                email
            })
            let token=jwt.sign({email:email,userId:user._id},"3ab1ca38148bc9fbc075a7478454714da7b35608a88637b1b19558c62470e2bb");
            res.cookie("token",token)
            res.send("registered")
        })
    })
})

app.post("/login",async(req,res)=>{
    let {email,password}=req.body
    
    let user=await userModel.findOne({email});

    if (!user){
        return res.status(500).send("Something Went Wrong")
    }
    bcrypt.compare(password,user.password,(err,result)=>{
        if (result) {
            let token=jwt.sign({email:email,userId:user._id},"3ab1ca38148bc9fbc075a7478454714da7b35608a88637b1b19558c62470e2bb");
            res.cookie("token",token)
            res.status(200).redirect("/profile")
        }

        else res.redirect("/login")
    })

})

app.get("/logout",(req,res)=>{
    res.cookie("token","")
    res.redirect("/login")
})

//middleware
function isLoggedIn(req,res,next){
    if(req.cookies.token==="") res.redirect("/login")

    else{
        let data=jwt.verify(req.cookies.token,"3ab1ca38148bc9fbc075a7478454714da7b35608a88637b1b19558c62470e2bb")
        req.user=data;
        next()
    }
}

app.listen(3000)