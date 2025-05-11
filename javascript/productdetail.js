import Navbar from "../components/navbar.js";

// Product gallery switching logic
document.querySelectorAll(".product-gallery-thumb").forEach(function (thumb) {
  thumb.addEventListener("click", function () {
    document.getElementById("mainProductImage").src = this.dataset.large;
    document
      .querySelectorAll(".product-gallery-thumb")
      .forEach((t) => t.classList.remove("active"));
    this.classList.add("active");
  });
});

document.getElementById("btn-decrease").onclick = function () {
  var qty = document.getElementById("qty-input");
  qty.value = Math.max(1, parseInt(qty.value, 10) - 1);
};
document.getElementById("btn-increase").onclick = function () {
  var qty = document.getElementById("qty-input");
  qty.value = parseInt(qty.value, 10) + 1;
};


document.getElementById("navbar").innerHTML=Navbar()