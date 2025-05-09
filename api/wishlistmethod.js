import { apiUrl } from "../config/api";

const WishlistMethod = {
  GetWishlist: async () => {
    let req = await fetch(apiUrl.wishlist);
    let res = await req.json();
    return res;
  },
};

export default WishlistMethod
