import LoginMethod from "../api/loginmethod.js";
import OrderMethod from "../api/ordermethod.js";
import WishlistMethod from "../api/wishlistmethod.js";
import CompanyPolicy from "../components/companypolicy.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
import { ExportCartCount } from "./cart.js";

let filteredOrders = [];
let currentPage = 1;
const itemsPerPage = 10;

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("navbar").innerHTML = Navbar();
  document.getElementById("companypolicy").innerHTML = CompanyPolicy();
  document.getElementById("footer").innerHTML = Footer();

  const count = await ExportCartCount();
  document.getElementById("cart-count").innerText = `(${count})`;

  const ordersList = document.getElementById("ordersList");

  if (ordersList) {
    let OrderItem = await OrderMethod.GetAll();
    let LsUser = JSON.parse(localStorage.getItem("user"));

    if (!LsUser) {
      alert("You Are Not Still loggedIn Please Login First...");
      return;
    }

    let MUser = await LoginMethod.GetAll();
    let LoggedUser = MUser.find((user) => user.username == LsUser.username);

    filteredOrders = OrderItem.filter(
      (item) => item.username == LoggedUser.username
    );

    UiMaker(filteredOrders, currentPage);
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

const UiMaker = (orders, page = 1) => {
  document.getElementById("ordersList").innerHTML = "";
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = orders.slice(start, end);

  paginatedItems.forEach((product) => {
    let div = document.createElement("div");
    div.setAttribute("class", "order-card");

    let info = document.createElement("div");
    info.className = "info";

    info.innerHTML = `
      <p><strong>Order ID : </strong> ${product.orderId}</p>
      <p><strong>Product Name : </strong>${product.name}</p>
      <p><strong>SKU : </strong> ${product.sku}</p>
      <p><strong>Date : </strong> ${product.date}</p>
      <p><strong>Status : </strong> ${product.status}</p>
      <p><strong>Price : </strong> ₹${product.price}</p>
      <p><strong>Quantity : </strong> ${product.quantity}</p>
      <p><strong>Total : </strong> ₹${product.total}</p>
      <p><strong>Payment : </strong> ${product.payment}</p>
    `;

    let actions = document.createElement("div");
    actions.className = "actions";

    let btnViewDetails = document.createElement("button");
    btnViewDetails.className = "btn btn-sm btn-red";
    btnViewDetails.textContent = "View Details";
    btnViewDetails.style.backgroundColor = "#e53935";
    btnViewDetails.style.border = "none";
    btnViewDetails.style.color = "white";
    btnViewDetails.style.marginRight = "8px";
    btnViewDetails.addEventListener("click",()=>{
      sessionStorage.setItem("ViewOrderDetail", JSON.stringify(product));     
      alert(`opening ${product.name}`);
      window.location.href="/PAGES/orderdetail.html"
    })

    let btnReorder = document.createElement("button");
    btnReorder.className = "btn btn-sm btn-red";
    btnReorder.textContent = "Reorder";
    btnReorder.style.backgroundColor = "#e53935";
    btnReorder.style.border = "none";
    btnReorder.style.color = "white";
    btnReorder.addEventListener("click", () => {
      console.log(product);
      localStorage.setItem("ReorderItem",JSON.stringify(product)) 
      alert("srored")
    });

    actions.append(btnViewDetails, btnReorder);
    info.append(actions);

    let thumbnail = document.createElement("div");
    thumbnail.className = "thumbnail";
    if (product.img) {
      thumbnail.style.backgroundImage = `url('${product.img}')`;
    }

    div.append(info, thumbnail);
    document.getElementById("ordersList").append(div);
  });

  createPagination();
};

const createPagination = () => {
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  document.getElementById("pagination").innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.innerHTML = i;
    if (i === currentPage) {
      pageBtn.setAttribute("class", "btn btn-sm me-1 btn-dark");
    } else {
      pageBtn.setAttribute("class", "btn btn-sm me-1 btn-outline-dark");
    }

    pageBtn.addEventListener("click", () => {
      currentPage = i;
      UiMaker(filteredOrders, currentPage);
    });

    document.getElementById("pagination").appendChild(pageBtn);
  }
};

//filter by status
document.getElementById("statusSelect").addEventListener("change", () => {
  let filter = document.getElementById("statusSelect").value;
  if (filter === "all") {
    UiMaker(filteredOrders, currentPage);
  } else {
    let temp = filteredOrders.filter(
      (ele) => ele.status.toString() === filter.toString()
    );
    UiMaker(temp, currentPage);
  }
});

//filter by payment method
document.getElementById("methodSelect").addEventListener("change", () => {
  let filter = document.getElementById("methodSelect").value;

  if (filter === "all") {
    UiMaker(filteredOrders, currentPage);
  } else {
    let temp = filteredOrders.filter(
      (ele) => ele.payment.toString() === filter.toString()
    );
    UiMaker(temp, currentPage);
  }
});

//sort by latest-oldest
document.getElementById("sortSelect").addEventListener("change", () => {
  const sortValue = document.getElementById("sortSelect").value;
  console.log("sortValue", sortValue);

  if (sortValue === "latest") {
    filteredOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortValue === "oldest") {
    filteredOrders.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  UiMaker(filteredOrders, currentPage);
});

//search by Product-Name or SKU or OrderID
document.getElementById("orderSearch").addEventListener("input", (e) => {
  let SearchValue = e.target.value.trim();
  console.log("SearchValue", SearchValue);
  for (let i = 0; i < filteredOrders.length; i++) {
    let temp = filteredOrders.filter( (ele) => ele.orderId.toString().includes(SearchValue) || ele.sku.toLowerCase().includes(SearchValue.toLowerCase()) ||
    ele.name.toLowerCase().includes(SearchValue.toLowerCase())
    );
    UiMaker(temp , currentPage);
  }
});
