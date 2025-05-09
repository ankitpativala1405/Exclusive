import { CartMethod } from "../api/cartmethod.js";
import { ExportCount } from "./cart.js";

const count = await ExportCount();
console.log("count", count);
document.getElementById("cart-count").innerText = `(${count})`;

document.getElementById("MovetoCart").addEventListener("click", () => {
  alert("cart moved");
});

 let item = await CartMethod.GetWishlist();
 console.log("wishlist items:", item);

