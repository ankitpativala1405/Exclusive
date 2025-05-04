import UserMethod from "../api/usermethod.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
import { GetValue } from "../public/helper.js";

document.getElementById("navbar").innerHTML = Navbar();
document.getElementById("footer").innerHTML = Footer();

document.getElementById("signupform").addEventListener("submit", async (e) => {
  e.preventDefault();

  let user = {
    name: GetValue("name"),
    email: GetValue("email"),
    number: GetValue("number"),
    password: GetValue("password"),
  };
  console.log(user);

  const request = UserMethod.create(user);

  const response = await request.json();
  console.log(response);
//   alert(response.message);

alert("account created")
});
