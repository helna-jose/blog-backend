const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const bcryptjs=require("bcryptjs")
const{blogmodel}=require("./models/blog")

const app=express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://helnajose:helnamongodb@cluster0.cup42.mongodb.net/facultydb?retryWrites=true&w=majority&appName=Cluster0")

const generateHashedpassword=async (password)=>
    {
        const salt=await bcryptjs.genSalt(10)
        return bcryptjs.hash(password,salt)
    }

app.post("/signUp",async(req,res)=>{
    let input=req.body
    let hashedpassword=await generateHashedpassword(input.password)
    console.log(hashedpassword)
    input.password=hashedpassword
    let blog=new blogmodel(input)
    blog.save()

    res.json({"status":"success"})
})



app.listen(8081,()=>{
    console.log("Server started")
})