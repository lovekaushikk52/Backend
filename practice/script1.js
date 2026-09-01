const cookieParser = require('cookie-parser');
const express=require('express')
const app=express();

const path=require("path")

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send("champion")
})

app.listen(3000)