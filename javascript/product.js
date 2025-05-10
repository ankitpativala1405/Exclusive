import { CartMethod } from "../api/cartmethod.js";
import WishlistMethod from "../api/wishlistmethod.js";
import CompanyPolicy from "../components/companypolicy.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
import { ExportCartCount } from "./cart.js";

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("navbar").innerHTML = Navbar();

  const count = await ExportCartCount();
  document.getElementById("cart-count").innerText = `(${count})`;

  document.getElementById("footer").innerHTML = Footer();
  document.getElementById("companypolicy").innerHTML = CompanyPolicy();
});

const WishListCartCount = async () => {
  let item = await WishlistMethod.GetWishlist();
  let countitem = item.length;
  document.getElementById("wishlist-count").innerHTML = `(${countitem})`;
};
WishListCartCount();

let data = [
  {
    img: "https://i.pinimg.com/736x/fe/fa/84/fefa8431d3e4f9854aa31f625403d93b.jpg",
    name: "Breed Dry Dog Food",
    mrp: "360",
    price: "100",
    sku: "E-DE-0405001",
  },
  {
    img: "https://x.imastudent.com/content/0016823_canon-eos-90d-dslr-camera-with-18-135mm-lens_500.jpeg",
    name: "CANON EOS DSLR Camera",
    mrp: "840",
    price: "360",
    sku: "E-DE-0505001",
  },
  {
    img: "https://i.pinimg.com/736x/ae/79/4f/ae794f30d446a6a9724ef57c413129bc.jpg",
    name: "ASUS FHD Gaming Laptop",
    mrp: "1160",
    price: "700",
    sku: "E-DE-0605001",
  },
  {
    img: "https://i.pinimg.com/736x/1b/84/4b/1b844bdd809019128c2a0953a729c673.jpg",
    name: "Curology Product Set",
    mrp: "860",
    price: "500",
    sku: "E-DE-0705001",
  },
  {
    img: "https://www.ryans.com/storage/products/main/havit-hv-g92-vibration-game-11610439740.webp",
    name: "HAVIT HV-G92 Gamepad",
    mrp: "260",
    price: "120",
    sku: "E-DE-1005001",
  },
  {
    img: "https://potakait.com/image/cache/catalog/products/accessories/keyboards/imice-ak900-keyboard-400x400.jpg",
    name: "AK-900 Wired Keyboard",
    mrp: "260",
    price: "120",
    sku: "E-DE-1005001",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/54d4717de4b0950984a1ad2f/1549383946686-6C8SUVOOOZ9O7BR9B4ZU/The-Ordinary-Niacinamide-1.jpg",
    name: "The Ordinary Niacinamide",
    mrp: "750",
    price: "450",
    sku: "E-DE-0705002",
  },
  {
    img: "https://store-cdn-media.dermpro.com/catalog/product/cache/8b99c730ba180a9c59d14b80dd633e40/s/n/snake-rivers-derm-cerave-moisturizing-cream.jpg",
    name: "CeraVe Moisturizing Cream",
    mrp: "950",
    price: "620",
    sku: "E-DE-0705003",
  },
  {
    img: "https://pics.walgreens.com/prodimg/255635/11_450.jpg",
    name: "La Roche-Posay Sunscreen",
    mrp: "1200",
    price: "800",
    sku: "E-DE-0705004",
  },
  {
    img: "https://images.ctfassets.net/xvcg1y2kwpfh/7l2jTC1tpWE3ndzWqMrnLj/a936d2a05c2720daf54308adb0d76dfd/Hydro_BoostGel_Cream_Moisturiser-en-ae",
    name: "Neutrogena Hydro Boost",
    mrp: "880",
    price: "500",
    sku: "E-DE-0705005",
  },
  {
    img: "https://resource.logitech.com/w_544,h_466,ar_7:6,c_pad,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/signature-ai-edition-m750-wireless-mouse/gallery/signature-ai-edition-m750-bty1-gallery.png",
    name: "Logitech Wireless Mouse",
    mrp: "400",
    price: "250",
    sku: "E-DE-1105001",
  },
  {
    img: "https://rukminim2.flixcart.com/image/850/1000/xif0q/wallet-card-wallet/n/s/c/kyle-1-4-5-ubf130chs1037-6-wallet-urban-forest-3-7-original-imahf7t2brvnmt52.jpeg?q=20&crop=false",
    name: "Men’s Leather Wallet",
    mrp: "999",
    price: "499",
    sku: "E-DE-1105002",
  },
  {
    img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1682757035/Croma%20Assets/Entertainment/Headphones%20and%20Earphones/Images/272419_jqvb9x.png?tr=w-600",
    name: "Sony WH-1000XM5 Headphones",
    mrp: "3200",
    price: "2700",
    sku: "E-DE-1105003",
  },
  {
    img: "https://carlos.gi/cdn/shop/files/AmazonKindlePaperwhiteSignatureEdition6.8_eReader32GB-NoAds.jpg?v=1707388068",
    name: "Kindle Paperwhite",
    mrp: "980",
    price: "760",
    sku: "E-DE-1105004",
  },
  {
    img: "https://dailydeals365.in/wp-content/uploads/2024/07/Skullcandy-Sesh-Evo-Truly-Wireless-Bluetooth-in-Ear-Earbuds-with-Mic-Chill-Grey-Black.webp",
    name: "Skullcandy Sesh Earbuds",
    mrp: "420",
    price: "300",
    sku: "E-DE-1105005",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkzm330_QXVLpQJnT6jKW3ixSYYI9Vka9t6Q&s",
    name: "Bluetooth Speaker",
    mrp: "928",
    price: "196",
    sku: "E-DE-0008001",
  },
  {
    img: "https://m.media-amazon.com/images/I/71GHU3x010L.jpg",
    name: "Pet Automatic Feeder",
    mrp: "624",
    price: "392",
    sku: "E-DE-0008002",
  },
  {
    img: "https://m.media-amazon.com/images/I/710xL6-GHGL.jpg",
    name: "Compact DSLR Tripod",
    mrp: "352",
    price: "191",
    sku: "E-DE-0008003",
  },
  {
    img: "https://media.wired.com/photos/6504b2a1afe02332db973557/4:3/w_960,c_limit/Ugreen_Power_Bank-SOURCE-Ugreen-Gear.jpg",
    name: "Portable Power Bank",
    mrp: "1195",
    price: "269",
    sku: "E-DE-0008004",
  },
  {
    img: "https://m.media-amazon.com/images/I/71j7LCEqXeL._AC_UF1000,1000_QL80_.jpg",
    name: "Smart Fitness Watch",
    mrp: "553",
    price: "369",
    sku: "E-DE-0008005",
  },
  {
    img: "https://www.edusquadz.in/cdn/shop/files/AIWaft-pen-tab-with-pen.jpg?v=1741245775",
    name: "Digital Drawing Tablet",
    mrp: "865",
    price: "436",
    sku: "E-DE-0008006",
  },
  {
    img: "https://www.theaudiostore.in/cdn/shop/files/sony-wf-c700n-noise-canceling-true-wireless-earbuds-black-43226780303615.webp?v=1744396416",
    name: "Noise Cancelling Earbuds",
    mrp: "901",
    price: "193",
    sku: "E-DE-0008007",
  },
  {
    img: "https://m.media-amazon.com/images/I/714TjtxQJSL.jpg",
    name: "Air Purifier",
    mrp: "1394",
    price: "571",
    sku: "E-DE-0008008",
  },
  {
    img: "https://www.tvs-e.in/wp-content/uploads/2022/11/Champ-Ikon-Website-Image-1-300x300.jpg",
    name: "Wireless Mouse",
    mrp: "974",
    price: "433",
    sku: "E-DE-0008009",
  },
  {
    img: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202002/Mi_Electric_Toothbrush_T300__1.jpeg?size=1200:675",
    name: "Electric Toothbrush",
    mrp: "1064",
    price: "492",
    sku: "E-DE-0008010",
  },
];

let currentPage = 1;
const itemsPerPage = 12;

const UiMaker = (page = 1) => {
  document.getElementById("Product-List").innerHTML = "";

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = data.slice(start, end);

  paginatedItems.map((product) => {
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
    discount.innerText = `${Math.round(
      (parseFloat(product.price) * 100) / parseFloat(product.mrp) - 100
    )}%`;

    const iconsWrapper = document.createElement("div");
    iconsWrapper.className = "position-absolute top-0 end-0 m-2 d-flex gap-1";

    const heartBtn = document.createElement("button");
    heartBtn.className = "btn btn-light btn-sm rounded-circle";
    heartBtn.innerHTML = '<i class="fa-regular fa-heart text-dark"></i>';
    heartBtn.addEventListener("click", async () => {
      let req = await CartMethod.PostWishlist(product);
      let res = await req.json();
      alert("Added to Wishlist");
      location.reload();
    });

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

    const sku = document.createElement("p");
    sku.className = "text-muted small mb-1";
    sku.innerText = `SKU: ${product.sku}`;

    const rating = document.createElement("div");
    rating.className = "text-warning";
    rating.innerHTML = '★★★★☆ <span class="text-muted small">(262)</span>';

    const price = document.createElement("p");
    price.className = "text-danger fw-semibold mt-2";
    price.innerHTML = `₹${product.price} <span class="old">₹${product.mrp}</span>`;

    const addToCartBtn = document.createElement("button");
    addToCartBtn.className = "btn btn-dark btn-sm mt-2";
    addToCartBtn.innerText = "Add To Cart";
    addToCartBtn.addEventListener("click", async () => {
      let CartItem = await CartMethod.GetAll();
      let IsExist = CartItem.find((item) => item.sku === product.sku);

      if (IsExist) {
        let sku = IsExist.sku;
        let quantity = IsExist.quantity;
        let upadteitem = { ...IsExist, quantity: quantity + 1 };
        await CartMethod.Update(sku, upadteitem);
        alert(`${product.name} quantity increased in cart`);
        location.reload()
      } else {
        let CartAdd = { ...product, quantity: 1 };
        await CartMethod.Post(CartAdd);
        alert(`${product.name} added to cart!`);
        location.reload()
      }
    });

    card.appendChild(imageWrapper);
    card.appendChild(name);
    card.appendChild(sku);
    card.appendChild(rating);
    card.appendChild(price);
    card.appendChild(addToCartBtn);

    col.appendChild(card);
    document.getElementById("Product-List").appendChild(col);
  });

  createPagination();
};

//pagination..
const createPagination = () => {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  document.getElementById("pagination").innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.innerHTML = i;
    if (i === currentPage) {
      pageBtn.setAttribute("class","btn btn-sm me-1 btn-dark")
    }else{
      pageBtn.setAttribute("class","btn btn-sm me-1 btn-outline-dark")
    }

    pageBtn.addEventListener("click", () => {
      currentPage = i;
      UiMaker(currentPage);
    });
    document.getElementById("pagination").appendChild(pageBtn);
  }
};

UiMaker(currentPage);
