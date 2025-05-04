const DbConnect = require("./config/dbconnect");
const mongoose=require("mongoose")
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
require("dotenv").config();

const PORT = process.env.PORT || 4000;
const router = require("./routes/userrouter");
const User = require("./model/users");
app.use("/api/user", router);

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/user",async(request,response)=>{
    const {name,email,number,password}=request.body
    const user= new User({name,email,number,password})
    await user.save()
    response.status(201).json()

})





// app.post("/signup", async (req, res) => {
//         const { name, email, number, password } = req.body;
//         const user = new User({ name, email, number, password });
//         await user.save();
//         res.status(201).json({ message: "User registered successfully" });

// });

app.listen(PORT, () => {
  console.log(`start listning onport->${PORT}....`);
  DbConnect();
});
