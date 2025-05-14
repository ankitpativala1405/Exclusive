import LoginMethod from "../api/loginmethod.js";
import UserMethod from "../api/usermethod.js";
import WishlistMethod from "../api/wishlistmethod.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
import { GetValue } from "../public/helper.js";
import { VerifyOTP } from "../utils/loginotp.js";
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

document.getElementById("loginform").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = GetValue("email");
  const password = GetValue("password");

  const users = await UserMethod.GetAll();

  const user = users.find((data) => data.email === email);

  if (!user) {
    alert("USer not exist");
    return;
  } else {
    if (user.password == password) {
      document.getElementById("otpbox").style.display = "flex";
      let Login = await LoginMethod.create(user);
      localStorage.setItem("loggedin", true);
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/index.html";
    } else {
      alert("Incorrect password!");
    }
  }
});

// const cliked=()=>{
//   VerifyOTP()
// }

// const twilio = require("twilio");

// const accountSid = "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
// const authToken = "your_auth_token_here";

// const client = new twilio(accountSid, authToken);
// function generateOtp() {
//   return Math.floor(100000 + Math.random() * 900000);
// }

// function sendOtp(phoneNumber) {
//   const otp = generateOtp();
//   console.log(`Sending OTP: ${otp} to ${phoneNumber}`);

//   client.messages
//     .create({
//       body: `Your OTP is: ${otp}`,
//       from: "+1234567890",
//       to: phoneNumber,
//     })
//     .then((message) => {
//       console.log("Message sent:", message.sid);
//     })
//     .catch((error) => {
//       console.error("Error sending OTP:", error);
//     });
// }

// Example usage
// const phoneNumber = "+0987654321";
// sendOtp(phoneNumber);
