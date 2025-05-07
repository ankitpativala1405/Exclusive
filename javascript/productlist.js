

let temp="";
for( let i=0;i<data.length;i++){
    temp+=`        <div class="col-12 col-sm-6 col-lg-3">
          <div class="border p-3 rounded text-center shadow-sm position-relative">
            <div class="mb-3 position-relative">
              <img
                src="https://i.pinimg.com/736x/fe/fa/84/fefa8431d3e4f9854aa31f625403d93b.jpg"
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
            <p class="fw-medium">Breed Dry Dog Food</p>
            <div class="text-warning">
              ★★★★☆ <span class="text-muted small">(35)</span>
            </div>
            <p class="text-danger fw-semibold mt-2">
              ₹100 <span class="old">₹360</span>
            </p>
            <button class="btn btn-dark btn-sm mt-2" onclick="addtocart()">Add To Cart</button>
          </div>
        </div>
    `
}

document.getElementById("Product-List").innerHTML=temp

let data = [
  {
    img: "https://i.pinimg.com/736x/fe/fa/84/fefa8431d3e4f9854aa31f625403d93b.jpg",
    name: "Breed Dry Dog Food",
    mrp: "₹360",
    price: "₹100",
  },
];
