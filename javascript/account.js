import WishlistMethod from "../api/wishlistmethod.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
import { ExportCartCount } from "./cart.js";

document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("navbar").innerHTML = Navbar();
  
    const count = await ExportCartCount();
    document.getElementById("cart-count").innerText = `(${count || 0})`;
  
    document.getElementById("footer").innerHTML = Footer();
  });

  const WishListCartCount = async () => {
  let item = await WishlistMethod.GetWishlist();

  let LsUser = JSON.parse(localStorage.getItem("user"));
  let WishlistByUser=item.filter((user)=>user.username == LsUser.username)

  let countitem = WishlistByUser.length;
  document.getElementById("wishlist-count").innerHTML = `(${countitem})`;
};
WishListCartCount();