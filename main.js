// --- script.js ---
{
    document.addEventListener("DOMContentLoaded", function () {
        console.log("Landing page LDP NXB Xây Dựng đã sẵn sàng!");

        // Initialize all Bootstrap tooltips
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.forEach(function (tooltipTriggerEl) {
            new bootstrap.Tooltip(tooltipTriggerEl);
        });

        // Only Tooltips are initialized here.
        // The Carousel is now 100% natively controlled by Bootstrap HTML data-attributes (`data-bs-ride="carousel"`),
        // which prevents any conflicting JS event handlers from freezing the sliding sequence.

        // Handle Obfuscated Book "Read Now" Buttons
        const readTriggers = document.querySelectorAll('.read-trigger');
        readTriggers.forEach(function (btn) {
            btn.addEventListener('click', function () {
                const encodedKey = this.getAttribute('data-book-key');
                if (encodedKey) {
                    // Decode from base64 (atob) and reconstruct the link piece by piece to hide the true string structure from simple DOM scraping
                    const payload = atob(encodedKey);
                    const s1 = 'https://nxbxaydung';
                    const s2 = '.com.vn/readonline/';
                    const dest = s1 + s2 + payload + '/1/1';
                    window.open(dest, '_blank');
                }
            });
        });
    });
}

// --- apply_fixes.js ---
{
    const fs = require('fs');

    // 1. Update index.html
    let html = fs.readFileSync('index.html', 'utf8');

    // A. Remove mt-auto from all btn-groups to prevent dynamic vertical sliding,
    html = html.replace(/class="btn-group btn-group-sm w-100 mt-auto mb-2"/g, 'class="btn-group btn-group-sm w-100 mb-2"');

    // B. Change section Giới thiệu sách hay background color to #f8f8f8
    html = html.replace(/<section id="gioi-thieu-sach" class="py-5" style="background-color:#f9f0e8;">/, '<section id="gioi-thieu-sach" class="py-5" style="background-color:#f8f8f8;">');

    // C. Update App Links to API generating QR Codes
    // We will replace the inner content of the links with a QR image and a label.
    // Ensure we're replacing the image tags
    const appleAppStoreRegex = /<img src="images\/Tai-app-iOS\.svg" alt="Tải trên App Store"[\s\S]*?>/;
    const googlePlayRegex = /<img src="images\/Tai-app-android\.svg" alt="Tải trên Google Play"[\s\S]*?>/;

    const encodedAppleUrl = encodeURIComponent("https://apps.apple.com/gb/app/nxb-x%C3%A2y-d%E1%BB%B1ng/id1563192631");
    const encodedGoogleUrl = encodeURIComponent("https://play.google.com/store/apps/details?id=vn.vhmt.nxbxd");

    html = html.replace(appleAppStoreRegex, `<div class="d-flex flex-column justify-content-center align-items-center">
                                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodedAppleUrl}" alt="Mã QR App Store" class="d-block app-badge-img mb-2" style="height: 120px; width: 120px; object-fit: contain;" loading="lazy">
                                <span class="fw-bold text-dark" style="font-size:14px;"><i class="fab fa-apple me-1"></i>App Store</span>
                            </div>`);

    html = html.replace(googlePlayRegex, `<div class="d-flex flex-column justify-content-center align-items-center">
                                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodedGoogleUrl}" alt="Mã QR Google Play" class="d-block app-badge-img mb-2" style="height: 120px; width: 120px; object-fit: contain;" loading="lazy">
                                <span class="fw-bold text-dark" style="font-size:14px;"><i class="fab fa-google-play me-1"></i>Google Play</span>
                            </div>`);

    fs.writeFileSync('index.html', html);
    console.log('Fixed index.html: Removed mt-auto, updated section background, replaced badges with QR codes.');
}

// --- clone_section.js ---
{
    const fs = require('fs');
    let html = fs.readFileSync('index.html', 'utf8');

    // 1. Duplicate book section with new title
    const bookSectionMatch = html.match(/<section id="booklist"[\s\S]*?<\/section>/);
    if (bookSectionMatch) {
        const originalSection = bookSectionMatch[0];
        // Clone and change to a new section with different id and title
        const clonedSection = originalSection
            .replace('id="booklist"', 'id="gioi-thieu-sach"')
            .replace('class="py-5 bg-white"', 'class="py-5"  style="background-color:#f9f0e8;"')
            .replace('Danh sách ấn phẩm nổi bật', 'Giới thiệu sách hay');
        // Insert cloned section AFTER the original
        html = html.replace(originalSection, originalSection + '\n\n        ' + clonedSection);
    }

    fs.writeFileSync('index.html', html);
    console.log('Book section duplicated successfully');
}

// --- margin.js ---
{

}

// --- replace.js ---
{
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
}

// --- swap.js ---
{

}
