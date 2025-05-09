import { apiUrl } from "../config/api";

export const OrderMethod = {
  GetAll: async () => {
    let req = await fetch(apiUrl.orders);
    let res = await req.json();
    return res;
  },
  Post: async (data) => {
    let request = await fetch(apiUrl.orders, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return request;
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
    GetWishlist: async () => {
    let req = await fetch(apiUrl.wishlist);
    let res = await req.json();
    return res;
  },
};

