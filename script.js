document.addEventListener("DOMContentLoaded", function () {
    console.log("Landing page LDP NXB Xây Dựng đã sẵn sàng!");

    // Initialize all Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Custom Vanilla JS Carousel (Bypass Bootstrap bugs)
    const carouselEl = document.querySelector('#mainCarousel');
    if (!carouselEl) return;

    const items = carouselEl.querySelectorAll('.carousel-item');
    const indicators = carouselEl.querySelectorAll('.carousel-indicators button');
    let currentIndex = 0;
    const totalItems = items.length;
    let slideInterval;

    function goToSlide(index) {
        // Wrap around logic
        if (index < 0) index = totalItems - 1;
        if (index >= totalItems) index = 0;

        // Remove active class from current
        items[currentIndex].classList.remove('active');
        if (indicators[currentIndex]) indicators[currentIndex].classList.remove('active');

        currentIndex = index;

        // Add active class to new
        items[currentIndex].classList.add('active');
        if (indicators[currentIndex]) indicators[currentIndex].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // Attach click events
    const nextBtn = carouselEl.querySelector('.carousel-control-next');
    const prevBtn = carouselEl.querySelector('.carousel-control-prev');

    if (nextBtn) {
        nextBtn.addEventListener('click', function (e) {
            e.preventDefault();
            nextSlide();
            resetTimer();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function (e) {
            e.preventDefault();
            prevSlide();
            resetTimer();
        });
    }

    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            resetTimer();
        });
    });

    // Auto play timer
    function startTimer() {
        slideInterval = setInterval(nextSlide, 3000);
    }

    function resetTimer() {
        clearInterval(slideInterval);
        startTimer();
    }

    startTimer();
});
