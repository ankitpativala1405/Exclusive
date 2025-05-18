import { CartMethod } from "../api/cartmethod.js";
import LoginMethod from "../api/loginmethod.js";
import WishlistMethod from "../api/wishlistmethod.js";
import CompanyPolicy from "../components/companypolicy.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
import ProductData from "../public/productdata.js";
import { navbarclassactive } from "../utils/navbarclassactive.js";
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
  let WishlistByUser=item.filter((user)=>user.username == LsUser.username)

  let countitem = WishlistByUser.length;
  document.getElementById("wishlist-count").innerHTML = `(${countitem})`;
};
WishListCartCount();
navbarclassactive()

let data = ProductData;

let currentPage = 1;
const itemsPerPage = 12;

//Display Show
const UiMaker = (page = 1) => {
  document.getElementById("Product-List").innerHTML = "";

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = data.slice(start, end);

  paginatedItems.map((product) => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-3";

    const card = document.createElement("div");
    card.className =
      "border p-3 rounded text-center shadow-sm position-relative";

    const imageWrapper = document.createElement("div");
    imageWrapper.className = "mb-3 position-relative";

    const img = document.createElement("img");
    img.src = product.img;
    img.alt = product.name;
    img.className = "images";

    const discount = document.createElement("div");
    discount.id = "discount";
    discount.className = "position-absolute top-0 start-0 m-2";
    discount.innerText = `${Math.round(
      (parseFloat(product.price) * 100) / parseFloat(product.mrp) - 100
    )}%`;

    const iconsWrapper = document.createElement("div");
    iconsWrapper.className = "position-absolute top-0 end-0 m-2 d-flex gap-1";

    const heartBtn = document.createElement("button");
    heartBtn.className = "btn btn-light btn-sm rounded-circle";
    heartBtn.innerHTML = '<i class="fa-regular fa-heart text-dark"></i>';
    heartBtn.addEventListener("click", async () => {
      let LsUser = JSON.parse(localStorage.getItem("user"));
      if (!LsUser) {
        alert("You Are Not Still loggedIn Please Login First...");
        return;
      }
      let MUser = await LoginMethod.GetAll();
      let LoggedUser = MUser.find((user) => user.username == LsUser.username);
      let LoggedUsername = LoggedUser.username;
      let wishlistAdd = { ...product, username: LoggedUsername };
      await (await CartMethod.PostWishlist(wishlistAdd)).json();
      alert("Added to Wishlist");
      location.reload();
    });

    const eyeBtn = document.createElement("button");
    eyeBtn.className = "btn btn-light btn-sm rounded-circle";
    eyeBtn.innerHTML = '<i class="fa-regular fa-eye text-dark"></i>';
    eyeBtn.addEventListener("click", () => {
      localStorage.setItem("ViewProductDetail", JSON.stringify(product));
      alert(`opening ${product.name}`);
      window.location.href = "/PAGES/productdetail.html";
    });

    iconsWrapper.appendChild(heartBtn);
    iconsWrapper.appendChild(eyeBtn);

    imageWrapper.appendChild(img);
    imageWrapper.appendChild(discount);
    imageWrapper.appendChild(iconsWrapper);

    const name = document.createElement("p");
    name.className = "fw-medium";
    name.innerText = product.name;

    const sku = document.createElement("p");
    sku.className = "text-muted small mb-1";
    sku.innerText = `SKU: ${product.sku}`;

    const rating = document.createElement("div");
    rating.className = "text-warning";
    rating.innerHTML = '★★★★☆ <span class="text-muted small">(262)</span>';

    const price = document.createElement("p");
    price.className = "text-danger fw-semibold mt-2";
    price.innerHTML = `₹${product.price} <span class="old">₹${product.mrp}</span>`;

    const addToCartBtn = document.createElement("button");
    addToCartBtn.className = "btn btn-dark btn-sm mt-2";
    addToCartBtn.innerText = "Add To Cart";
    addToCartBtn.addEventListener("click", async () => {
      let CartItem = await CartMethod.GetAll();
      let LsUser = JSON.parse(localStorage.getItem("user"));
      if (!LsUser) {
        alert("You Are Not Still loggedIn Please Login First...");
        return;
      }

      let MUser = await LoginMethod.GetAll();

      let LoggedUser = MUser.find((user) => user.username == LsUser.username);

      let LoggedUsername = LoggedUser.username;

      let IsExist = CartItem.find((item) => item.sku === product.sku);

      if (IsExist) {
        let sku = IsExist.sku;
        let quantity = IsExist.quantity;
        let upadteitem = {
          ...IsExist,
          username: LoggedUsername,
          quantity: quantity + 1,
        };
        await CartMethod.Update(sku, upadteitem);
        alert(`${product.name} quantity increased in cart`);
        location.reload();
      } else {
        let CartAdd = { ...product, username: LoggedUsername, quantity: 1 };
        await CartMethod.Post(CartAdd);
        alert(`${product.name} added to cart!`);
        location.reload();
      }
    });

    card.appendChild(imageWrapper);
    card.appendChild(name);
    card.appendChild(sku);
    card.appendChild(rating);
    card.appendChild(price);
    card.appendChild(addToCartBtn);

    col.appendChild(card);
    document.getElementById("Product-List").appendChild(col);
  });

  createPagination();
};

//pagination..
const createPagination = () => {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  document.getElementById("pagination").innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.innerHTML = i;
    if (i === currentPage) {
      pageBtn.setAttribute("class", "btn btn-sm me-1 btn-dark");
    } else {
      pageBtn.setAttribute("class", "btn btn-sm me-1 btn-outline-dark");
    }

    pageBtn.addEventListener("click", () => {
      currentPage = i;
      UiMaker(currentPage);
    });
    document.getElementById("pagination").appendChild(pageBtn);
  }
};

UiMaker(currentPage);

//slider of filterbar
document.getElementById("priceRange").addEventListener("input", function() {
  let Price = document.getElementById("priceRange").value;
  document.getElementById("priceRangeValue").innerHTML = Price;

  let temp = data.filter((product) => parseFloat(product.price) <= parseFloat(Price));
  uimaker(temp); 
});

