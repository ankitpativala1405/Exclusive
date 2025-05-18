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
  Update: async (id, data) => {
    await fetch(`http://localhost:4000/order/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
  // Create: async (data) => {
  //   let request = await fetch("http://localhost:4000/order", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   return request;
  // },
  delete: async (id) => {
    let req = await fetch(`http://localhost:4000/order/${id}`, {
      method: "DELETE",
    });
    return req.json();
  },
  Create: async (data) => {
  let request = await fetch("http://localhost:4000/order", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return request; // you'll call .json() later in handler
},
};

export default OrderMethod;
