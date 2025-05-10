import { CartMethod } from "../api/cartmethod.js";
import WishlistMethod from "../api/wishlistmethod.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
import { ExportCartCount } from "./cart.js";

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("navbar").innerHTML = Navbar();

  const count = await ExportCartCount();
  document.getElementById("cart-count").innerText = `(${count})`;

  document.getElementById("footer").innerHTML = Footer();
});
const WishListCartCount = async () => {
  let item = await WishlistMethod.GetWishlist();
  let countitem = item.length;
  document.getElementById("wishlist-count").innerHTML = `(${countitem})`;
};
WishListCartCount();

let WantItem = await CartMethod.GetAll();
let discountAmount = 0;
let appliedCoupon = null;
let subtotal = 0;

const validCoupons = {
  SAVE10: 10,
  FLAT50: 50,
  FLAT100: 100,
};

const UiMaker = (WantItem) => {
  const container = document.getElementById("want-container");
  container.innerHTML = "";

  subtotal = 0;

  WantItem.forEach((item) => {
    const quantity = item.quantity || 1;
    const totalPrice = item.price * quantity;
    subtotal += totalPrice;

    const orderItemDiv = document.createElement("div");
    orderItemDiv.classList.add("order-item");
    orderItemDiv.style.justifyContent = "space-between";
    orderItemDiv.style.alignItems = "center";

    const itemInfoDiv = document.createElement("div");
    itemInfoDiv.classList.add("item-info");

    const img = document.createElement("img");
    img.src = item.img || "https://via.placeholder.com/40";
    img.alt = item.name;

    const nameSpan = document.createElement("span");
    nameSpan.textContent = item.name;

    itemInfoDiv.appendChild(nameSpan);

    const priceInfoDiv = document.createElement("div");
    priceInfoDiv.textContent = `Price: ₹${item.price} * Qty: ${quantity} = Total: ₹${totalPrice}`;
    priceInfoDiv.style.textAlign = "Right";

    orderItemDiv.appendChild(itemInfoDiv);
    orderItemDiv.appendChild(priceInfoDiv);

    container.appendChild(orderItemDiv);
  });

  let shipping = 100;

  let total = subtotal - discountAmount + shipping;
  if (total < 0) total = 0;

  document.getElementById("subtotal").textContent = `₹${subtotal}`;
  document.getElementById("discount").textContent = `- ₹${discountAmount}`;
  document.getElementById("total").textContent = `₹${total}`;
};

UiMaker(WantItem);

document.getElementById("applyCoupon").addEventListener("click", () => {
  const code = document.getElementById("couponCode").value.trim().toUpperCase();

  if (validCoupons[code]) {
    appliedCoupon = code;

    if (code.startsWith("SAVE")) {
      discountAmount = Math.floor((validCoupons[code] / 100) * subtotal);
    } else {
      discountAmount = validCoupons[code];
    }

    alert(`Coupon "${code}" applied! Discount: ₹${discountAmount}`);
    UiMaker(WantItem);
  } else {
    alert("Invalid coupon code.");
  }
});

document.getElementById("GetOrder").addEventListener("click", async () => {
  let CartItem = await CartMethod.GetAll();
  console.log("CartItemsssss", CartItem);

  let req = await CartMethod.Create(CartItem);
  let res = await req.json();
  console.log("Ordered Item", res);
  alert("Order successful!");
  await CartMethod.DeleteAll();
});
