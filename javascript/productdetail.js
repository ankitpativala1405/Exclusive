import { CartMethod } from "../api/cartmethod.js";
import LoginMethod from "../api/loginmethod.js";
import WishlistMethod from "../api/wishlistmethod.js";
import CompanyPolicy from "../components/companypolicy.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
import ProductData from "../public/productdata.js";
import { ExportCartCount } from "./cart.js";

// Product gallery switching logic
// document.querySelectorAll(".product-gallery-thumb").forEach(function (thumb) {
//   thumb.addEventListener("click", function () {
//     document.getElementById("mainProductImage").src = this.dataset.large;
//     document.querySelectorAll(".product-gallery-thumb").forEach((t) => t.classList.remove("active"));
//     this.classList.add("active");
//   });
// });

// document.getElementById("btn-decrease").onclick = function () {
//   var qty = document.getElementById("qty-input");
//   qty.value = Math.max(1, parseInt(qty.value, 10) - 1);
// };
// document.getElementById("btn-decrease").addEventListener("click", () => {
//   let qty = document.getElementById("qty-input");
//   qty.value = Math.max(1, parseInt(qty.value, 10) - 1);
// });
// document.getElementById("btn-increase").onclick = function () {
//   var qty = document.getElementById("qty-input");
//   qty.value = parseInt(qty.value, 10) + 1;
// };

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("navbar").innerHTML = Navbar();

  const count = await ExportCartCount();
  document.getElementById("cart-count").innerText = `(${count})`;

  document.getElementById("footer").innerHTML = Footer();
  document.getElementById("companypolicy").innerHTML = CompanyPolicy();

  ShowDataDisplay();

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
  console.log("LuUSer", LsUser.username);
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

  console.log("ShowData", ShowData);

  if (ShowData) {
    document.getElementById("FindProductview").innerHTML = `
          <div class="row g-4 align-items-start" id="ProductInfoDetail">
        <!-- Gallery column -->
        <div class="col-lg-2 gallery-col">
          <div id="gallery-thumbs">
            <img
              src="${ShowData.img2}"
              class="img-fluid product-gallery-thumb active"
              data-large="/images/ProductImages/0/Magic-Silicone-Cleaning-Hand-Glove-1.jpg"
              alt="Thumbnail 1"
            />
            <img
              src="${ShowData.img3}"
              class="img-fluid product-gallery-thumb"
              data-large="https://img.icons8.com/color/400/000000/controller.png"
              alt="Thumbnail 2"
            />
            <img
              src="${ShowData.img4}"
              class="img-fluid product-gallery-thumb"
              data-large="https://img.icons8.com/doodle/400/000000/controller.png"
              alt="Thumbnail 3"
            />
            <img
              src="${ShowData.img5}"
              class="img-fluid product-gallery-thumb"
              data-large="https://img.icons8.com/office/400/000000/controller.png"
              alt="Thumbnail 4"
            />
          </div>
        </div>

        <!-- Main image column -->
        <div class="col-lg-5 main-img-col text-center" id="MainImage">
          <img
            id="mainProductImage"
            src="${ShowData.img}"
            class="img-fluid rounded"
            style="
              width: 600px;
              height: 600px;
              background: #fff;
              padding: 24px;
              margin-left: -21px;
            "
            alt="Main Product Image"
          />
        </div>

        <!-- Product info column -->
        <div class="col-lg-5 info-col">
          <h4>${ShowData.name}</h4>
          <div class="d-flex align-items-center mb-2">
            <div class="me-2">
              <span class="text-warning"
                >&#9733;&#9733;&#9733;&#9733;&#9734;</span
              >
              <span class="text-muted ms-1">(150 Reviews)</span>
            </div>
            <span class="badge bg-success ms-2">In Stock</span>
          </div>
          <div class="fs-4 fw-bold mb-2" style="color: #232323">₹${ShowData.price}</div>
          <!-- Color selection -->
          <div class="mb-2">
            <span class="me-2">Colours:</span>
            <button class="btn btn-sm rounded-circle" style=" background: #222; width: 28px; height: 28px; border: 1.5px solid #ccc;"></button>
            <button class="btn btn-sm rounded-circle" style=" background: #e9ecef; width: 28px; height: 28px; border: 1.5px solid #ccc;"></button>
          </div>
          <!-- Size selection -->
          <div class="mb-2 product-size">
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
          <!-- Quantity & Add to cart -->
          <div class="d-flex align-items-center mb-3">
            <div class="input-group me-3" style="width: 110px">
              <button class="btn btn-outline-secondary" id="btn-decrease" type="button">-</button>
              <input type="number" class="form-control text-center" style="width: 40px" id="qty-input" value="1" min="1"/>
              <button class="btn btn-outline-secondary" id="btn-increase" type="button">+</button>
            </div>
            <button class="btn btn-buy px-4" type="button" id="addToCartBtn">
              <i class="bi bi-cart-fill"></i> Add to Cart
            </button>
            <button class="btn btn-outline-secondary ms-2" style="border-radius: 10%" title="Add to wishlist">
              <i class="bi bi-heart"></i>
            </button>
          </div>
          <!-- Delivery info -->
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
                <strong>Return Delivery</strong><br />Free 14 Days Delivery
                Returns.
                <a href="#" class="text-decoration-underline small">Details</a>
              </div>
            </div>
          </div>
          <div class="mb-3 small text-secondary description">
            PlayStation 5 Controller Skin: High quality vinyl with air channel
            adhesive for easy bubble free install & mess free removal. Pressure
            sensitive.
          </div>
        </div>
      </div>
  `;

    document.getElementById("addToCartBtn").addEventListener("click", () => {
      // alert("cart added")
      AddToCart(ShowData);
    });
  } else {
    document.getElementById("FindProductview").innerHTML =
      "<p class='text-danger'>Product not found</p>";
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
  //  if(InputValue>1){
  //   alert("you can not more than ")
  //  }

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
      quantity: quantity + 1,
    };
    await CartMethod.Update(sku, upadteitem);
    alert(`${ShowData.name} quantity increased in cart`);
    location.reload();
  } else {
    let CartAdd = { ...ShowData, username: LoggedUsername, quantity: 1 };
    await CartMethod.Post(CartAdd);
    alert(`${ShowData.name} added to cart!`);
    location.reload();
  }
};
