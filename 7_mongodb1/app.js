const express=require("express")
const app=express()


app.use(express.json())
const userModel=require('./usermodel')


app.get("/",(req,res)=>{
    res.send("hey")
})

app.get("/create",async (req,res)=>{
    let createdUser=await userModel.create({
        name:"ramu",
        email:"ramu@gmail.com", //asynchronous code
        username:"rishika"
    })

    res.send(createdUser)
})

app.get('/update',async (req,res)=>{

    // userModel.findOneUpdate(findone,update,{new:true})
    let updatedUser=await userModel.findOneAndUpdate({username:"ramraj"},{name:"rishu raj"},{new:true})

    res.send(updatedUser)
})

app.get("/read",async(req,res)=>{

    let users=await userModel.find()
    res.send(users)
})

app.get('/delete',async (req,res)=>{
    let users=await userModel.findOneAndDelete({name:"ram"})
    res.send(users)
})
app.listen(3000)