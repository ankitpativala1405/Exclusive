const LoginMethod = {
  create: async (data) => {
    const request = await fetch("http://localhost:4000/LoggedUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return request;
  },
  GetAll: async () => {
    const request = await fetch("http://localhost:4000/LoggedUser");
    let response = await request.json();
    return response;
  },
  update: async (data, id) => {
    await fetch(`http://localhost:4000/LoggedUser/${id}`, {
      method: "PATCH",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
  getById: async (username) => {
    const request = await fetch(`http://localhost:4000/LoggedUser/${username}`);
    const response = await request.json();
    return response;
  },
};

export default LoginMethod;
