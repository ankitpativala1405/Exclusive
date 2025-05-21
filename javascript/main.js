///navbar ///footer

import WishlistMethod from "../api/wishlistmethod.js";
import CompanyPolicy from "../components/companypolicy.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
import ProductData from "../public/productdata.js";
import { navbarclassactive } from "../utils/navbarclassactive.js";
import { ExportCartCount } from "./cart.js";

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("navbar").innerHTML = Navbar();

  const count = await ExportCartCount();
  document.getElementById("cart-count").innerText = `(${count})`;

  document.getElementById("footer").innerHTML = Footer();
  document.getElementById("companypolicy").innerHTML = CompanyPolicy();
});

const WishListCartCount = async () => {
  let item = await WishlistMethod.GetWishlist();

  let LsUser = JSON.parse(localStorage.getItem("user"));
  let WishlistByUser=item.filter((user)=>user.username == LsUser.username)

  let countitem = WishlistByUser.length;
  document.getElementById("wishlist-count").innerHTML = `(${countitem})`;
};
WishListCartCount();
navbarclassactive()

function updateCountdownToMidnight() {
  const now = new Date();

  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0); 

  const diffMs = midnight - now;

  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  document.getElementById("SalesShowDay").textContent = "00";
  document.getElementById("SalesShowHour").textContent = String(hours).padStart(
    2,
    "0"
  );
  document.getElementById("SalesShowMinute").textContent = String(
    minutes
  ).padStart(2, "0");
  document.getElementById("SalesShowSecond").textContent = String(
    seconds
  ).padStart(2, "0");
}

setInterval(updateCountdownToMidnight, 1000);
updateCountdownToMidnight();

let data = ProductData;

function getRandomProducts(data, count) {
  let Random = data.sort(() => 0.5 - Math.random());
  return Random.slice(0, count);
}

const displayProducts = (products) => {
  const container = document.getElementById("TodaySaleProducts");
  container.innerHTML = ""; // Clear first

  products.forEach((product) => {
    container.insertAdjacentHTML("beforeend", `
      <div class="product">
        <div id="discount">-30%</div>
        <img src="${product.img}" alt="" />
        <h3>${product.name}</h3>
        <p>
          <strong>₹${product.price}</strong>
          <span class="original-price">₹${product.mrp}</span>
        </p>
        <p class="rating">★★★★☆ (99)</p>
        <button class="add-to-cart">Add To Cart</button>
      </div>
    `);
  });
};

const randomFourProducts = getRandomProducts(ProductData, 4);
displayProducts(randomFourProducts);
