import OrderMethod from "../api/ordermethod.js";
import Navbar from "../components/navbar.js";

document.getElementById("navbar").innerHTML = Navbar();

let allOrders = [];

const UiMaker = async () => {
  try {
    let OrderData = await OrderMethod.GetAll();
    allOrders = OrderData;
    renderTable(allOrders);
    setupFilters();
  } catch (err) {
    console.error("Failed to fetch orders:", err);
  }
};

const renderTable = (data) => {
  const tbody = document.getElementById("tablebody");
  tbody.innerHTML = "";

  data.forEach(item => {
    let tr = document.createElement("tr");

    const tdValues = [
      item.orderId, item.username, item.date, item.name,
      item.price, item.quantity, item.sku, item.total,
      item.payment, item.status
    ];

    tdValues.forEach(val => {
      let td = document.createElement("td");
      td.textContent = val;
      tr.appendChild(td);
    });

    const actionTd = document.createElement("td");
    const button = document.createElement("button");
    button.textContent = "Change Status";
    button.classList.add("change-status-btn");
    button.addEventListener("click", () => showStatusForm(item._id, item.status));
    actionTd.appendChild(button);
    tr.appendChild(actionTd);

    tbody.appendChild(tr);
  });
};

const setupFilters = () => {
  const filterElements = document.querySelectorAll("#filter-row input[data-key], #filter-row select");

  filterElements.forEach(el => {
    el.addEventListener("input", filterData);
    el.addEventListener("change", filterData);
  });

  document.getElementById("startDate").addEventListener("change", filterData);
  document.getElementById("endDate").addEventListener("change", filterData);
};

const filterData = () => {
  const filterElements = document.querySelectorAll("#filter-row input[data-key], #filter-row select");

  const filters = Array.from(filterElements).reduce((acc, el) => {
    acc[el.dataset.key] = el.value.toLowerCase();
    return acc;
  }, {});

  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;

  const filtered = allOrders.filter(order => {
    const matches = Object.entries(filters).every(([key, val]) =>
      val === "" || order[key]?.toString().toLowerCase().includes(val)
    );

    if (!matches) return false;

    if (startDate || endDate) {
      const orderDate = new Date(order.date);
      if (startDate && new Date(startDate) > orderDate) return false;
      if (endDate && new Date(endDate) < orderDate) return false;
    }

    return true;
  });

  renderTable(filtered);
};

const showStatusForm = (orderId, currentStatus) => {
  document.getElementById("orderIdInput").value = orderId;
  document.getElementById("statusSelect").value = currentStatus;
  document.getElementById("statusFormContainer").style.display = "block";
};

document.getElementById("cancelFormBtn").addEventListener("click", () => {
  document.getElementById("statusFormContainer").style.display = "none";
});

document.getElementById("statusForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const orderId = document.getElementById("orderIdInput").value;
  const newStatus = document.getElementById("statusSelect").value;

  try {
    await OrderMethod.UpdateStatus(orderId, newStatus);
    alert("Status updated successfully!");
    document.getElementById("statusFormContainer").style.display = "none";
    UiMaker(); 
  } catch (err) {
    console.error("Update failed:", err);
    alert("Failed to update status.");
  }
});

UiMaker();
