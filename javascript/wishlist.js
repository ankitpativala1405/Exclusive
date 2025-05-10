import CompanyPolicy from "../components/companypolicy.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";

document.getElementById("companypolicy").innerHTML = CompanyPolicy();
document.getElementById("footer").innerHTML = Footer();
document.getElementById("navbar").innerHTML = Navbar();

document.getElementById("MovetoCart").addEventListener("click", () => {
  alert("cart moved");
});
