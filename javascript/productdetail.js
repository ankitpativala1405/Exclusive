import WishlistMethod from "../api/wishlistmethod.js";
import CompanyPolicy from "../components/companypolicy.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
import ProductData from "../public/productdata.js";
import { ExportCartCount } from "./cart.js";

// Product gallery switching logic
document.querySelectorAll(".product-gallery-thumb").forEach(function (thumb) {
  thumb.addEventListener("click", function () {
    document.getElementById("mainProductImage").src = this.dataset.large;
    document
      .querySelectorAll(".product-gallery-thumb")
      .forEach((t) => t.classList.remove("active"));
    this.classList.add("active");
  });
});

document.getElementById("btn-decrease").onclick = function () {
  var qty = document.getElementById("qty-input");
  qty.value = Math.max(1, parseInt(qty.value, 10) - 1);
};
document.getElementById("btn-increase").onclick = function () {
  var qty = document.getElementById("qty-input");
  qty.value = parseInt(qty.value, 10) + 1;
};

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("navbar").innerHTML = Navbar();

  const count = await ExportCartCount();
  document.getElementById("cart-count").innerText = `(${count})`;

  document.getElementById("footer").innerHTML = Footer();
  document.getElementById("companypolicy").innerHTML = CompanyPolicy();

    // Render the product view
  let ViewProductDetail = JSON.parse(localStorage.getItem("ViewProductDetail"));
  let FindProduct = ProductData.find(product => product.sku == ViewProductDetail.sku);
  document.getElementById("FindProductview").innerHTML = FindProductView(FindProduct);
});

const WishListCartCount = async () => {
  let item = await WishlistMethod.GetWishlist();

  let LsUser = JSON.parse(localStorage.getItem("user"));
  console.log("LuUSer", LsUser.username);
  let WishlistByUser=item.filter((user)=>user.username == LsUser.username)

  let countitem = WishlistByUser.length;
  document.getElementById("wishlist-count").innerHTML = `(${countitem})`;
};
WishListCartCount();
document.getElementById("companypolicy").innerHTML=CompanyPolicy()

let ViewProductDetail=JSON.parse(localStorage.getItem("ViewProductDetail"))
console.log("ViewProductDetail",ViewProductDetail.sku);

let data = ProductData;
console.log("data",data[0].sku);

let FindProduct=data.find((product)=>product.sku == ViewProductDetail.sku)
console.log("FindProduct",FindProduct);

//give me UiMaker in "FindProductview"
function FindProductView(product) {
  if (!product) {
    return `<div class="product-not-found">Product not found.</div>`;
  }

  return `
    <div class="product-detail-container">
      <div class="product-images">
        <img id="mainProductImage" src="${product.images[0].large}" alt="${product.name}" class="main-image" />
        <div class="product-gallery">
          ${product.images.map((img, index) => `
            <img 
              src="${img.thumb}" 
              data-large="${img.large}" 
              class="product-gallery-thumb ${index === 0 ? 'active' : ''}" 
              alt="Thumbnail ${index + 1}" 
            />
          `).join('')}
        </div>
      </div>
      <div class="product-info">
        <h1 class="product-title">${product.name}</h1>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <p class="product-description">${product.description}</p>
        <div class="quantity-controls">
          <button id="btn-decrease">-</button>
          <input type="text" id="qty-input" value="1" readonly />
          <button id="btn-increase">+</button>
        </div>
        <button class="add-to-cart-btn">Add to Cart</button>
        <button class="add-to-wishlist-btn">Add to Wishlist</button>
      </div>
    </div>
  `;
}

document.getElementById("FindProductview").textContent = FindProductView(FindProduct);
