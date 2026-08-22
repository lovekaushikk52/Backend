const express=require("express")
const noteModel=require("./models/note.model")

const app=express()
app.use(express.json())


/* note={title,description} */

app.post("/notes",async(req,res)=>{

    const data=req.body
    
    await noteModel.create({
        title:data.title,
        description:data.description,
    })
    res.status(201).json({
        message:"note created"
    })
})

app.get("/notes",async(req,res)=>{

    const notes=await noteModel.find() // always returns an array

    // const notes=await noteModel.findOne({
    //     title:"title 1"   //find note with title1
    // })
    /* find and find one both are used to use cnditin but in case of no element found
    find will give [] empty array whereas
    findOne will give null */

    res.status(200).json({
        message:"notes fetched successfully",
        notes:notes
    })
})

app.delete("/notes/:index",async(req,res)=>{

    const id=req.params.id

    await noteModel.findOneAndDelete({
        _id:id
    })

    res.status(200).json({
        message:"note deleted successfully"
    })
})

app.patch("/notes/:id",async(req,res)=>{
    const id=req.params.id
    const description=req.body.description

    await noteModel.findOneAndUpdate({_id:id},{description:description}) //first one will tell which on the basis on wht we fetch and second one will tells wht to update

    res.status(200).json({
        message:"note updated successfully..."
    })
})

module.exports=app;