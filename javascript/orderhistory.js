async function fetchOrders({ page, search, sort, status, method }) {
  await new Promise(r => setTimeout(r, 200));
  return Array.from({ length: 5 }).map((_, i) => ({
    id: page*5 + i + 1,
    sku: "usb sealer machine",
    date: "28/3/2025, 8:15:59 pm",
    status: ["pending","shipped","completed"][i%3],
    price: 199,
    quantity: i+1,
    total: 199*(i+1),
    payment: i%2 ? "Cash on Delivery" : "Card",
    img: "" 
  }));
}

let currentPage = 0;

async function loadOrders() {
  const search = document.getElementById("orderSearch").value;
  const sort   = document.getElementById("sortSelect").value;
  const status = document.getElementById("statusSelect").value;
  const method = document.getElementById("methodSelect").value;

  const orders = await fetchOrders({ page: currentPage, search, sort, status, method });
  const container = document.getElementById("ordersList");
  container.innerHTML = "";

  orders.forEach(o => {
    const card = document.createElement("div");
    card.className = "order-card";

    card.innerHTML = `
      <div class="info">
        <p><strong>Order ID</strong> #${o.id}</p>
        <p><strong>SKU:</strong> ${o.sku}</p>
        <p><strong>Date:</strong> ${o.date}</p>
        <p><strong>Status:</strong> ${o.status}</p>
        <p><strong>Price:</strong> ₹${o.price}</p>
        <p><strong>Quantity:</strong> ${o.quantity}</p>
        <p><strong>Total:</strong> ₹${o.total}</p>
        <p><strong>Payment:</strong> ${o.payment}</p>
        <div class="actions">
          <button class="btn btn-success btn-sm">View Details</button>
          <button class="btn btn-success btn-sm">Reorder</button>
        </div>
      </div>
      <div class="thumbnail" style="background-image:url('${o.img||""}')"></div>
    `;
    container.appendChild(card);
  });
}

["orderSearch","sortSelect","statusSelect","methodSelect"]
  .forEach(id => document.getElementById(id).addEventListener("change", () => { currentPage=0; loadOrders(); }));

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentPage>0) currentPage--;
  loadOrders();
});
document.getElementById("nextBtn").addEventListener("click", () => {
  currentPage++;
  loadOrders();
});

loadOrders();
