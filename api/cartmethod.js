import { apiUrl } from "../config/api.js";

export const CartMethod = {
  GetAll: async () => {
    let req = await fetch(apiUrl.carts);
    let res = await req.json();
    return res;
  },
  Post: async (data) => {
    let request = await fetch(apiUrl.carts, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return request;
  },
  Update: async (sku, data) => {
    console.log("skus", sku);

    await fetch(`${apiUrl.carts}/${sku}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
  DeleteAll: async () => {
    const allItems = await CartMethod.GetAll();
    const deleteall = allItems.map(item => 
      fetch(`${apiUrl.carts}/${item.id}`, {
        method: "DELETE",
      })
    );
    await Promise.all(deleteall);
  },
  GetByID: async (id) => {
    let req = await fetch(`${apiUrl.carts}/${id}`);
    let res = await req.json();
    return res;
  },
  Create: async (data) => {
    let request = await fetch(apiUrl.orders, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return request;
  },
};
