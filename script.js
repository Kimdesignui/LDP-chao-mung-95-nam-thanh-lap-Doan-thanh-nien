document.addEventListener("DOMContentLoaded", function () {
    console.log("Landing page LDP NXB Xây Dựng đã sẵn sàng!");

    // Initialize all Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    // Initialize the carousel explicitly to prevent slider freeze issues
    const myCarouselElement = document.querySelector('#mainCarousel');
    if (myCarouselElement) {
        new bootstrap.Carousel(myCarouselElement, {
            interval: 3000,
            ride: 'carousel'
        });
    }
});
