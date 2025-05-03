const Footer = () => {
  return `<footer style="background-color: #000; color: #fff; padding: 20px;">
  <div class="footer-container" style="display: flex; justify-content: space-between;">
    
    <div class="exclusive-section" style="width: 20%;">
      <h4>Exclusive</h4>
      <p style="margin-top: 10px;">Subscribe</p>
      <p style="margin-top: 5px;">Get 10% off your first order.</p>
      <br>
      <input type="email" placeholder="Enter your email" style="width: 80%; padding: 5px;"/>
      <button style="padding: 5px;">→</button>
    </div>
    
    <div class="support-section" style="width: 20%;">
      <h4>Support</h4>
      <p style="margin-top: 10px;">2nd Floor,Bhavya Complex,Dabholi char rasta,Ved Road,surat-395004.</p>
      <p style="margin-top: 5px;">Exclusive@gmail.com</p>
      <p style="margin-top: 5px;">+91 95-8888-9999</p>
    </div>
    
    <div class="account-section" style="width: 20%;">
      <h4>Account</h4>
      <ul style="list-style-type: none; padding: 0; ">
        <li style="margin-top: 10px;"><a href="/PAGES/account.html" style="color: white; text-decoration: none;">My Account</a></li>
        <li style="margin-top: 5px;"><a href="/PAGES/signup.html" style="color: white; text-decoration: none;">Register</a></li>
        <li style="margin-top: 5px;"><a href="/PAGES/login.html" style="color: white; text-decoration: none;">Login</a></li>
        <li style="margin-top: 5px;"><a href="/PAGES/cart.html" style="color: white; text-decoration: none;">Cart</a></li>
        <li style="margin-top: 5px;">Wishlist</li>
        <li style="margin-top: 5px;">Shop</li>
      </ul>
    </div>
    
    <div class="quick-link-section" style="width: 20%;">
      <h4>Quick Link</h4>
      <ul style="list-style-type: none; padding: 0;">
        <li style="margin-top: 10px;">Privacy Policy</li>
        <li style="margin-top: 5px;">Terms Of Use</li>
        <li style="margin-top: 5px;">FAQ</li>
        <li style="margin-top: 5px;"><a href="/PAGES/contact.html" style="color: white; text-decoration: none;">Contact</a></li>
      </ul>
    </div>
    
    <div class="download-app-section" style="width: 20%;">
      <h4>Download App</h4>
      <p style="margin-top: 10px;">Save Upto ₹299 with App New User Only</p>
      <p style="margin-top: 5px;">
        <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" width="140" height="60px"></a>
        <a href="#"><img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" width="140" height="60px"></a>
      </p>
      <p id="socielmedia">
        <a href="#"><i class="fab fa-facebook"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
        <a href="#"><i class="fab fa-linkedin"></i></a>
      </p>
      
    </div>
    
  </div>
  
  <div style="text-align: center; margin-top: 20px;">
    <p>&copy; Copyright Exclusive 2021. All rights reserved.</p>
  </div>
</footer>`;
};

export default Footer