const express=require("express")
const authRoutes=require("./routes/auth.routes")
const postRoutes=require("./routes/post.routes")
const cookieParser=require("cookie-parser")

const app=express();
app.use(express.json()) //middleware
app.use(cookieParser())

app.use("/api/auth",authRoutes) //if we create any api using router we have to use this prefix
//  /api/auth/api-name
app.use('/api/posts',postRoutes)
module.exports=app;
