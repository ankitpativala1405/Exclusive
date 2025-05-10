const WishlistMethod = {
  GetWishlist: async () => {
    let req = await fetch("http://localhost:4000/wishlist");
    let res = await req.json();
    return res;
  },
  CreateAll: async (data) => {
    let request = await fetch("http://localhost:4000/wishlist", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return request;
  },
  // DeleteAll: async () => {
  //   try {
  //     const allItems = await WishlistMethod.GetAll();
  //     const deleteall = allItems.map((item) =>
  //       fetch(`http://localhost:4000/wishlist/${item.sku}`, {
  //         method: "DELETE",
  //       }).catch((e) => console.error(`Failed to delete SKU ${item.sku}`, e))
  //     );
  //     await Promise.all(deleteall);
  //   } catch (e) {
  //     console.error("DeleteAll failed:", e);
  //   }
  // },
  Delete: async (sku) => {
    let req = await fetch(`http://localhost:4000/wishlist/${sku}`, {
      method: "DELETE",
    });
    return req.json();
  },
};

export default WishlistMethod;
