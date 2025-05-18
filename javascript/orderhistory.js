import LoginMethod from "../api/loginmethod.js";
import OrderMethod from "../api/ordermethod.js";
import WishlistMethod from "../api/wishlistmethod.js";
import CompanyPolicy from "../components/companypolicy.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
import { ExportCartCount } from "./cart.js";

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("navbar").innerHTML = Navbar();
  document.getElementById("companypolicy").innerHTML = CompanyPolicy();
  document.getElementById("footer").innerHTML = Footer();

  const count = await ExportCartCount();
  document.getElementById("cart-count").innerText = `(${count})`;

  const ordersList = document.getElementById("ordersList");

  if (ordersList) {

    let OrderItem= await OrderMethod.GetAll()
    console.log("OrderItem",OrderItem);
    
    let LsUser = JSON.parse(localStorage.getItem("user"));
    console.log("LsUser",LsUser);
    
    if (!LsUser) {
      alert("You Are Not Still loggedIn Please Login First...");
      return;
    }
    let MUser = await LoginMethod.GetAll();
    console.log("MUser",MUser);
    
    let LoggedUser = MUser.find((user) => user.username == LsUser.username);
    console.log("LoggedUser",LoggedUser);
    

    let UserOrder = OrderItem.filter(
      (item) => item.username == LoggedUser.username
    );

    console.log("UserOrder",UserOrder);
    
    UiMaker(UserOrder);
  }
});

const WishListCartCount = async () => {
  let item = await WishlistMethod.GetWishlist();

  let LsUser = JSON.parse(localStorage.getItem("user"));
  let WishlistByUser = item.filter((user) => user.username == LsUser.username);

  let countitem = WishlistByUser.length;
  document.getElementById("wishlist-count").innerHTML = `(${countitem})`;
};
WishListCartCount();



const UiMaker = (orders) => {

  document.getElementById("ordersList").innerHTML=''

  orders.map((product) => {
    let div=document.createElement("div")
    div.setAttribute("class","order-card")
  
    let info = document.createElement("div");
    info.className = "info";

    let pOrderId = document.createElement("p");
    pOrderId.innerHTML = `<strong>Order ID</strong> #${product.orderId}`;

    let pSKU = document.createElement("p");
    pSKU.innerHTML = `<strong>SKU:</strong> ${product.sku}`;

    let pDate = document.createElement("p");
    pDate.innerHTML = `<strong>Date:</strong> ${product.date}`;

    let pStatus = document.createElement("p");
    pStatus.innerHTML = `<strong>Status:</strong> ${product.status}`;

    let pPrice = document.createElement("p");
    pPrice.innerHTML = `<strong>Price:</strong> ₹${product.price}`;

    let pQuantity = document.createElement("p");
    pQuantity.innerHTML = `<strong>Quantity:</strong> ${product.quantity}`;

    let pTotal = document.createElement("p");
    pTotal.innerHTML = `<strong>Total:</strong> ₹${product.total}`;

    let pPayment = document.createElement("p");
    pPayment.innerHTML = `<strong>Payment:</strong> ${product.payment}`;

    let actions = document.createElement("div");
    actions.className = "actions";

    let btnViewDetails = document.createElement("button");
    btnViewDetails.className = "btn btn-success btn-sm";
    btnViewDetails.textContent = "View Details";
    actions.appendChild(btnViewDetails);

    let btnReorder = document.createElement("button");
    btnReorder.className = "btn btn-success btn-sm";
    btnReorder.textContent = "Reorder";
    actions.appendChild(btnReorder);

    let thumbnail = document.createElement("div");
    thumbnail.className = "thumbnail";
    if (product.img) {
      thumbnail.style.backgroundImage = `url('${product.img}')`;
    }

    info.append(pOrderId,pSKU,pDate,pStatus,pPrice,pQuantity,pTotal,pPayment,actions)

    div.append(info,thumbnail);

     document.getElementById("ordersList").append(div)
  
  });

};
