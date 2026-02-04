// Scroll progress bar
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercentage = (scrollTop / scrollHeight) * 100;
  document.querySelector('.progress-bar').style.width = scrollPercentage + '%';
});

// Parallax effect for portfolio image
const portfolioImage = document.querySelector('.portfolio-image');
if (portfolioImage) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.05;
    portfolioImage.style.transform = `translateY(${rate}px)`;
  });
}

// Smooth scroll for nav links
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const typewriters = document.querySelectorAll('.typewriter h3');

  // Create an IntersectionObserver to watch when h3 elements come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      const wrapper = el.parentElement;

      if (entry.isIntersecting) {
        const textLength = el.textContent.length;
        el.style.setProperty('--chars', `${textLength}ch`);

        // Reset animation to allow retrigger
        el.style.animation = 'none';
        void el.offsetWidth; // Force reflow

        // Type then blink 5 times
        el.style.animation = `
          typing 1.1s steps(${textLength + 2}, end) forwards,
          blink-caret 0.75s step-end 5 1.1s
        `;

        // Remove the caret border after blinking finishes
        const totalDuration = 1100 + (0.75 * 3 * 1000); // typing + blinking
        setTimeout(() => {
          el.style.borderRight = 'none';
        }, totalDuration);

        wrapper.classList.remove('hidden');
      } else {
        // Hide when not in view
        wrapper.classList.add('hidden');
      }
    });
  }, {
    threshold: 0.6 // Trigger when 60% visible
  });

  typewriters.forEach(el => observer.observe(el));
});



