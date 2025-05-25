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
  document.getElementById("cart-count").innerText = `(${count || 0})`;

  document.getElementById("footer").innerHTML = Footer();
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

  const NameREGEX = /^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/;
  const EmailREGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const NumberREGEX = /^(?:\+91[\-\s]?|0)?[6-9]\d{9}$/;
  let easypasswordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,8}$/;
  let mediumPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/-]).{9,12}$/;
  let strongpasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/-]).{13,}$/;

  if (!NameREGEX.test(name)) {
    alert(`Please Enter Valid Name... Server Want \nFirst Later is Capital`);
    return;
  }
  if (!EmailREGEX.test(email)) {
    alert(`Please Enter Valid Email...`);
    return;
  }
  if (!NumberREGEX.test(number)) {
    alert(
      `Please enter a valid Indian mobile number. It can start with +91, 0, or just the 10-digit number beginning with 6-9.`
    );
    return;
  }

  if (
    !easypasswordregex.test(password) &&
    !mediumPasswordRegex.test(password) &&
    !strongpasswordRegex.test(password)
  ) {
    alert(
      "Your password should be at least 5 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    );
    return;
  } else {
    if (easypasswordregex.test(password)) {
      alert("Your password is easy to guess");
    } else if (mediumPasswordRegex.test(password)) {
      alert("Your password is medium strength");
    } else if (strongpasswordRegex.test(password)) {
      alert("Your password is strong");
    }
  }

  let AllUser = await UserMethod.GetAll();
  let IsExist = AllUser.find((users) => users.number == user.number);
  let IsExistEmail = AllUser.find((users) => users.email == user.email);
  if (IsExist && IsExistEmail) {
    alert(
      "Your Number And Email Has Already Taken Please please Try with Another Number And Email ..."
    );
    return;
  }
  if (IsExist) {
    alert(
      "Your Number Has Already Taken Please please Try with Another Number..."
    );
    return;
  }
  if (IsExistEmail) {
    alert(
      "Your Email Has Already Taken Please please Try with Another Email..."
    );
    return;
  }

  await(await UserMethod.create(user)).json
  alert("Signup successful!");
  alert(`Your username is ->${username}`);
});


