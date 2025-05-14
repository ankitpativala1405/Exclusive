import UserMethod from "../api/usermethod.js";
import WishlistMethod from "../api/wishlistmethod.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
import { GetValue } from "../public/helper.js";
import { navbarclassactive } from "../utils/navbarclassactive.js";
import { ExportCartCount } from "./cart.js";

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("navbar").innerHTML = Navbar();

  const count = await ExportCartCount();
  document.getElementById("cart-count").innerText = `(${count})`;

  document.getElementById("footer").innerHTML = Footer();
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

document.getElementById("signupform").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = GetValue("name");
  const email = GetValue("email");
  const number = GetValue("number");
  const password = GetValue("password");

  const username =
    number.slice(0, 3) +
    name.replace(/\s+/g, "").toUpperCase().slice(0, 3) +
    number.slice(-4);

  let user = {
    name,
    email,
    number,
    password,
    username,
  };

  const req = await UserMethod.create(user);
  const res = await req.json();
  alert("Signup successful!");
  alert(`Your username is ->${username}`);
});