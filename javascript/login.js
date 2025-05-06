import UserMethod from "../api/usermethod.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
import { GetValue } from "../public/helper.js";

document.getElementById("navbar").innerHTML=Navbar()
document.getElementById("footer").innerHTML=Footer()

document.getElementById("loginform").addEventListener("submit",async(e)=>{
    e.preventDefault()
    let user={
        email:GetValue("email"),
        password:GetValue("password")
    }

    console.log("user",user);
    
    islogin(user)
    // const req=await UserMethod.GetAll()
    // const res=await req.json()


    // if(req[0])
    // console.log("User logged:", req);
    // alert("login successful!");
    
})



const islogin = async (data) => {
    
    
    let users = await UserMethod.emailExists(data.email);
    console.log("users",users);


  
    // if (users.length === 0) {
    //   alert("User Not Found .....");
    //   return;
    // } else {
    //   if (users[0].password !== data.password) {
    //     alert("Incorrect password.");
    //     return;
    //   } else {
    //     alert("Logged in ... successfully!");
        // localStorage.setItem("loggedin", true);
        // localStorage.setItem("user", JSON.stringify(users[0]));
        // window.open("../index.html", "_self");
    //   }
    // }
  };