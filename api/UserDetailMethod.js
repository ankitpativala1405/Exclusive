export const UserDetailMethod = {
  Get: async () => {
    let user = await fetch("http://localhost:4000/UserDetail", {
      method: "GET",
    });
    return user.json();
  },
  Post: async (data) => {
    let user = await fetch("http://localhost:4000/UserDetail", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return user;
  },
  Update: async (id, data) => {
    let user = await fetch(`http://localhost:4000/UserDetail/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
};
