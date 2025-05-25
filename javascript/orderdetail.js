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
  document.getElementById("cart-count").innerText = `(${count || 0})`;

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

  //   if (matchedOrders.length > 0) {
  //   const order = matchedOrders[0];

  //   // Example values - ensure these fields exist in your order object
  //   const sellerAddress = `${order.sellerName}<br>${order.sellerAddress}`;
  //   const buyerAddress = `${order.buyerName}<br>${order.buyerAddress}`;
  //   const productName = order.productName || "Product";
  //   const productImg = order.productImage || "https://via.placeholder.com/100";
  //   const color = order.color || "N/A";
  //   const size = order.size || "N/A";
  //   const price = order.price || 0;
  //   const shipping = order.shipping || 0;
  //   const platformFee = order.platformFee || 0;
  //   const total = price + shipping - platformFee;

  //   document.getElementById("orderCard").innerHTML = `
  //     <div class="order-card">
  //       <div class="container">
  //         <!-- Status header -->
  //         <div class="status-container">
  //           <div class="status-header">
  //             <div class="d-flex align-items-center">
  //               <span class="me-2" style="color: #e53935; font-size: 21px">●</span>
  //               <span style="font-size: 17px; font-weight: 500; color: #636466">
  //                 ${order.statusText || "With courier en route"}
  //               </span>
  //             </div>
  //           </div>

  //           <!-- Status Steps -->
  //           <div class="status-indicator">
  //             ${generateStatusSteps(order.status)}
  //           </div>
  //         </div>
  //       </div>
  //       <hr />
  //       <div class="row g-3 flex-wrap">
  //         <div class="col-md-5 col-12 w-50 p-5">
  //           <div class="row">
  //             <div class="col-sm-6">
  //               <div class="mb-2 fw-semibold">Shipping Address (Seller)</div>
  //               <div style="color: #444; line-height: 1.6">${sellerAddress}</div>
  //             </div>
  //             <div class="col-sm-6">
  //               <div class="mb-2 fw-semibold">Shipping Address (Buyer)</div>
  //               <div style="color: #444; line-height: 1.6">${buyerAddress}</div>
  //             </div>
  //           </div>

  //           <!-- Order Summary -->
  //           <div class="mt-4">
  //             <div class="fw-semibold mb-2">Order Summary</div>
  //             <div class="d-flex justify-content-between order-summary-row">
  //               <span class="order-summary-label">Product Price</span>
  //               <span>₹ ${price.toFixed(2)}</span>
  //             </div>
  //             <div class="d-flex justify-content-between order-summary-row">
  //               <span class="order-summary-label">Shipping cost</span>
  //               <span>₹ 100.00</span>
  //             </div>
  //             <div class="d-flex justify-content-between order-summary-row">
  //               <span class="order-summary-label">Platform fees</span>
  //               <span>₹ 000.00</span>
  //             </div>
  //             <hr class="my-2" />
  //             <div class="d-flex justify-content-between order-summary-row">
  //               <span class="order-summary-total">Total Sales</span>
  //               <span class="order-summary-total">RP ${total}</span>
  //             </div>
  //           </div>

  //           <!-- Order Item -->
  //           <div class="mt-4">
  //             <div class="fw-semibold fs-5 mb-3">Order Item</div>
  //             <div class="d-flex align-items-start mb-3 order-items">
  //               <img src="${productImg}" alt="${productName}" />
  //               <div>
  //                 <div style="color: #bbb; font-size: 14px">${productName}</div>
  //                 <div class="fw-semibold" style="font-size: 18px">${productName}</div>
  //                 <div style="font-size: 14px; color: #555">
  //                   Color: ${color} &nbsp; | &nbsp; Size: ${size}
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>

  //         <!-- Tracking Steps -->
  //         <div class="col-md-5 col-12 order-side-col">
  //           <div class="order-tracker mt-2">
  //             ${generateTrackerSteps(order.status)}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   `;
  // }

    if (matchedOrders.length > 0) {
    const order = matchedOrders[0];
    console.log("order",order);
    

    // Convert price-related fields to numbers
    const price = parseFloat(order.price) || 0;
    const shipping = parseFloat(order.shipping) || 100;
    const platformFee = parseFloat(order.platformFee) || 0;
    const total = price + shipping - platformFee;

    const sellerAddress = `${order.sellerName}<br>${order.sellerAddress}`;
    const buyerAddress = `${order.buyerName}<br>${order.buyerAddress}`;
    const productName = order.name || "Product";
    const productImg = order.img || "https://via.placeholder.com/100";
    const color = order.color || "N/A";
    const size = order.size || "N/A";

    document.getElementById("orderCard").innerHTML = `
      <div class="order-card">
        <div class="container">
          <!-- Status header -->
          <div class="status-container">
            <div class="status-header">
              <div class="d-flex align-items-center">
                <span class="me-2" style="color: #e53935; font-size: 21px">●</span>
                <span style="font-size: 17px; font-weight: 500; color: #636466">
                  ${order.statusText || "With courier en route"}
                </span>
              </div>
            </div>

            <!-- Status Steps -->
            <div class="status-indicator">
              ${generateStatusSteps(order.status)}
            </div>
          </div>
        </div>
        <hr />
        <div class="row g-3 flex-wrap">
          <div class="col-md-5 col-12 w-50 p-5">
            <div class="row">
              <div class="col-sm-6">
                <div class="mb-2 fw-semibold">Shipping Address (Seller)</div>
                <div style="color: #444; line-height: 1.6">${sellerAddress}</div>
              </div>
              <div class="col-sm-6">
                <div class="mb-2 fw-semibold">Shipping Address (Buyer)</div>
                <div style="color: #444; line-height: 1.6">${buyerAddress}</div>
              </div>
            </div>

            <!-- Order Summary -->
            <div class="mt-4">
              <div class="fw-semibold mb-2">Order Summary</div>
              <div class="d-flex justify-content-between order-summary-row">
                <span class="order-summary-label">Product Price</span>
                <span>₹ ${price.toFixed(2)}</span>
              </div>
              <div class="d-flex justify-content-between order-summary-row">
                <span class="order-summary-label">Shipping cost</span>
                <span>₹ ${shipping.toFixed(2)}</span>
              </div>
              <div class="d-flex justify-content-between order-summary-row">
                <span class="order-summary-label">Platform fees</span>
                <span>₹ ${platformFee.toFixed(2)}</span>
              </div>
              <hr class="my-2" />
              <div class="d-flex justify-content-between order-summary-row">
                <span class="order-summary-total">Total Sales</span>
                <span class="order-summary-total">₹ ${total.toFixed(2)}</span>
              </div>
            </div>

            <!-- Order Item -->
            <div class="mt-4">
              <div class="fw-semibold fs-5 mb-3">Order Item</div>
              <div class="d-flex align-items-start mb-3 order-items">
                <img src="${productImg}" alt="${productName}" />
                <div>
                  <div style="color: #bbb; font-size: 14px">${productName}</div>
                  <div class="fw-semibold" style="font-size: 18px">${productName}</div>
                  <div style="font-size: 14px; color: #555">
                    Color: ${color} &nbsp; | &nbsp; Size: ${size}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tracking Steps -->
          <div class="col-md-5 col-12 order-side-col">
            <div class="order-tracker mt-2">
              ${generateTrackerSteps(order.status)}
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
};

const generateStatusSteps = (currentStatus) => {
  let steps = ["Ordered", "Payment", "Packed", "Shipped", "Delivered","Cancelled"];
  let icons = ["fas fa-file-alt","fas fa-credit-card","fas fa-box-open","fas fa-truck","fas fa-check-circle", "fas fa-times-circle"];

  return steps.map((step, index) => {
      let statusClass =
        index < steps.indexOf(currentStatus) ? "completed" :
        index === steps.indexOf(currentStatus) ? "active" : "";

      return `
        <div class="status-step ${statusClass}">
          <div class="icon-box">
            <i class="${icons[index]}"></i>
          </div>
          <div>
            <span>${step}</span>
            <div class="subtitle">${step === "Complete" ? "Order completed" : ""}</div>
          </div>
        </div>`;
    })
    .join("");
};

const generateTrackerSteps = (currentStatus) => {
  let steps = ["Ordered", "Payment", "Packed", "Shipped", "Delivered","Cancelled"];
  return steps.map((step, index) => {
      const statusClass = index < steps.indexOf(currentStatus) ? "completed" : index === steps.indexOf(currentStatus) ? "active" : "";

      return `
        <div class="tracker-step ${statusClass}">
          <div class="tracker-dot"></div>
          <div>
            <div class="label">${step}</div>
            <div class="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
          </div>
          ${index < steps.length - 1 ? '<div class="tracker-line"></div>' : ""}
        </div>`;
    })
    .join("");
};
