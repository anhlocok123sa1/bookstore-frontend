<template>
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-section">
            <h4>Về chúng tôi</h4>
            <p>BookStore - Địa chỉ mua sách trực tuyến uy tín</p>
            <div class="social-links">
              <a href="#"><i class="fab fa-facebook"></i></a>
              <a href="#"><i class="fab fa-twitter"></i></a>
              <a href="#"><i class="fab fa-instagram"></i></a>
            </div>
          </div>
  
          <div class="footer-section">
            <h4>Dịch vụ</h4>
            <ul>
              <li><router-link to="/">Trang chủ</router-link></li>
              <li><router-link to="/cart">Giỏ hàng</router-link></li>
              <li><router-link to="/checkout">Thanh toán</router-link></li>
            </ul>
          </div>
  
          <div class="footer-section">
            <h4>Chính sách</h4>
            <ul>
              <li><a href="#">Bảo mật</a></li>
              <li><a href="#">Đổi trả</a></li>
              <li><a href="#">Vận chuyển</a></li>
              <li><a href="#">Điều khoản</a></li>
            </ul>
          </div>
  
          <div class="footer-section">
            <h4>Liên hệ</h4>
            <ul>
              <li><i class="fas fa-map-marker-alt"></i> 640/2 Nguyễn Oanh, phường 6, TP.HCM</li>
              <li><i class="fas fa-phone"></i> 0794740393</li>
              <li><i class="fas fa-envelope"></i> anhlocok123sa1@gmail.com</li>
            </ul>
          </div>
        </div>
        
        <div class="copyright">
          <p>© 2024 BookStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </template>
  
  <style scoped>
  .site-footer {
    background-color: #2c3e50;
    color: white;
    padding: 2rem 0;
    margin-top: auto;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .footer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  .footer-section h4 {
    color: #ecf0f1;
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
  
  .footer-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .footer-section li {
    margin-bottom: 0.5rem;
  }
  
  .footer-section a {
    color: #bdc3c7;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .footer-section a:hover {
    color: #3498db;
  }
  
  .social-links {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .social-links a {
    font-size: 1.5rem;
    color: #bdc3c7;
  }
  
  .social-links a:hover {
    color: #3498db;
  }
  
  .copyright {
    text-align: center;
    border-top: 1px solid #34495e;
    padding-top: 1rem;
    margin-top: 2rem;
    color: #bdc3c7;
  }
  
  @media (max-width: 768px) {
    .footer-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>