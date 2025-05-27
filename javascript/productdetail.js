import { CartMethod } from "../api/cartmethod.js";
import LoginMethod from "../api/loginmethod.js";
import WishlistMethod from "../api/wishlistmethod.js";
import CompanyPolicy from "../components/companypolicy.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
import ProductData from "../public/productdata.js";
import { ExportCartCount } from "./cart.js";

function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  let starHTML = "";
  for (let i = 0; i < fullStars; i++) starHTML += "&#9733;";
  if (halfStar) starHTML += "&#189;";
  for (let i = 0; i < emptyStars; i++) starHTML += "&#9734;";
  return starHTML;
}

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("navbar").innerHTML = Navbar();

  const count = await ExportCartCount();
  document.getElementById("cart-count").innerText = `(${count || 0})`;

  document.getElementById("footer").innerHTML = Footer();
  document.getElementById("companypolicy").innerHTML = CompanyPolicy();

  ShowDataDisplay();
  ShowRelatedItems();

  //decrease quantity
  document.getElementById("btn-decrease").addEventListener("click", () => {
    let InputValue = document.getElementById("qty-input").value;
    if (InputValue <= 1) {
      alert("Should Not Be Value In 0 or Minus.....");
      return;
    }
    let NewValue = parseFloat(InputValue) - 1;
    document.getElementById("qty-input").value = NewValue;
  });

  //increase quantity
  document.getElementById("btn-increase").addEventListener("click", () => {
    let InputValue = document.getElementById("qty-input").value;
    let NewValue = parseFloat(InputValue) + 1;
    document.getElementById("qty-input").value = NewValue;
  });
});

const WishListCartCount = async () => {
  let item = await WishlistMethod.GetWishlist();

  let LsUser = JSON.parse(localStorage.getItem("user"));
  let WishlistByUser = item.filter((user) => user.username == LsUser.username);

  let countitem = WishlistByUser.length;
  document.getElementById("wishlist-count").innerHTML = `(${countitem})`;
};
WishListCartCount();
document.getElementById("companypolicy").innerHTML = CompanyPolicy();

const ShowDataDisplay = () => {
  let data = ProductData;
  let LsData = JSON.parse(localStorage.getItem("ViewProductDetail"));
  let ShowData = data.find((data) => data.sku == LsData.sku);

  if (ShowData) {
    // Generate dynamic star rating
    const rating = ShowData.rating || 0;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    let starHTML = "";
    for (let i = 0; i < fullStars; i++) {
      starHTML += `<i class="fa-solid fa-star"></i>`;
    }
    if (halfStar) {
      starHTML += `<i class="fa-solid fa-star-half-stroke"></i>`;
    }
    for (let i = 0; i < emptyStars; i++) {
      starHTML += `<i class="fa-regular fa-star"></i>`;
    }

    document.getElementById("FindProductview").innerHTML = `
      <div class="row g-4 align-items-start" id="ProductInfoDetail">
        <div class="col-lg-2 gallery-col">
          <div id="gallery-thumbs">
            <img src="${ShowData.img2}" class="img-fluid product-gallery-thumb active" data-large="${ShowData.img2}" alt="Thumbnail 1" />
            <img src="${ShowData.img3}" class="img-fluid product-gallery-thumb" data-large="${ShowData.img3}" alt="Thumbnail 2" />
            <img src="${ShowData.img4}" class="img-fluid product-gallery-thumb" data-large="${ShowData.img4}" alt="Thumbnail 3" />
            <img src="${ShowData.img5}" class="img-fluid product-gallery-thumb" data-large="${ShowData.img5}" alt="Thumbnail 4" />
          </div>
        </div>

        <div class="col-lg-5 main-img-col text-center" id="MainImage">
          <img id="mainProductImage" src="${ShowData.img}" class="img-fluid rounded" style="width: 600px; height: 600px; background: #fff; padding: 24px; margin-left: -21px;" alt="Main Product Image"/>
        </div>

        <div class="col-lg-5 info-col">
          <h4>${ShowData.name}</h4>
          <div class="d-flex align-items-center mb-2">
            <div class="me-2 text-warning">${starHTML}
              <span class="text-muted ms-1">(${ShowData.reviews || 0} Reviews)</span>
            </div>
            <span class="badge bg-success ms-2">In Stock</span>
          </div>
          <div class="fs-4 fw-bold mb-2" style="color: #232323">₹${ShowData.price}</div>

          <div class="mb-2">
            <span class="me-2">Colours:</span>
            <button class="btn btn-sm rounded-circle" style="background: #222; width: 28px; height: 28px; border: 1.5px solid #ccc;"></button>
            <button class="btn btn-sm rounded-circle" style="background: #e9ecef; width: 28px; height: 28px; border: 1.5px solid #ccc;"></button>
          </div>

          <div class="mb-2 product-size" style="display: block;">
            <span class="me-2">Size:</span>
            <input type="radio" class="btn-check" name="size" id="sizeXS" autocomplete="off"/>
            <label class="btn btn-outline-secondary btn-sm" for="sizeXS">XS</label>
            <input type="radio" class="btn-check" name="size" id="sizeS" autocomplete="off"/>
            <label class="btn btn-outline-secondary btn-sm" for="sizeS">S</label>
            <input type="radio" class="btn-check" name="size" id="sizeM" autocomplete="off" checked/>
            <label class="btn btn-outline-secondary btn-sm" for="sizeM">M</label>
            <input type="radio" class="btn-check" name="size" id="sizeL" autocomplete="off"/>
            <label class="btn btn-outline-secondary btn-sm" for="sizeL">L</label>
            <input type="radio" class="btn-check" name="size" id="sizeXL" autocomplete="off"/>
            <label class="btn btn-outline-secondary btn-sm" for="sizeXL">XL</label>
          </div>

          <div class="d-flex align-items-center mb-3">
            <div class="input-group me-3" style="width: 110px">
              <button class="btn btn-outline-secondary" id="btn-decrease" type="button">-</button>
              <input type="number" class="form-control text-center" style="width: 40px" id="qty-input" value="1" min="1"/>
              <button class="btn btn-outline-secondary" id="btn-increase" type="button">+</button>
            </div>
            <button class="btn btn-buy px-4" type="button" id="addToCartBtn">
              <i class="bi bi-cart-fill"></i> Add to Cart
            </button>
            <button class="btn btn-outline-secondary ms-2" style="border-radius: 10%" title="Add to wishlist" >
              <i class="bi bi-heart"></i>
            </button>
          </div>

          <div class="border rounded p-3 bg-white mt-3 small">
            <div class="d-flex align-items-center mb-1">
              <i class="bi bi-truck me-2"></i>
              <div>
                <strong>Free Delivery</strong><br />
                <a href="#" class="text-decoration-underline small">Enter your postal code for Delivery Availability</a>
              </div>
            </div>
            <div class="d-flex align-items-center mt-2">
              <i class="bi bi-arrow-counterclockwise me-2"></i>
              <div>
                <strong>Return Delivery</strong><br />Free 14 Days Delivery Returns.
                <a href="#" class="text-decoration-underline small">Details</a>
              </div>
            </div>
          </div>

          <div class="mb-3 small text-secondary description">
           ${ShowData.description}
          </div>
        </div>
      </div>
    `;

    if (ShowData.categoty !== "Clothing") {
    const sizeElements = document.getElementsByClassName("product-size");
    for (let i = 0; i < sizeElements.length; i++) {
        sizeElements[i].style.display = "none";
    }
}

    // Register event listener after rendering
    document.getElementById("addToCartBtn").addEventListener("click", () => {
      AddToCart(ShowData);
    });

    // Enable thumbnail switching
    document.querySelectorAll(".product-gallery-thumb").forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        document.getElementById("mainProductImage").src = this.dataset.large;
        document.querySelectorAll(".product-gallery-thumb").forEach((t) => t.classList.remove("active"));
        this.classList.add("active");
      });
    });

  } else {
    document.getElementById("FindProductview").innerHTML = "<p class='text-danger'>Product not found</p>";
  }
};

const AddToCart = async (ShowData) => {
  // alert("cart added");
  let CartItem = await CartMethod.GetAll();
  let LsUser = JSON.parse(localStorage.getItem("user"));
  if (!LsUser) {
    alert("You Are Not Still loggedIn Please Login First...");
    return;
  }

  let InputValue = document.getElementById("qty-input").value;

  let MUser = await LoginMethod.GetAll();

  let LoggedUser = MUser.find((user) => user.username == LsUser.username);

  let LoggedUsername = LoggedUser.username;

  let IsExist = CartItem.find((item) => item.sku === ShowData.sku);

  if (IsExist) {
    let sku = IsExist.sku;
    let quantity = IsExist.quantity;
    let upadteitem = {
      ...IsExist,
      username: LoggedUsername,
      quantity: quantity + parseFloat(InputValue),
    };
    await CartMethod.Update(sku, upadteitem);
    alert(`${ShowData.name} quantity increased in cart`);
    location.reload();
  } else {
    let CartAdd = {
      ...ShowData,
      username: LoggedUsername,
      quantity: parseFloat(InputValue),
    };
    await CartMethod.Post(CartAdd);
    alert(`${ShowData.name} added to cart!`);
    location.reload();
  }
};

const ShowRelatedItems = () => {
  const allProducts = ProductData;
  const currentProduct = JSON.parse(localStorage.getItem("ViewProductDetail"));
  const filteredProducts = allProducts.filter(
    (p) => p.sku !== currentProduct.sku
  );
  const shuffled = filteredProducts.sort(() => 0.5 - Math.random());
  const selectedProducts = shuffled.slice(0, 4);

  let html = "";
  selectedProducts.forEach((product) => {
    html += `
      <div class="col-md-3 col-6">
        <div class="card position-relative">
          <img src="${product.img}" class="card-img-top images" alt="${product.name}" />
          <div class="card-body pb-2">
            <h6 class="card-title mb-1">${product.name}</h6>
            <div class="mb-1">
              <span class="fw-bold" style="color: #e53935">₹${product.price}</span>
            </div>
            <button class="add-to-cart-btn w-100 mb-1" data-sku="${product.sku}">Add To Cart</button>
            <div class="small text-warning">
              &#9733;&#9733;&#9733;&#9733;&#9733;
            </div>
          </div>
        </div>
      </div>`;
  });

  document.querySelector(".row.product-card").innerHTML = html;
  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const sku = button.getAttribute("data-sku");
      const productToAdd = ProductData.find((p) => p.sku === sku);
      AddToCart(productToAdd);
    });
  });
};
