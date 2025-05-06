import UserMethod from "../api/usermethod.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
import { GetValue } from "../public/helper.js";

document.getElementById("navbar").innerHTML = Navbar();
document.getElementById("footer").innerHTML = Footer();

document.getElementById("loginform").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = GetValue("email");
  const password = GetValue("password");

  const users = await UserMethod.emailExists(email);

  if (users.length === 0) {
    alert("Email not found!");
    return;
  }

  const user = users[0];
  if (user.password === password) {
    alert("Login successful!");

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    window.location.href = "/dashboard.html";
  } else {
    alert("Incorrect password!");
  }
});
