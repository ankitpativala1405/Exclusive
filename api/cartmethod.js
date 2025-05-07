import { apiUrl } from "../config/api.js";

export const CartMethod = {
  GetAll: async () => {
    let req = await fetch(apiUrl.carts);
    let res = await req.json();
    return res;
  },
  Post: async (data) => {
   let request= await fetch(apiUrl.carts, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return request;
  },
  Update: async (id, data) => {
    await fetch(`${apiUrl.carts}/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
  Delete: async (id) => {
    await fetch(`${apiUrl.carts}/${id}`, {
      method: "DELETE",
    });
  },
  GetByID: async (id) => {
    let req = await fetch(`${apiUrl.carts}/${id}`);
    let res = await req.json();
    return res;
  },
};
