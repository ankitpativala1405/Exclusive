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
  return request; 
},
 UpdateStatus: async (id, status) => {
    const res = await fetch(`http://localhost:4000/order/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    });
    return await res.json();
  }
};

export default OrderMethod;
