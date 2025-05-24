const Navbar = () => {
  
  return `   <header>
      Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!!
      <span><a href="/PAGES/product.html" style="color: yellow;">ShopNow</a></span>
    </header>
    <nav>
      <div class="logo">Exclusive</div>

      <div class="nav-links">
        <a href="/index.html" class="active" >Home</a>
        <a href="/PAGES/product.html">Product</a>
        <a href="/PAGES/contact.html">Contact</a>
        <a href="/PAGES/about.html">About</a>
        <a href="/PAGES/signup.html">Sign Up</a>
        <a href="/PAGES/login.html">Login</a>
      </div>

      <div class="search-container">
        <input
          type="text"
          class="search-box"
          placeholder="What are you looking for?"
        />
        <!-- <i class="fas fa-search"></i> -->
        <div class="icons">
         <a href="/PAGES/wishlist.html" style="text-decoration: none; color: black;">
            <i class="far fa-heart" style="margin-top: 10px;">&nbsp;<span id="wishlist-count">(0)</span></i>    
         </a>

         <a href="/PAGES/cart.html" style="text-decoration: none; color: black; display: inline-flex; align-items: center;">
            <i class="fas fa-shopping-cart" style="margin-top: 5px;"></i>
              <span id="cart-count" style="margin-left: 5px;">(0)</span>
         </a>

        <div class="profile-menu">
        <div class="profile-icon">
             <i class="fas fa-user" style="margin-left: 2.5px;"></i>
        </div>
        <div class="dropdown">
          <a href="/PAGES/account.html"><i class="fas fa-user-cog"></i> Manage My Account</a>
          <a href="/PAGES/orderhistory.html"><i class="fas fa-box"></i> My Order</a>
          <a href="#"><i class="fas fa-times-circle"></i> My Cancellations</a>
          <a href="#"><i class="fas fa-star"></i> My Reviews</a>
          <a href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>
        </div>
      </div>
      </div>
      </div>
    </nav>`;
};

export default Navbar;
