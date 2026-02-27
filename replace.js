const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Navbar
html = html.replace(/<nav class="navbar navbar-light bg-white sticky-top shadow-sm py-2">[\s\S]*?<\/nav>/, `<nav class="navbar navbar-light bg-white sticky-top shadow-sm py-2">
        <div class="container d-flex align-items-center position-relative">
            <!-- Nút bên trái (hiện từ sm trở lên) -->
            <a class="btn btn-outline-danger btn-sm d-none d-sm-inline-block" href="#booklist" style="z-index:1;">Danh sách ấn phẩm</a>

            <!-- Logo (trái ở mobile <576px, giữa ở >=576px) -->
            <a class="navbar-brand m-0 d-sm-none" href="#">
                <img src="https://images.nxbxaydung.com.vn/Avatar/image-20240301094520911.svg" alt="NXB Xây Dựng Logo" style="height: 48px;">
            </a>
            <a class="navbar-brand m-0 position-absolute start-50 translate-middle-x d-none d-sm-block" href="#">
                <img src="https://images.nxbxaydung.com.vn/Avatar/image-20240301094520911.svg" alt="NXB Xây Dựng Logo" style="height: 48px;">
            </a>

            <!-- Hotline bên phải -->
            <a class="btn btn-outline-danger btn-sm fw-semibold ms-auto" href="tel:0327888669" style="z-index:1;">
                <i class="fas fa-phone me-1"></i>0327888669
            </a>
        </div>
    </nav>`);

// 2. Carousel
html = html.replace(/<section>\s*<div id="mainCarousel"[\s\S]*?<\/section>/, `<section>
            <div class="infinite-slider">
                <div class="infinite-slider-track">
                    <img src="images/banner slide.jpg" class="infinite-banner" alt="Banner NXB Xây Dựng" loading="eager" fetchpriority="high">
                    <img src="images/banner slide.jpg" class="infinite-banner" alt="Banner NXB Xây Dựng" loading="lazy">
                </div>
            </div>
        </section>`);

// 3. Grid Columns
html = html.replace(/<div class="row g-4 justify-content-center">/g, '<div class="row g-4 justify-content-center row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6">');
html = html.replace(/class="col-6 col-md-4 col-lg-2 text-center"/g, 'class="col text-center"');

fs.writeFileSync('index.html', html);
console.log("Replaced HTML successfully");
