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
});
