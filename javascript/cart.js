import { CartMethod } from "../api/cartmethod.js";
import LoginMethod from "../api/loginmethod.js";
import WishlistMethod from "../api/wishlistmethod.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("navbar").innerHTML = Navbar();
  const count = await ExportCartCount();
  document.getElementById("cart-count").innerText = `(${count || 0})`;
  document.getElementById("footer").innerHTML = Footer();

  const tableBody = document.getElementById("tablebody");

  if (tableBody) {
    let CartItem = await CartMethod.GetAll();
    let LsUser = JSON.parse(localStorage.getItem("user"));
    if (!LsUser) {
      alert("You Are Not Still loggedIn Please Login First...");
      return;
    }
    let MUser = await LoginMethod.GetAll();
    let LoggedUser = MUser.find((user) => user.username == LsUser.username);

    let UserCart = CartItem.filter(
      (item) => item.username == LoggedUser.username
    );

    UiMaker(UserCart);
  }
});

const WishListCartCount = async () => {
  let item = await WishlistMethod.GetWishlist();
  let LsUser = JSON.parse(localStorage.getItem("user"));
  let WishlistByUser = item.filter((user) => user.username == LsUser.username);
  let countitem = WishlistByUser.length;
  document.getElementById("wishlist-count").innerHTML = `(${countitem})`;
};
WishListCartCount();

// const UiMaker = (CartItem) => {
//   let total = 0;
//   const tableBody = document.getElementById("tablebody");
//   tableBody.innerHTML = "";

//   CartItem.forEach((item, index) => {
//     let row = document.createElement("tr");

//     // --- Product Info ---
//     let td1 = document.createElement("td");
//     let productInfoDiv = document.createElement("div");
//     productInfoDiv.classList.add("product-info");

//     let img = document.createElement("img");
//     img.src = item.img;
//     img.style.width = "50px";
//     img.style.height = "50px";
//     img.style.objectFit = "cover";
//     img.style.marginRight = "10px";

//     let span = document.createElement("span");
//     span.textContent = item.name;

//     productInfoDiv.appendChild(img);
//     productInfoDiv.appendChild(span);
//     td1.appendChild(productInfoDiv);
//     row.appendChild(td1);

//     // --- Price ---
//     let td2 = document.createElement("td");
//     td2.textContent = `₹${item.price}`;
//     row.appendChild(td2);

//     // --- Quantity Controls ---
//     let td3 = document.createElement("td");
//     let quantityContainer = document.createElement("div");
//     quantityContainer.style.display = "flex";
//     quantityContainer.style.alignItems = "center";
//     quantityContainer.style.gap = "5px";

//     let decreaseBtn = document.createElement("button");
//     decreaseBtn.textContent = "-";
//     decreaseBtn.style.padding = "5px 10px";
//     decreaseBtn.style.cursor = "pointer";

//     let input = document.createElement("input");
//     input.type = "number";
//     input.value = item.quantity;
//     input.min = "1";
//     input.max = "100";
//     input.style.width = "50px";
//     input.style.height="28px"
//     input.style.textAlign = "center";

//     let increaseBtn = document.createElement("button");
//     increaseBtn.textContent = "+";
//     increaseBtn.style.padding = "5px 10px";
//     increaseBtn.style.cursor = "pointer";

//     quantityContainer.append(decreaseBtn, input, increaseBtn);
//     td3.appendChild(quantityContainer);
//     row.appendChild(td3);

//     // --- Subtotal ---
//     let td4 = document.createElement("td");
//     let subtotal = item.price * item.quantity;
//     td4.textContent = `₹${subtotal}`;
//     row.appendChild(td4);

//     // --- Delete Button ---
//     let td5 = document.createElement("td");
//     let deleteBtn = document.createElement("button");
//     deleteBtn.textContent = "Delete";
//     deleteBtn.style.backgroundColor = "red";
//     deleteBtn.style.color = "white";
//     deleteBtn.style.border = "none";
//     deleteBtn.style.padding = "5px 10px";
//     deleteBtn.style.cursor = "pointer";
//     td5.appendChild(deleteBtn);
//     row.appendChild(td5);

//     tableBody.appendChild(row);
//     total += subtotal;

//     // --- Helper Functions ---
//     function updateTotals() {
//       let newTotal = 0;
//       CartItem.forEach((i) => {
//         newTotal += i.price * i.quantity;
//       });
//       document.getElementById("Totalshow").innerHTML = `₹${newTotal.toFixed(2)}`;
//       document.getElementById("Grandtotal").innerHTML = `₹${(newTotal + 100).toFixed(2)}`;
//     }

//     function updateSubtotal() {
//       const updatedSubtotal = item.price * item.quantity;
//       td4.textContent = `₹${updatedSubtotal}`;
//       updateTotals();
//     }

//     async function updateQuantityInDB(newQty) {
//       try {
//         await CartMethod.Update(item.sku, { quantity: newQty });
//       } catch (error) {
//         console.error("Failed to update quantity:", error);
//         alert("Error updating quantity. Please try again.");
//       }
//     }

//     // --- Event Listeners ---
//     increaseBtn.addEventListener("click", async () => {
//       if (item.quantity < 100) {
//         item.quantity++;
//         input.value = item.quantity;
//         updateSubtotal();
//         await updateQuantityInDB(item.quantity);
//       }
//     });

//     decreaseBtn.addEventListener("click", async () => {
//       if (item.quantity > 1) {
//         item.quantity--;
//         input.value = item.quantity;
//         updateSubtotal();
//         await updateQuantityInDB(item.quantity);
//       }
//     });

//     input.addEventListener("input", async () => {
//       let newQty = parseInt(input.value);
//       if (isNaN(newQty) || newQty < 1) newQty = 1;
//       if (newQty > 100) newQty = 100;

//       item.quantity = newQty;
//       input.value = newQty;
//       updateSubtotal();
//       await updateQuantityInDB(item.quantity);
//     });

//     deleteBtn.addEventListener("click", async () => {
//       await CartMethod.Delete(item.sku);
//       alert(`${item.name} product Deleted`);
//       location.reload();
//     });
//   });

//   // Final totals
//   document.getElementById("Totalshow").innerHTML = `₹${total.toFixed(2)}`;
//   document.getElementById("Grandtotal").innerHTML = `₹${(total + 100).toFixed(2)}`;
// };

const UiMaker = (CartItem) => {
  let total = 0;
  const tableBody = document.getElementById("tablebody");
  tableBody.innerHTML = "";

  CartItem.forEach((item) => {
    let row = document.createElement("tr");

    // --- Product Info ---
    let td1 = document.createElement("td");
    let productInfoDiv = document.createElement("div");
    productInfoDiv.classList.add("product-info");

    let img = document.createElement("img");
    img.src = item.img;
    img.alt = item.name;

    let span = document.createElement("span");
    span.textContent = item.name;

    productInfoDiv.append(img, span);
    td1.appendChild(productInfoDiv);
    row.appendChild(td1);

    // --- Price ---
    let td2 = document.createElement("td");
    td2.textContent = `₹${item.price}`;
    row.appendChild(td2);

    // --- Quantity Controls ---
    let td3 = document.createElement("td");
    let quantityContainer = document.createElement("div");
    quantityContainer.classList.add("quantity-container");

    let decreaseBtn = document.createElement("button");
    decreaseBtn.textContent = "-";

    let input = document.createElement("input");
    input.type = "number";
    input.value = item.quantity;
    input.min = "1";
    input.max = "100";
    

    let increaseBtn = document.createElement("button");
    increaseBtn.textContent = "+";

    quantityContainer.append(decreaseBtn, input, increaseBtn);
    td3.appendChild(quantityContainer);
    row.appendChild(td3);

    // --- Subtotal ---
    let td4 = document.createElement("td");
    let subtotal = item.price * item.quantity;
    td4.textContent = `₹${subtotal}`;
    row.appendChild(td4);

    // --- Delete Button ---
    let td5 = document.createElement("td");
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    td5.appendChild(deleteBtn);
    row.appendChild(td5);

    tableBody.appendChild(row);
    total += subtotal;

    // --- Helper Functions ---
    function updateTotals() {
      let newTotal = 0;
      CartItem.forEach((i) => {
        newTotal += i.price * i.quantity;
      });
      document.getElementById("Totalshow").innerHTML = `₹${newTotal.toFixed(2)}`;
      document.getElementById("Grandtotal").innerHTML = `₹${(newTotal + 100).toFixed(2)}`;
    }

    function updateSubtotal() {
      const updatedSubtotal = item.price * item.quantity;
      td4.textContent = `₹${updatedSubtotal}`;
      updateTotals();
    }

    async function updateQuantityInDB(newQty) {
      try {
        await CartMethod.Update(item.sku, { quantity: newQty });
      } catch (error) {
        console.error("Failed to update quantity:", error);
      }
    }

    // --- Event Listeners ---
    increaseBtn.addEventListener("click", async () => {
      if (item.quantity < 100) {
        item.quantity++;
        input.value = item.quantity;
        updateSubtotal();
        await updateQuantityInDB(item.quantity);
      }
    });

    decreaseBtn.addEventListener("click", async () => {
      if (item.quantity > 1) {
        item.quantity--;
        input.value = item.quantity;
        updateSubtotal();
        await updateQuantityInDB(item.quantity);
      }
    });

    input.addEventListener("input", async () => {
      let newQty = parseInt(input.value);
      if (isNaN(newQty) || newQty < 1) newQty = 1;
      if (newQty > 100) newQty = 100;

      item.quantity = newQty;
      input.value = newQty;
      updateSubtotal();
      await updateQuantityInDB(item.quantity);
    });

    deleteBtn.addEventListener("click", async () => {
      await CartMethod.Delete(item.sku);
      alert(`${item.name} product Deleted`);
      location.reload();
    });
  });

  // Final totals
  document.getElementById("Totalshow").innerHTML = `₹${total.toFixed(2)}`;
  document.getElementById("Grandtotal").innerHTML = `₹${(total + 100).toFixed(2)}`;
};
export const ExportCartCount = async () => {
  let CartItem = await CartMethod.GetAll();
  let LsUser = JSON.parse(localStorage.getItem("user"));
  if (!LsUser) {
    alert("You Are Not Still loggedIn Please Login First...");
    return;
  }
  let MUser = await LoginMethod.GetAll();
  let LoggedUser = MUser.find((user) => user.username == LsUser.username);

  let UserCart = CartItem.filter(
    (item) => item.username == LoggedUser.username
  );
  let countitem = UserCart.length;
  return countitem;
};
