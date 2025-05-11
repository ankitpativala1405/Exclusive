import WishlistMethod from "../api/wishlistmethod.js";
import CompanyPolicy from "../components/companypolicy.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
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
});

const WishListCartCount = async () => {
  let item = await WishlistMethod.GetWishlist();
  let countitem = item.length;
  document.getElementById("wishlist-count").innerHTML = `(${countitem})`;
};
WishListCartCount();
document.getElementById("companypolicy").innerHTML=CompanyPolicy()