import LoginMethod from "../api/loginmethod.js";
import OrderMethod from "../api/ordermethod.js";
import Navbar from "../components/navbar.js";
import { ExportCartCount } from "./cart.js";

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("navbar").innerHTML = Navbar();

  const count = await ExportCartCount();
  document.getElementById("cart-count").innerText = `(${count})`;

});

(async () => {
  let allOrders = await OrderMethod.GetAll()
  let sessionData=JSON.parse(localStorage.getItem("ReorderItem"))

  let matchedOrders = allOrders.filter((order) =>order.username === sessionData.username && order.orderId === sessionData.orderId &&
   order.sku === sessionData.sku);

   console.log("matchedOrders",matchedOrders);
   
  let LsUser = JSON.parse(localStorage.getItem("user"));
  if (!LsUser) {
    alert("You Are Not Still loggedIn. Please Login First...");
    return;
  }

  let MUser = await LoginMethod.GetAll();

  let LoggedUser = MUser.find((user) => user.username === LsUser.username);

})()