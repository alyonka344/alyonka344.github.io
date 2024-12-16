const swiper = new Swiper('#paintings-gallery', {
    loop: false,
    slidesPerView: 3,
    spaceBetween: 9,
    freeMode: true,
    mousewheel: true,
    watchOverflow: true,
});

const gallery = document.querySelector('.my-paintings__images');

gallery.addEventListener('wheel', (event) => {
    const delta = event.deltaY;

    const isAtStart = swiper.isBeginning && delta < 0;
    const isAtEnd = swiper.isEnd && delta > 0;

    if (!isAtStart && !isAtEnd) {
        event.preventDefault();
        return;
    }
    if (isAtEnd && delta > 0) {
        window.scrollBy(0, 50);
    } else if (isAtStart && delta < 0) {
        window.scrollBy(0, -50);
    }
});
