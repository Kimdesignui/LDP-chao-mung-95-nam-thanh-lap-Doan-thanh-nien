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
