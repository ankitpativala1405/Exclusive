const UserMethod = {
  create: async (data) => {
    const request = await fetch("http://localhost:4000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return request;
  },
  GetAll: async () => {
    const request = await fetch("http://localhost:4000/user");
    let response = await request.json();
    return response;
  },
  update: async (data, id) => {
    await fetch(`http://localhost:4000/user/${id}`, {
      method: "PATCH",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
  emailExists: async (email) => {
    let requestemail = await fetch(`http://localhost:4000/user?email=${email}`);
    let responseemail = await requestemail.json();
    
    // if(responseemail.length >0){
    //   return responseemail;
    // }

    // let requestusername=await fetch(`http://localhost:4000/user?username=${email}`)
    // let responceusername = await requestusername.json();
    return responseemail
    
  }
};

// module.exports=UserMethod
export default UserMethod

