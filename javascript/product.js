import CompanyPolicy from "../components/companypolicy.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";

document.getElementById("navbar").innerHTML = Navbar();
document.getElementById("footer").innerHTML = Footer();
document.getElementById("companypolicy").innerHTML = CompanyPolicy();


let data = [
    {
      img: "https://i.pinimg.com/736x/fe/fa/84/fefa8431d3e4f9854aa31f625403d93b.jpg",
      name: "Breed Dry Dog Food",
      mrp: "₹360",
      price: "₹100",
    },
    {
        img: "https://x.imastudent.com/content/0016823_canon-eos-90d-dslr-camera-with-18-135mm-lens_500.jpeg",
        name: "CANON EOS DSLR Camera",
        mrp: "₹840",
        price: "₹360",
      },
      {
        img: "https://i.pinimg.com/736x/ae/79/4f/ae794f30d446a6a9724ef57c413129bc.jpg",
        name: "ASUS FHD Gaming Laptop",
        mrp: "₹1160",
        price: "₹700",
      },
      {
        img: "https://i.pinimg.com/736x/1b/84/4b/1b844bdd809019128c2a0953a729c673.jpg",
        name: "Curology Product Set",
        mrp: "₹860",
        price: "₹500",
      },
      
  ];
  

let temp="";
for( let i=0;i<data.length;i++){
    temp+=`        <div class="col-12 col-sm-6 col-lg-3">
          <div class="border p-3 rounded text-center shadow-sm position-relative">
            <div class="mb-3 position-relative">
              <img
                src="${data[i].img}"
                alt=""
                class="images"
              />
              <div id="discount" class="position-absolute top-0 start-0 m-2">-30%</div>
              <div class="position-absolute top-0 end-0 m-2 d-flex gap-1">
                <button class="btn btn-light btn-sm rounded-circle">
                  <i class="fa-regular fa-heart text-dark"></i>
                </button>
                <button class="btn btn-light btn-sm rounded-circle">
                  <i class="fa-regular fa-eye text-dark"></i>
                </button>
              </div>
            </div>
            <p class="fw-medium">${data[i].name}</p>
            <div class="text-warning">
              ★★★★☆ <span class="text-muted small">(35)</span>
            </div>
            <p class="text-danger fw-semibold mt-2">
              ${data[i].price} <span class="old">${data[i].mrp}</span>
            </p>
            <button class="btn btn-dark btn-sm mt-2" onclick="addtocart()">Add To Cart</button>
          </div>
        </div>
    `
}

document.getElementById("Product-List").innerHTML=temp

