///navbar ///footer

import WishlistMethod from "../api/wishlistmethod.js";
import CompanyPolicy from "../components/companypolicy.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
import ProductData from "../public/productdata.js";
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

  let LsUser = JSON.parse(localStorage.getItem("user"));
  console.log("LuUSer", LsUser.username);
  let WishlistByUser=item.filter((user)=>user.username == LsUser.username)

  let countitem = WishlistByUser.length;
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

// TodaySaleProducts
let data = ProductData;
console.log(data);

function getRandomProducts(data, count) {
  let Random = data.sort(() => 0.5 - Math.random());
  return Random.slice(0, count);
}

// function displayProducts(products) {
//   document.getElementById("TodaySaleProducts").innerHTML = "";

//   products.forEach((product) => {
//     const productEl = document.createElement("div");
//     productEl.className = "product-item";
//     productEl.innerHTML = `
//       <div class="product">
//             <div id="discount">-40%</div>
//             <img
//               src="https://cdn11.bigcommerce.com/s-eie9lsi1uc/images/stencil/1280x1280/products/100175/1015921/758664_FACK7_9768_009_084_0000_Light-Sac-de-voyage-avec-bande-Web-grande-taille_1__21197.1701428569.jpg?c=1"
//               alt="HAVIT HV-G92 Gamepad"
//             />
//             <h3>HAVIT HV-G92 Gamepad</h3>
//             <p>
//               <strong>₹120</strong> <span class="original-price">₹260</span>
//             </p>
//             <p class="rating">★★★★☆ (88)</p>
//             <button class="add-to-cart">Add To Cart</button>
//           </div>
//     `;
//     document.getElementById("TodaySaleProducts").append(productEl);
//   });
// }

// const displayProducts=(products)=> {
//   document.getElementById("TodaySaleProducts").innerHTML = "";

//   products.map((product) => {
//     const productItem = document.createElement("div");
//     productItem.className = "product-item";

//     const productDiv = document.createElement("div");
//     productDiv.className = "product";

//     const discountDiv = document.createElement("div");
//     discountDiv.id = "discount";
//     discountDiv.textContent = product.discount || "";

//     const img = document.createElement("img");
//     img.src = product.img;
//     img.alt = product.name;

//     const title = document.createElement("h3");
//     title.textContent = product.name;

//     const pricePara = document.createElement("p");
//     const strongPrice = document.createElement("strong");
//     strongPrice.textContent = `₹${product.price}`;

//     const originalPriceSpan = document.createElement("span");
//     originalPriceSpan.className = "original-price";
//     originalPriceSpan.textContent = `₹${product.mrp}`;

    // pricePara.appendChild(strongPrice);
    // pricePara.appendChild(document.createTextNode(" "));
    // pricePara.appendChild(originalPriceSpan);
    // pricePara.append(strongPrice,document.createTextNode(" "),originalPriceSpan)

    // const ratingPara = document.createElement("p");
    // ratingPara.className = "rating";
    // ratingPara.textContent = `${product.rating} (${product.reviews})`;

    // const button = document.createElement("button");
    // button.className = "add-to-cart";
    // button.textContent = "Add To Cart";

    // productDiv.appendChild(discountDiv);
    // productDiv.appendChild(img);
    // productDiv.appendChild(title);
    // productDiv.appendChild(pricePara);
    // productDiv.appendChild(ratingPara);
    // productDiv.appendChild(button);
    // productDiv.append(discountDiv,img,title,pricePara,ratingPara,button)

    // productItem.appendChild(productDiv);
    // document.getElementById("TodaySaleProducts").appendChild(productItem);
//   });
// }

// const randomFourProducts = getRandomProducts(ProductData, 4);
// displayProducts(randomFourProducts);
