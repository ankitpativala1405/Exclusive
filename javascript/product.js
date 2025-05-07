import { CartMethod } from "../api/cartmethod.js";
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

const UiMaker = () => {
  document.getElementById("Product-List").innerHTML = "";

  data.map((product) => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-3";

    const card = document.createElement("div");
    card.className =
      "border p-3 rounded text-center shadow-sm position-relative";

    const imageWrapper = document.createElement("div");
    imageWrapper.className = "mb-3 position-relative";

    const img = document.createElement("img");
    img.src = product.img;
    img.alt = product.name;
    img.className = "images";

    const discount = document.createElement("div");
    discount.id = "discount";
    discount.className = "position-absolute top-0 start-0 m-2";
    discount.innerText = "-30%";

    const iconsWrapper = document.createElement("div");
    iconsWrapper.className = "position-absolute top-0 end-0 m-2 d-flex gap-1";

    const heartBtn = document.createElement("button");
    heartBtn.className = "btn btn-light btn-sm rounded-circle";
    heartBtn.innerHTML = '<i class="fa-regular fa-heart text-dark"></i>';

    const eyeBtn = document.createElement("button");
    eyeBtn.className = "btn btn-light btn-sm rounded-circle";
    eyeBtn.innerHTML = '<i class="fa-regular fa-eye text-dark"></i>';

    iconsWrapper.appendChild(heartBtn);
    iconsWrapper.appendChild(eyeBtn);

    imageWrapper.appendChild(img);
    imageWrapper.appendChild(discount);
    imageWrapper.appendChild(iconsWrapper);

    const name = document.createElement("p");
    name.className = "fw-medium";
    name.innerText = product.name;

    const rating = document.createElement("div");
    rating.className = "text-warning";
    rating.innerHTML = '★★★★☆ <span class="text-muted small">(35)</span>';

    const price = document.createElement("p");
    price.className = "text-danger fw-semibold mt-2";
    price.innerHTML = `${product.price} <span class="old">${product.mrp}</span>`;

    const addToCartBtn = document.createElement("button");
    addToCartBtn.className = "btn btn-dark btn-sm mt-2";
    addToCartBtn.innerText = "Add To Cart";
    addToCartBtn.addEventListener("click", async() => {

        console.log(product);
        
        const req=await CartMethod.Post(product)
        const res=await req.json()
        console.log("cart added:", res);
        alert("cart added");
 
    // let CartItem=await CartMethod.GetAll();
  
    // let IsExist = CartItem.find((item) => item.id === product.id);

    // if (IsExist) {
    //   let upadteitem = { ...IsExist, quantity: IsExist.quantity + 1 };
    //   await CartMethod.Update(IsExist.id, upadteitem);
    //   alert(`${product.name} has been increase in cart`);
    // } else {
    //   let CartAdd = { ...product, quantity: 1 };
    //   await CartMethod.Post(CartAdd);
    //   console.log("Product added to cart.");
    //   alert(`${product.name} added to cart!`);
    // }
    });

    card.appendChild(imageWrapper);
    card.appendChild(name);
    card.appendChild(rating);
    card.appendChild(price);
    card.appendChild(addToCartBtn);

    col.appendChild(card);
    document.getElementById("Product-List").appendChild(col);
  });
};
UiMaker();

