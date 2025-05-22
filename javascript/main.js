///navbar ///footer

import { CartMethod } from "../api/cartmethod.js";
import LoginMethod from "../api/loginmethod.js";
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
  let WishlistByUser = item.filter((user) => user.username == LsUser.username);

  let countitem = WishlistByUser.length;
  document.getElementById("wishlist-count").innerHTML = `(${countitem})`;
};
WishListCartCount();
navbarclassactive();

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

  //banner
  document.getElementById("BannerDays").textContent = "00";
  document.getElementById("BannerHours").textContent = String(hours).padStart(
    2,
    "0"
  );
  document.getElementById("BannerMinutes").textContent = String(
    minutes
  ).padStart(2, "0");
  document.getElementById("BannerSeconds").textContent = String(
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

const displayProductsTodaySell = (products) => {
  const container = document.getElementById("TodaySaleProducts");
  container.innerHTML = ""; // Clear first

  products.forEach((product, index) => {
    container.insertAdjacentHTML("beforeend", `
      <div class="product">
        <div id="discount">-30%</div>
        <img src="${product.img}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>
          <strong>₹${product.price}</strong>
          <span class="original-price">₹${product.mrp}</span>
        </p>
        <p class="rating">★★★★☆ (99)</p>
        <button class="add-to-cart AddToCartToday">Add To Cart</button>
      </div>
    `);
  });

  document.querySelectorAll(".AddToCartToday").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      addToCart(products[index]);
    });
  });
};


const randomFourProducts = getRandomProducts(ProductData, 4);
displayProductsTodaySell(randomFourProducts);

// BestSellingProducts

const displayBestSellingProducts = (products) => {
  document.getElementById("BestSellingProducts").innerHTML = "";

  products.map((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    const iconsDiv = document.createElement("div");
    iconsDiv.className = "product-icons";
    iconsDiv.innerHTML = `<i class="far fa-heart"></i><i class="far fa-eye"></i>`;

    const img = document.createElement("img");
    img.src = product.img;
    img.alt = product.name;

    const nameDiv = document.createElement("div");
    nameDiv.className = "product-name";
    nameDiv.textContent = product.name;

    const priceDiv = document.createElement("div");
    priceDiv.className = "price";
    priceDiv.innerHTML = `₹${product.price} <span class="old">₹${product.mrp}</span>`;

    const ratingDiv = document.createElement("div");
    ratingDiv.className = "rating";
    ratingDiv.innerHTML = `★★★★★ <span>(65)</span>`;

    const buttonDiv = document.createElement("div");
    buttonDiv.className = "product-btn";

    const button = document.createElement("button");
    button.className = "add-to-cart";
    button.textContent = "Add To Cart";
    button.addEventListener("click", async () => {
      addToCart(product);
    });

    buttonDiv.appendChild(button);

    productCard.append(iconsDiv, img, nameDiv, priceDiv, ratingDiv, buttonDiv);

    document.getElementById("BestSellingProducts").appendChild(productCard);
  });
};

const randomFiveProducts = getRandomProducts(ProductData, 5);
displayBestSellingProducts(randomFiveProducts);


//add to cart
const addToCart = async (product) => {
  let CartItem = await CartMethod.GetAll();
  let LsUser = JSON.parse(localStorage.getItem("user"));
  if (!LsUser) {
    alert("You Are Not Still loggedIn Please Login First...");
    return;
  }

  let MUser = await LoginMethod.GetAll();

  let LoggedUser = MUser.find((user) => user.username == LsUser.username);

  let LoggedUsername = LoggedUser.username;

  let IsExist = CartItem.find((item) => item.sku === product.sku);

  if (IsExist) {
    let sku = IsExist.sku;
    let quantity = IsExist.quantity;
    let upadteitem = {
      ...IsExist,
      username: LoggedUsername,
      quantity: quantity + 1,
    };
    await CartMethod.Update(sku, upadteitem);
    alert(`${product.name} quantity increased in cart`);
    location.reload();
  } else {
    let CartAdd = { ...product, username: LoggedUsername, quantity: 1 };
    await CartMethod.Post(CartAdd);
    alert(`${product.name} added to cart!`);
    location.reload();
  }
};

document.querySelectorAll(".category").forEach((category) => {
  category.addEventListener("click", (e) => {
    let value = e.currentTarget.innerText;
    console.log("value", value);

    sessionStorage.setItem("SelectedCategoryIndex", value);
    sessionStorage.setItem("WantOpenCategory",true)

    window.location.href="/PAGES/product.html"
  });
});
