import { CartMethod } from "../api/cartmethod.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
import { ExportCount } from "./cart.js";

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("navbar").innerHTML = Navbar();

  const count = await ExportCount();
  document.getElementById("cart-count").innerText = `(${count})`;

  document.getElementById("footer").innerHTML = Footer();
});

let WantItem = await CartMethod.GetAll();
console.log("WantItem", WantItem);

const UiMaker = (WantItem) => {
  const container = document.getElementById("want-container");
  container.innerHTML = "";

  let subtotal = 0;

  WantItem.forEach((item) => {
    const quantity = item.quantity || 1;
    const totalPrice = item.price * quantity;
    subtotal += totalPrice;

    const orderItemDiv = document.createElement("div");
    orderItemDiv.classList.add("order-item");
    orderItemDiv.style.justifyContent = "space-between";
    orderItemDiv.style.alignItems = "center";

    // Left: Item info (image + name)
    const itemInfoDiv = document.createElement("div");
    itemInfoDiv.classList.add("item-info");

    const img = document.createElement("img");
    img.src = item.img || "https://via.placeholder.com/40";
    img.alt = item.name;

    const nameSpan = document.createElement("span");
    nameSpan.textContent = item.name;

    //   itemInfoDiv.appendChild(img);
    itemInfoDiv.appendChild(nameSpan);

    // Right: Pricing info
    const priceInfoDiv = document.createElement("div");
    priceInfoDiv.textContent = `Price:₹${item.price}*Qty: ${quantity}=Total: ₹${totalPrice}`;
    priceInfoDiv.style.textAlign = "Right";

    // Add to container
    orderItemDiv.appendChild(itemInfoDiv);
    orderItemDiv.appendChild(priceInfoDiv);

    container.appendChild(orderItemDiv);
  });

  // Update subtotal and total
  document.getElementById("subtotal").textContent = `₹${subtotal}`;
  document.getElementById("total").textContent = `₹${subtotal + 100}`;
};

UiMaker(WantItem);

document.getElementById("GetOrder").addEventListener("click", async () => {
  let CartItem = await CartMethod.GetAll();
  console.log("CartItemsssss", CartItem);

  let req=await CartMethod.Create(CartItem)
  let res = await req.json();
  console.log("Ordered Item", res);
  alert("Order successful!");
  await CartMethod.DeleteAll()
});
