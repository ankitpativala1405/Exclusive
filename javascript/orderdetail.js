import OrderMethod from "../api/ordermethod.js";
import CompanyPolicy from "../components/companypolicy.js";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
import { ExportCartCount } from "./cart.js";

document.getElementById("navbar").innerHTML = Navbar();
document.getElementById("companypolicy").innerHTML = CompanyPolicy();
document.getElementById("footer").innerHTML = Footer();

document.addEventListener("DOMContentLoaded", async () => {
  const count = await ExportCartCount();
  document.getElementById("cart-count").innerText = `( ${count} )`;

  let WantData = JSON.parse(sessionStorage.getItem("ViewOrderDetail"));
  console.log(WantData);

  document.getElementsByTagName(
    "h2"
  )[0].innerHTML = `Order ID : ${WantData.orderId}`;
  ShowDataOnDisplay();
});

document.getElementById("ContactSeller").addEventListener("click", () => {
  window.location.href = "/PAGES/contact.html";
});
document.getElementById("ViewInvoice").addEventListener("click", () => {
  alert("Your Invoice is Generating...");
});

const ShowDataOnDisplay = async () => {
  let allOrders = await OrderMethod.GetAll();

  let sessionData = JSON.parse(sessionStorage.getItem("ViewOrderDetail"));

  let matchedOrders = allOrders.filter((order) =>order.username === sessionData.username && order.orderId === sessionData.orderId &&
   order.sku === sessionData.sku);

  console.log("Matched Orders:", matchedOrders);

  if(matchedOrders){
    document.getElementById("orderCard").innerHTML=`
          <div class="order-card">
     <div class="container">
      <div class="status-container">
        <div class="status-header">
          <div class="d-flex align-items-center">
            <span class="me-2" style="color: #e53935; font-size: 21px">●</span>
            <span style="font-size: 17px; font-weight: 500; color: #636466">
              With courier en route
            </span>
          </div>
          <div class="resi">
            No Resi : <b>34u455y566y</b>
          </div>
        </div>

        <div class="status-indicator">
          <!-- Order Made -->
          <div class="status-step completed">
            <div class="icon-box">
              <i class="fas fa-file-alt"></i>
            </div>
            <div>
              <span>Order made</span>
              <div class="subtitle">Create order</div>
            </div>
          </div>

          <!-- Order Paid -->
          <div class="status-step completed">
            <div class="icon-box">
              <i class="fas fa-credit-card"></i>
            </div>
            <div>
              <span>Order paid</span>
              <div class="subtitle">Customer payment</div>
            </div>
          </div>

          <!-- order packed -->

          <div class="status-step completed">
            <div class="icon-box">
              <i class="fas fa-box-open tracker-icon"></i>
             </div>
          <div>
            <div class="label">Order Packed</div>
             <div class="subtitle">Customer payment</div>
            </div>
           <!-- <div class="tracker-line"></div> -->
          </div>


          <!-- Shipped -->
          <div class="status-step active" >
            <div class="icon-box">
              <i class="fas fa-truck"></i>
            </div>
            <div>
              <span>Shipped</span>
              <div class="subtitle">On delivery</div>
            </div>
          </div>

          <!-- Complete -->
          <div class="status-step">
            <div class="icon-box">
              <i class="fas fa-check-circle tracker-icon"></i>
            </div>
            <div>
              <span>Complete</span>
              <div class="subtitle">Order completed</div>
            </div>
          </div>

        </div>
      </div>
    </div>
        <hr />
        <div class="row g-3 flex-wrap">
          <div class="col-md-5 col-12 w-50 p-5">
            <div class="row">
              <div class="col-sm-6">
                <div class="mb-2 fw-semibold">Shipping Address(Seller)</div>
                <div style="color: #444; line-height: 1.6">
                  Double crrl a<br />123 market street<br />PA 15632,<br />USA
                </div>
              </div>
              <div class="col-sm-6">
                <div class="mb-2 fw-semibold">Shipping Address(Buyer)</div>
                <div style="color: #444; line-height: 1.6">
                  Double crrl a<br />123 market street<br />PA 15632,<br />USA
                </div>
              </div>
            </div>
            <div class="mt-4">
              <div class="fw-semibold mb-2">Order Summery</div>
              <div class="d-flex justify-content-between order-summary-row">
                <span class="order-summary-label">Product Price</span>
                <span>RP 888.00</span>
              </div>
              <div class="d-flex justify-content-between order-summary-row">
                <span class="order-summary-label">Shipping cost</span>
                <span>RP 74.00</span>
              </div>
              <div class="d-flex justify-content-between order-summary-row">
                <span class="order-summary-label">Platform fees</span>
                <span>-RP4.00</span>
              </div>
              <hr class="my-2" />
              <div class="d-flex justify-content-between order-summary-row">
                <span class="order-summary-total">Total Sales</span>
                <span class="order-summary-total">RP 876.500</span>
              </div>
            </div>
            <div class="mt-4">
              <div class="fw-semibold fs-5 mb-3">Order Item</div>
              <!-- Item 1 -->
              <div class="d-flex align-items-start mb-3 order-items">
                <img
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80"
                  alt="Sneaker"
                />
                <div>
                  <div style="color: #bbb; font-size: 14px">Sneaker</div>
                  <div class="fw-semibold" style="font-size: 18px">
                    Sneakers
                  </div>
                  <div style="font-size: 14px; color: #555">
                    Color : Black &nbsp; | &nbsp; Size :44
                  </div>
                </div>
              </div>
              <!-- Item 2 -->
              <div class="d-flex align-items-start mb-3 order-items">
                <img
                  src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80"
                  alt="Jacket"
                />
                <div>
                  <div style="color: #bbb; font-size: 14px">Jacket</div>
                  <div class="fw-semibold" style="font-size: 18px">Jacket</div>
                  <div style="font-size: 14px; color: #555">
                    Color : Black &nbsp; | &nbsp; Size :XL
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-1 d-none d-md-block"></div>
          
          <div class="col-md-5 col-12 order-side-col">
            <div class="order-tracker mt-2">
              <div class="tracker-step completed">
                <div class="tracker-dot"></div>
                <div>
                  <div class="label">Ordered</div>
                  <div class="desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod
                  </div>
                </div>
                <div class="tracker-line"></div>
              </div>
              <div class="tracker-step completed">
                <div class="tracker-dot"></div>
                <div>
                  <div class="label">Payment</div>
                  <div class="desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod
                  </div>
                </div>
                <div class="tracker-line"></div>
              </div>
              <div class="tracker-step active" >
                <div class="tracker-dot"></div>
                <div>
                  <div class="label">Packed</div>
                  <div class="desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod
                  </div>
                </div>
                <div class="tracker-line"></div>
              </div>
              <div class="tracker-step ">
                <div class="tracker-dot"></div>
                <div>
                  <div class="label">Shipped</div>
                  <div class="desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod
                  </div>
                </div>
                <div class="tracker-line"></div>
              </div>
              <div class="tracker-step">
                <div class="tracker-dot"></div>
                <div>
                  <div class="label">Delivered</div>
                  <div class="desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
  }
};
