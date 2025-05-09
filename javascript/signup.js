import UserMethod from "../api/usermethod.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
import { GetValue } from "../public/helper.js";
import { ExportCount } from "./cart.js";


document.getElementById("navbar").innerHTML = Navbar();
document.getElementById("footer").innerHTML = Footer();

document.getElementById("signupform").addEventListener("submit", async (e) => {
  e.preventDefault();

  let user = {
    name: GetValue("name"),
    email: GetValue("email"),
    number: GetValue("number"),
    password: GetValue("password"),
  }; 
  console.log(user);

  const req= await UserMethod.create(user)
  const res=await req.json()
  console.log("User created:", res);
  alert("Signup successful!");
}); 

let count=ExportCount()
console.log("count",count);



 
