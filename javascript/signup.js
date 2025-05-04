import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
import { GetValue } from "../public/helper.js";

document.getElementById("navbar").innerHTML = Navbar();
document.getElementById("footer").innerHTML = Footer();


document.getElementById("signupform").addEventListener("submit",(e)=>{
    e.preventDefault()

    let user={
        name:GetValue("name"),
        email:GetValue("email"),
        number:GetValue("number"),
        password:GetValue("password")
    } 
})
