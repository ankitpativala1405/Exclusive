import CompanyPolicy from "../components/companypolicy.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
import { ExportCartCount } from "./cart.js";

document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("navbar").innerHTML = Navbar();
  
    const count = await ExportCartCount();
    document.getElementById("cart-count").innerText = `(${count})`;
  
    document.getElementById("footer").innerHTML = Footer();
    document.getElementById("companypolicy").innerHTML=CompanyPolicy()
  });