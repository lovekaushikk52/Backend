const express=require("express");
const jwt=require("jsonwebtoken")
const router=express.Router();
const userModel=require("../models/user.model")

router.post("/create",async(req,res)=>{
    const token=req.cookies.token;

    if (!token){
       return res.status(401).json({
            message:"unauthorized user..."
        })
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const user=await userModel.findOne({
            _id:decoded.id
        })
        console.log(user)
    }

    catch(err){
        return res.status(401).json({
            message:"token is invalid",
        })
    }

    res.send("post created successfully...")
})



module.exports=router;

// agr token hoga to post create hoga 
// vrna unauthrized user hoga aur token tbhi create hota h
// jb user logged in hota h
