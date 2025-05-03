import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
import { counter } from "../utils/counter.js";

document.getElementById("navbar").innerHTML = Navbar();
document.getElementById("footer").innerHTML = Footer();

window.onload = () => {
  counter("value1");
  counter("value2");
  counter("value3");
  counter("value4");
};
