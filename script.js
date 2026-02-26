document.addEventListener("DOMContentLoaded", function () {
    console.log("Landing page LDP NXB Xây Dựng đã sẵn sàng!");

    // Initialize all Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize and force-start the carousel
    const carouselEl = document.querySelector('#mainCarousel');
    if (carouselEl) {
        const carousel = new bootstrap.Carousel(carouselEl, {
            interval: 3000,
            ride: true,
            wrap: true
        });
        carousel.cycle(); // Explicitly start auto-play
    }
});
