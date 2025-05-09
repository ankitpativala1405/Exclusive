import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
import { ExportCount } from "./cart.js";

document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("navbar").innerHTML = Navbar();
  
    const count = await ExportCount();
    document.getElementById("cart-count").innerText = `(${count})`;
  
    document.getElementById("footer").innerHTML = Footer();
  });
