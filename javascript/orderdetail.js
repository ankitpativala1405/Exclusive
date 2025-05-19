import CompanyPolicy from "../components/companypolicy.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
import { ExportCartCount } from "./cart.js";

document.getElementById("navbar").innerHTML = Navbar();
document.getElementById("companypolicy").innerHTML = CompanyPolicy();
document.getElementById("footer").innerHTML = Footer();

document.addEventListener("DOMContentLoaded", async () => {

  const count = await ExportCartCount();
  document.getElementById("cart-count").innerText = `( ${count} )`;

  
});
