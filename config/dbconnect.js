const mongoose=require("mongoose")


const DbConnect=async()=>{
    await mongoose.connect("mongodb+srv://Exclusive:Exclusive@exclusive.rqiveuf.mongodb.net/?retryWrites=true&w=majority&appName=Exclusive")
    console.log(`Mongoose connected ..... 
        `);;
    
}

module.exports=DbConnect