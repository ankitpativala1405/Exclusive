import { CartMethod } from "../api/cartmethod.js";
import WishlistMethod from "../api/wishlistmethod.js";
import CompanyPolicy from "../components/companypolicy.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
import { ExportCartCount } from "./cart.js";

document.getElementById("companypolicy").innerHTML = CompanyPolicy();
document.getElementById("footer").innerHTML = Footer();
document.getElementById("navbar").innerHTML = Navbar();

document.addEventListener("DOMContentLoaded", async () => {

  // wishlist-count
  let count = ExportCartCount();

  const tableBody = document.getElementById("wishlist-grid");

  if (tableBody) {
    let CartItem = await WishlistMethod.GetWishlist();
    document.getElementById("CountShowHere").innerHTML = `Wishlist(${CartItem.length})`;
       document.getElementById("wishlist-count").innerHTML = `(${CartItem.length})`;
    UiMaker(CartItem);
  }
});

const UiMaker = (CartItem) => {
  document.getElementById("wishlist-grid").innerHTML = "";

  CartItem.map((item) => {
    const wishlistItem = document.createElement("div");
    wishlistItem.classList.add("wishlist-item");

    const discount = document.createElement("span");
    discount.classList.add("discount");
    discount.textContent = "-35%";
    wishlistItem.appendChild(discount);

    const remove = document.createElement("span");
    remove.classList.add("remove");
    const removeIcon = document.createElement("i");
    removeIcon.classList.add("fas", "fa-trash");
    remove.appendChild(removeIcon);
    wishlistItem.appendChild(remove);
    removeIcon.addEventListener("click",async()=>{
      await WishlistMethod.Delete(item.sku)
      alert(`${item.name} Remove From WishList`)
      location.reload()
    })

    const img = document.createElement("img");
    img.src = item.img;
    img.alt = item.name;
    wishlistItem.appendChild(img);

    const addToCart = document.createElement("div");
    addToCart.classList.add("add-to-cart");
    const cartIcon = document.createElement("i");
    cartIcon.classList.add("fas", "fa-shopping-cart");
    addToCart.appendChild(cartIcon);
    addToCart.appendChild(document.createTextNode(" Add To Cart"));
    wishlistItem.appendChild(addToCart);
    addToCart.addEventListener("click", async () => {
      let CartItem = await CartMethod.GetAll();
      console.log("CartItem", CartItem);

      let IsExist = CartItem.find((items) => items.sku === item.sku);
      console.log("IsExist", IsExist);

      if (IsExist) {
        console.log("IsExist.sku", IsExist.sku);

        let upadteitem = { ...IsExist, quantity: IsExist.quantity + 1 };
        console.log("new cart", upadteitem);
        await CartMethod.Update(IsExist.sku, upadteitem);
        alert(`${item.name} has been increase in cart`);
        location.reload()
      } else {
        let CartAdd = { ...item, quantity: 1 };
        await CartMethod.Post(CartAdd);
        console.log("Product added to cart.");
        alert(`${item.name} added to cart!`);
        location.reload()
      }
    });

    const info = document.createElement("div");
    info.classList.add("info");

    const name = document.createElement("h4");
    name.textContent = item.name;
    info.appendChild(name);

    const price = document.createElement("span");
    price.classList.add("price");
    price.textContent = ` ${item.price}`;
    info.appendChild(price);

    const originalPrice = document.createElement("span");
    originalPrice.classList.add("original-price");
    originalPrice.style.marginLeft = "20px";
    originalPrice.textContent = "₹1160";
    info.appendChild(originalPrice);

    wishlistItem.appendChild(info);

    document.getElementById("wishlist-grid").appendChild(wishlistItem);
  });
};

document.getElementById("MovetoCart").addEventListener("click", async () => {
  let WishlistItem = await WishlistMethod.GetWishlist();
  console.log("WishlistItem", WishlistItem);

  let CartItem = await CartMethod.GetAll();
  console.log("CartItem", CartItem);

  for (let i = 0; i < WishlistItem.length; i++) {
    let wishItem = WishlistItem[i];
    let IsExist = CartItem.find((cartItem) => cartItem.sku === wishItem.sku);
    console.log("isExist", IsExist);
    if (IsExist) {
      console.log("IsExist.sku", IsExist.sku);

      let upadteitem = { ...IsExist, quantity: IsExist.quantity + 1 };
      console.log("new cart", upadteitem);
      await CartMethod.Update(IsExist.sku, upadteitem);
      alert(`${IsExist.name} has been increase in cart`);
    } else {
      let CartAdd = { ...wishItem, quantity: 1 };
      await CartMethod.Post(CartAdd);
      console.log("Product added to cart.");
      alert(`${wishItem.name} added to cart!`);
    }
  }
});

export const WishListCartCount = async () => {
  let item = await WishlistMethod.GetWishlist();

  let countitem = item.length;
  return countitem;
  // console.log("item", countitem);
};
// WishListCartCount();
