const cookieParser = require("cookie-parser")
const express=require("express")
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken");
const multer=require("multer")
const app=express()
const userModel=require("./models/user")
const postModel=require("./models/post");
const post = require("./models/post");
const crypto=require("crypto")
const path=require("path")

app.set("view engine","ejs")
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/images/uploads')
    },
    filename:function(req,file,cb){
        crypto.randomBytes(12,function(err,bytes){
            const fn=bytes.toString("hex") +path.extname(file.originalname)
            cb(null,fn)
        })
    }
})

const upload=multer({storage:storage})

app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/test",(req,res)=>{
    res.render("test")
})

app.post("/upload",upload.single("image"),(req,res)=>{
    console.log(req.file)
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

app.get('/like/:id',isLoggedIn,async(req,res)=>{ //protected route

    let post=await postModel.findOne({_id:req.params.id}).populate("user") //we get post id thats why we are using populate so we get real content

    if(post.likes.indexOf(req.user.userId)===-1){
        post.likes.push(req.user.userId)
    }
    else{
        post.likes.splice(post.likes.indexOf(req.user.userId),1);
    }
    await post.save()
    res.redirect("/profile")
})

app.get("/edit/:id",isLoggedIn,async(req,res)=>{

    let post=await postModel.findOne({_id:req.params.id}).populate('user')
    res.render("edit",{post})

})

app.post("/update/:id",isLoggedIn,async(req,res)=>{

    let post=await postModel.findOneAndUpdate({_id:req.params.id},{content:req.body.content})
    res.redirect("/profile")

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