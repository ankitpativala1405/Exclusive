import { CartMethod } from "../api/cartmethod.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";

document.getElementById("navbar").innerHTML = Navbar();
document.getElementById("footer").innerHTML = Footer();

let CartItem = await CartMethod.GetAll();
console.log("CartItem", CartItem);

const UiMaker = () => {
  document.getElementById("tablebody").innerHTML = "";

  CartItem.map((item) => {
    const row = document.createElement("tr");

    const td1 = document.createElement("td");
    const productInfoDiv = document.createElement("div");
    productInfoDiv.classList.add("product-info");

    const img = document.createElement("img");
    img.src = item.img;
    const span = document.createElement("span");
    span.textContent = item.name;

    productInfoDiv.appendChild(img);
    productInfoDiv.appendChild(span);
    td1.appendChild(productInfoDiv);
    row.appendChild(td1);

    const td2 = document.createElement("td");
    td2.textContent = `₹${item.price}`;
    row.appendChild(td2);

    const td3 = document.createElement("td");

    const input = document.createElement("input");
    input.type = "number"; 
    input.value = item.quantity; 
    input.min = "1"; // Optionally, set the minimum value to 1
    input.max = "100"; // Optionally, set a maximum value
    
    td3.appendChild(input);
    row.appendChild(td3);
    

    let total = item.price * item.quantity;
    const td4 = document.createElement("td");
    td4.textContent = `₹${total}`;
    row.appendChild(td4);

    document.getElementById("tablebody").appendChild(row);
  });
};

UiMaker();
