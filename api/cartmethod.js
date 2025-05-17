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
    await fetch(`${apiUrl.carts}/${sku}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
  DeleteAll: async () => {
    let CartItem = await CartMethod.GetAll();
    let LsUser = JSON.parse(localStorage.getItem("user"));
    const allItems = CartItem.filter(
      (products) => products.username == LsUser.username
    );
    console.log("allItems", allItems);
    const deleteall = allItems.map((item) =>
      fetch(`${apiUrl.carts}/${item.sku}`, {
        method: "DELETE",
      }).catch((e) => console.error(`Failed to delete SKU ${item.sku}`, e))
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
  PostWishlist: async (data) => {
    let request = await fetch(apiUrl.wishlist, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return request;
  },
  Delete: async (id) => {
    let req = await fetch(`${apiUrl.carts}/${id}`, {
      method: "DELETE",
    });
    return req.json();
  },
  GetAllOrder: async () => {
    let req = await fetch("http://localhost:4000/order");
    let res = await req.json();
    return res;
  },
};
