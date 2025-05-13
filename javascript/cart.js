import { CartMethod } from "../api/cartmethod.js";
import LoginMethod from "../api/loginmethod.js";
import WishlistMethod from "../api/wishlistmethod.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("navbar").innerHTML = Navbar();
  const count = await ExportCartCount();
  document.getElementById("cart-count").innerText = `(${count})`;
  document.getElementById("footer").innerHTML = Footer();

  const tableBody = document.getElementById("tablebody");

  if (tableBody) {
    let CartItem = await CartMethod.GetAll();
    let LsUser = JSON.parse(localStorage.getItem("user"));
    console.log(LsUser);
    if (!LsUser) {
      alert("You Are Not Still loggedIn Please Login First...");
      return;
    }
    let MUser = await LoginMethod.GetAll();
    console.log("MUser", MUser);
    let LoggedUser = MUser.find((user) => user.username == LsUser.username);
    console.log("LoggedUser", LoggedUser);

    let UserCart = CartItem.filter((item) => item.username == LoggedUser.username);
    console.log("UserCart", UserCart);

    UiMaker(UserCart);
  }
});

const WishListCartCount = async () => {
  let item = await WishlistMethod.GetWishlist();
  let countitem = item.length;
  document.getElementById("wishlist-count").innerHTML = `(${countitem})`;
};
WishListCartCount();

let total = 0;
const UiMaker = (CartItem) => {
  total = 0;

  CartItem.forEach((item, index) => {
    let row = document.createElement("tr");

    // Product Info
    let td1 = document.createElement("td");
    let productInfoDiv = document.createElement("div");
    productInfoDiv.classList.add("product-info");

    let img = document.createElement("img");
    img.src = item.img;
    let span = document.createElement("span");
    span.textContent = item.name;

    productInfoDiv.appendChild(img);
    productInfoDiv.appendChild(span);
    td1.appendChild(productInfoDiv);
    row.appendChild(td1);

    // Price
    let td2 = document.createElement("td");
    td2.textContent = `₹${item.price}`;
    row.appendChild(td2);

    // Quantity Input
    let td3 = document.createElement("td");
    let input = document.createElement("input");
    input.type = "number";
    input.value = item.quantity;
    input.min = "1";
    input.max = "100";
    td3.appendChild(input);
    row.appendChild(td3);

    // Subtotal
    let td4 = document.createElement("td");
    let subtotal = item.price * item.quantity;
    td4.textContent = `₹${subtotal}`;
    row.appendChild(td4);

    total += subtotal;

    // Delete Button
    let td5 = document.createElement("td");
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.backgroundColor = "red";
    deleteBtn.style.color = "white";
    deleteBtn.style.border = "none";
    deleteBtn.style.padding = "5px 10px";
    deleteBtn.style.cursor = "pointer";
    td5.appendChild(deleteBtn);
    row.appendChild(td5);
    deleteBtn.addEventListener("click", async () => {
      await CartMethod.Delete(item.sku);
      alert(`${item.name} product Deleted`);
      location.reload();
    });

    // Quantity Change Listener
    input.addEventListener("input", () => {
      let newQty = parseInt(input.value);
      if (isNaN(newQty) || newQty < 1) newQty = 1;

      CartItem[index].quantity = newQty;

      const updatedSubtotal = newQty * item.price;
      td4.textContent = `₹${updatedSubtotal}`;

      // Update total
      let newTotal = 0;
      CartItem.forEach((i) => {
        newTotal += i.price * i.quantity;
      });

      document.getElementById("Totalshow").innerHTML = `₹${newTotal.toFixed(
        2
      )}`;
      document.getElementById("Grandtotal").innerHTML = `₹${(
        newTotal + 100
      ).toFixed(2)}`;
    });

    document.getElementById("tablebody").append(row);
  });

  // Initial Total Display
  document.getElementById("Totalshow").innerHTML = `₹${total.toFixed(2)}`;
  document.getElementById("Grandtotal").innerHTML = `₹${(total + 100).toFixed(
    2
  )}`;
};

export const ExportCartCount = async () => {
  let item = await CartMethod.GetAll();
  let countitem = item.length;
  return countitem;
};
