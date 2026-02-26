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

    const items = Array.from(carouselEl.querySelectorAll('.carousel-item'));
    const indicators = Array.from(carouselEl.querySelectorAll('.carousel-indicators button'));
    let currentIndex = 0;
    const totalItems = items.length;
    let slideInterval;

    // Force absolute positioning and opacity transitions on items so JS can control them manually
    items.forEach((item, index) => {
        item.style.position = 'absolute';
        item.style.top = '0';
        item.style.left = '0';
        item.style.width = '100%';
        item.style.height = '100%';
        item.style.transition = 'opacity 0.6s ease-in-out';

        if (index === 0) {
            item.style.opacity = '1';
            item.style.zIndex = '2';
            item.classList.add('active');
            if (indicators[index]) indicators[index].classList.add('active');
        } else {
            item.style.opacity = '0';
            item.style.zIndex = '1';
            item.classList.remove('active');
            if (indicators[index]) indicators[index].classList.remove('active');
        }
    });

    // Make the first item relative so the container has height
    if (items.length > 0) items[0].style.position = 'relative';

    function goToSlide(index) {
        if (totalItems === 0) return;

        // Wrap around logic
        if (index < 0) index = totalItems - 1;
        if (index >= totalItems) index = 0;

        // Old slide fades out
        items[currentIndex].style.opacity = '0';
        items[currentIndex].style.zIndex = '1';
        if (indicators[currentIndex]) indicators[currentIndex].classList.remove('active');

        currentIndex = index;

        // New slide fades in
        items[currentIndex].style.opacity = '1';
        items[currentIndex].style.zIndex = '2';
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
        indicator.addEventListener('click', (e) => {
            e.preventDefault();
            goToSlide(index);
            resetTimer();
        });
    });

    // Auto play timer
    function startTimer() {
        slideInterval = setInterval(nextSlide, 3500);
    }

    function resetTimer() {
        clearInterval(slideInterval);
        startTimer();
    }

    startTimer();
});
