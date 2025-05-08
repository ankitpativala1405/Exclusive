import UserMethod from "../api/usermethod.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
import { GetValue } from "../public/helper.js";
import { VerifyOTP } from "../utils/loginotp.js";

document.getElementById("navbar").innerHTML = Navbar();
document.getElementById("footer").innerHTML = Footer();

document.getElementById("loginform").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = GetValue("email");
  const password = GetValue("password");
  console.log(email);
  console.log(password);

  const users = await UserMethod.GetAll();
  console.log("users", users);

  const user = users.find((data) => data.email === email);

  console.log("user", user);
  if (!user) {
    alert("USer not exist");
    return;
  } else {
    console.log(user.password);

    if (user.password == password) {
      document.getElementById("otpbox").style.display = "flex";
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
