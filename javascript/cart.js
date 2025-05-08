import { CartMethod } from "../api/cartmethod.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";

document.getElementById("navbar").innerHTML=Navbar()
document.getElementById("footer").innerHTML=Footer()


let CartItem= await CartMethod.GetAll()
console.log(CartItem);

