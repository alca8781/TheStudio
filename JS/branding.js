const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel img');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let index = 0;

function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;
}

nextBtn.addEventListener('click', () => {
    if (index < slides.length - 1) {
        index++;
    } else {
        index = 0; // loop back
    }
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    if (index > 0) {
        index--;
    } else {
        index = slides.length - 1; // loop to end
    }
    updateCarousel();
});

let startX = 0;
let endX = 0;

const carousel = document.querySelector('.carousel');

carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

carousel.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', () => {
    let diff = startX - endX;

    // minimum swipe distance (prevents tiny accidental moves)
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            // swipe left → next
            if (index < slides.length - 1) {
                index++;
            } else {
                index = 0;
            }
        } else {
            // swipe right → previous
            if (index > 0) {
                index--;
            } else {
                index = slides.length - 1;
            }
        }
        updateCarousel();
    }
});
