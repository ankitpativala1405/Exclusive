
const Navbar=()=>{
    return`   <header>
      Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!!
      <span>ShopNow</span>
    </header>
    <nav>
      <div class="logo">Exclusive</div>

      <div class="nav-links">
        <a href="/index.html" class="active" >Home</a>
        <a href="#">Product</a>
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
         <a href=""> <i class="far fa-heart" style="color: black;"></i></a>
        <a href="/PAGES/cart.html"><i class="fas fa-shopping-cart" style="color: black;" ></i></a>
        </div>
      </div>
    </nav>`
}

export default Navbar;