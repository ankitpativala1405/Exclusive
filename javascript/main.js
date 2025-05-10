///navbar ///footer

import WishlistMethod from "../api/wishlistmethod.js";
import CompanyPolicy from "../components/companypolicy.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
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
  let countitem = item.length;
  document.getElementById("wishlist-count").innerHTML = `(${countitem})`;
};
WishListCartCount();

function updateCountdownToMidnight() {
  const now = new Date();

  // Create a new Date object for midnight tonight
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0); // Midnight (00:00 of next day)

  // Calculate the difference in milliseconds
  const diffMs = midnight - now;

  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Update the DOM
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

// Run every second
setInterval(updateCountdownToMidnight, 1000);
updateCountdownToMidnight();
