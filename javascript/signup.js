import UserMethod from "../api/usermethod.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
import { GetValue } from "../public/helper.js";
import { ExportCartCount } from "./cart.js";

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("navbar").innerHTML = Navbar();

  const count = await ExportCartCount();
  document.getElementById("cart-count").innerText = `(${count})`;

  document.getElementById("footer").innerHTML = Footer();
});

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

  console.log("New user:", user);

  const req = await UserMethod.create(user);
  const res = await req.json();
  console.log("User created:", res);
  alert("Signup successful!");
  alert(`Your username is ->${username}`);
});