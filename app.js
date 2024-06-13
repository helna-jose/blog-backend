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


app.post("/signIn",(req,res)=>{
    let input=req.body
    blogmodel.find({"email":req.body.email}).then(
        (response)=>{
           if(response.length>0){
            let dbpassword= response[0].password
            console.log(dbpassword)
            bcryptjs.compare(input.password,dbpassword,(error,isMatch)=>{
                if(isMatch){
                    res.json({"status":"success","userId":response[0]._Id})
            }else{
                res.json({"status":"incorrect"})
            }
        }
            )
        
           }
           else{
            res.json({"status":"user not found"})

           }
        }
    
    
    ).catch()
})




app.listen(8081,()=>{
    console.log("Server started")
})