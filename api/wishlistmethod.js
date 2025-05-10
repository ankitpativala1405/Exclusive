const WishlistMethod = {
  GetWishlist: async () => {
    let req = await fetch("http://localhost:4000/wishlist");
    let res = await req.json();
    return res;
  },
};

export default WishlistMethod