import { CartMethod } from "../api/cartmethod.js";
import LoginMethod from "../api/loginmethod.js";
import OrderMethod from "../api/ordermethod.js";
import WishlistMethod from "../api/wishlistmethod.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
import { ExportCartCount } from "./cart.js";

const WishListCartCount = async () => {
  let item = await WishlistMethod.GetWishlist();

  let LsUser = JSON.parse(localStorage.getItem("user"));
  let WishlistByUser = item.filter((user) => user.username == LsUser.username);

  let countitem = WishlistByUser.length;
  document.getElementById("wishlist-count").innerHTML = `(${countitem})`;
};
WishListCartCount();

const errordetail = (wrapperId, msg) => {
  const wrapper = document.querySelector(`#${wrapperId} .input-wrapper`);

  wrapper.querySelectorAll("p.error").forEach((p) => p.remove());

  const error = document.createElement("p");
  error.className = "error";
  error.textContent = msg;

  wrapper.appendChild(error);
};

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("navbar").innerHTML = Navbar();

  const count = await ExportCartCount();
  document.getElementById("cart-count").innerText = `(${count})`;

  const wishlist = await WishlistMethod.GetWishlist();
  document.getElementById("wishlist-count").innerText = `(${wishlist.length})`;

  document.getElementById("footer").innerHTML = Footer();
});

(async () => {
  let CartItem = await CartMethod.GetAll();
  let LsUser = JSON.parse(localStorage.getItem("user"));

  if (!LsUser) {
    alert("You Are Not Still loggedIn. Please Login First...");
    return;
  }

  let MUser = await LoginMethod.GetAll();

  let LoggedUser = MUser.find((user) => user.username === LsUser.username);

  let UserCart = CartItem.filter(
    (item) => item.username === LoggedUser.username
  );

  let WantItem = UserCart;
  let discountAmount = 0;
  let appliedCoupon = null;
  let subtotal = 0;

  const validCoupons = {
    SAVE10: 10, // 10% off
    FLAT50: 50, // ₹50 off
    FLAT100: 100, // ₹100 off
    SAVE15: 15, //15% off
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
      orderItemDiv.style.display = "flex";
      orderItemDiv.style.justifyContent = "space-between";
      orderItemDiv.style.alignItems = "center";
      orderItemDiv.style.marginBottom = "10px";

      const itemInfoDiv = document.createElement("div");
      itemInfoDiv.classList.add("item-info");

      const img = document.createElement("img");
      img.src = item.img || "https://via.placeholder.com/40";
      img.alt = item.name;
      img.style.width = "40px";
      img.style.height = "40px";
      img.style.marginRight = "10px";

      const nameSpan = document.createElement("span");
      nameSpan.textContent = item.name;

      itemInfoDiv.appendChild(img);
      itemInfoDiv.appendChild(nameSpan);

      const priceInfoDiv = document.createElement("div");
      priceInfoDiv.textContent = `Price: ₹${item.price} × ${quantity} = ₹${totalPrice}`;
      priceInfoDiv.style.textAlign = "right";

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
    const code = document
      .getElementById("couponCode")
      .value.trim()
      .toUpperCase();

    if (validCoupons[code]) {
      appliedCoupon = code;

      if (code.startsWith("SAVE")) {
        discountAmount = Math.floor((validCoupons[code] / 100) * subtotal);
      } else {
        discountAmount = validCoupons[code];
      }

      alert(`Coupon "${code}" applied! Discount: ₹${discountAmount}`);
      UiMaker(WantItem);
      errordetail(
        "coupon-wrapper",
        `Coupon "${code}" applied!!... Discount: ₹${discountAmount}`
      );
    } else {
      alert("Invalid coupon code.");
    }
  });

  // document.getElementById("GetOrder").addEventListener("click", async () => {
  //   const orderId = `ODR${Date.now()}`;
  //   let selectedPaymentInput = document.querySelector('input[name="payment"]:checked');
  //   if (!selectedPaymentInput) {
  //     alert("Please select a payment method.");
  //     return;
  //   }
  //   let SelectedPayment = selectedPaymentInput.value;

  //   const orderItemsWithId = WantItem.map((item) => ({
  //     ...item,
  //     orderId: orderId,
  //     date: new Date().toLocaleString(),
  //     status: "Pending",
  //     payment: SelectedPayment,
  //     total: item.price * (item.quantity || 1),
  //   }));

  //   const req = await CartMethod.Create(orderItemsWithId);
  //   const res = await req.json();

  //   alert(`Order successful! Order ID: ${orderId}`);
  //   // await CartMethod.DeleteAll();
  // });

  document.getElementById("GetOrder").addEventListener("click", async () => {
  const orderId = `ODR${Date.now()}`;
  let selectedPaymentInput = document.querySelector('input[name="payment"]:checked');

  if (!selectedPaymentInput) {
    alert("Please select a payment method.");
    return;
  }

  let SelectedPayment = selectedPaymentInput.value;

  const orderItemsWithId = WantItem.map((item) => ({
    ...item,
    orderId: orderId,
    date: new Date().toLocaleString(),
    status: "Pending",
    payment: SelectedPayment,
    total: item.price * (item.quantity || 1),
  }));

  // Use OrderMethod instead of CartMethod here
  const req = await OrderMethod.Create(orderItemsWithId);
  const res = await req.json();

  alert(`Order successful! Order ID: ${orderId}`);
  
  // Optionally clear the cart
  // await CartMethod.DeleteAll();
});

})();
