const express=require("express");
const DbConnect = require("./config/dbconnect");
const app=express()
const cors=require("cors");
const router = require("./routes/userrouter");
app.use(cors())
require("dotenv").config()
app.use(express.json())

const PORT=process.env.PORT || 4000
app.use("/api/user",router)

app.listen(4000,()=>{
    console.log(`start listning onport->${PORT}....`);
    DbConnect()    
})
