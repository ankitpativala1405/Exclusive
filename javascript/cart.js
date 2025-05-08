import { CartMethod } from "../api/cartmethod.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";

document.getElementById("navbar").innerHTML = Navbar();
document.getElementById("footer").innerHTML = Footer();

let CartItem = await CartMethod.GetAll();
console.log("CartItem", CartItem);


let total=0;

const UiMaker = () => {

  document.getElementById("tablebody").innerHTML = "";

  CartItem.map((item) => {
    let row = document.createElement("tr");

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

    let td2 = document.createElement("td");
    td2.textContent = `₹${item.price}`;
    row.appendChild(td2);

    let td3 = document.createElement("td");

    let input = document.createElement("input");
    input.type = "number"; 
    input.value = item.quantity; 
    input.min = "1"; 
    input.max = "100"; 
    
    td3.appendChild(input);
    row.appendChild(td3);
    

    let subtotal = item.price * item.quantity;
    let td4 = document.createElement("td");
    td4.textContent = `₹${subtotal}`;
    row.appendChild(td4);
    total=total+subtotal

    document.getElementById("tablebody").appendChild(row);

  });

  document.getElementById("Totalshow").innerHTML=`₹${total.toFixed(2)}`
  document.getElementById("Grandtotal").innerHTML=`₹${(total+100).toFixed(2)}`
};

UiMaker()



