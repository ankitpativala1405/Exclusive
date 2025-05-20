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

  let WantData=JSON.parse(sessionStorage.getItem("ViewOrderDetail"))
  console.log(WantData.orderId);
  
  document.getElementsByTagName("h2")[0].innerHTML = `Order ID : ${WantData.orderId}`;
});

document.getElementById("ContactSeller").addEventListener("click",()=>{
  window.location.href="/PAGES/contact.html"
})
document.getElementById("ViewInvoice").addEventListener("click",()=>{
  alert("Your Invoice is Generating...")
})

const ShowDataOnDisplay=()=>{
  
}