const express=require("express")
const app=express()
const userModel=require("./models/user")
const postModel=require("./models/post")

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hey")
})

app.get("/create",async(req,res)=>{
    // let{username,email,age,posts}=req.body;
    let createdUser=await userModel.create({
        username:"love kaushik",
        email:"love@email.com",
        age:21,
    })
    res.send(createdUser)
})

app.get("/post/create",async(req,res)=>{

    let post =await postModel.create({
        postdata:"hello kaise ho saare log",
        user:"6a9cd1930bf1fe2611cb0bc8"
    })

    let user=await userModel.findOne({_id:"6a9cd1930bf1fe2611cb0bc8"})
    user.posts.push(post._id)
    await user.save();

    res.send({post,user})
})

app.listen(3000)