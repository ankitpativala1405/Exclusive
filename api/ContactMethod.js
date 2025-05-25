const Contactmethod = {
  Get: async () => {
    let res = await (await fetch("http://localhost:4000/contact")).json();
    return res;
  },
  create: async (data) => {
    let req= await fetch("http://localhost:4000/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return req
  },
  delete: async (id) => {
    let res = await fetch(`http://localhost:4000/contact/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },
};

export default Contactmethod;