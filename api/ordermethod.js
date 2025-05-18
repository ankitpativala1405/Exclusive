const OrderMethod = {
  GetAll: async () => {
    let req = await fetch("http://localhost:4000/order");
    let res = await req.json();
    return res;
  },
  Post: async (data) => {
    let request = await fetch("http://localhost:4000/order", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return request;
  },
  Create: async (data) => {
    let request = await fetch("http://localhost:4000/order", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return request;
  },
};

export default OrderMethod;