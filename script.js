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
