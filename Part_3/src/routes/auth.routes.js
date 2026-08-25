const express=require("express")
const authController=require("../controllers/auth.controller")

const router=express.Router();

router.post("/register",authController.registerUser)

router.get("/test",(req,res)=>{
    console.log("cookies:",req.cookies)
    res.json({
        message:"test route",
        cookies:req.cookies
    })
})



module.exports=router;


// user will login to a server then a server will create a token and give it to user
// the token will be saved in cookie storage and every time user send a request the token will also go along with his request