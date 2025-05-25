import Contactmethod from "../api/ContactMethod.js";
import WishlistMethod from "../api/wishlistmethod.js";
import CompanyPolicy from "../components/companypolicy.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
import { navbarclassactive } from "../utils/navbarclassactive.js";
import { ExportCartCount } from "./cart.js";

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("navbar").innerHTML = Navbar();

  const count = await ExportCartCount();
  document.getElementById("cart-count").innerText = `(${count || 0})`;

  document.getElementById("footer").innerHTML = Footer();
  document.getElementById("companypolicy").innerHTML = CompanyPolicy();
});
const WishListCartCount = async () => {
  let item = await WishlistMethod.GetWishlist();

  let LsUser = JSON.parse(localStorage.getItem("user"));
  let WishlistByUser = item.filter((user) => user.username == LsUser.username);

  let countitem = WishlistByUser.length;
  document.getElementById("wishlist-count").innerHTML = `(${countitem})`;
};
WishListCartCount();
navbarclassactive();

document.getElementById("contactform").addEventListener("submit", async (e) => {
  e.preventDefault();

  let User_Name = document.getElementById("contactname").value;
  let User_Email = document.getElementById("contactemail").value;
  let User_Message = document.getElementById("contactmessage").value;
  let User_Phone = document.getElementById("contactphone").value;

  let User_Quary = {
    name: User_Name,
    email: User_Email,
    message: User_Message,
    number: User_Phone,
  };

  await (await Contactmethod.create(User_Quary)).json

  alert("Your Query has been submitted successfully");
});
