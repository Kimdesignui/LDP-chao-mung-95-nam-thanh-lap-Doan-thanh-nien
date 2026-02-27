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
