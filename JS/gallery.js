
const gallery = document.querySelectorAll('.gallery');

function resizeAllGridItems() {
  gallery.forEach(grid => {
    const allItems = grid.querySelectorAll('img');
    allItems.forEach(item => {
      const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
      const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('gap'));
      const rowSpan = Math.ceil((item.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
      item.style.gridRowEnd = `span ${rowSpan}`;
    });
  });
}

// Wait for all images to load
window.addEventListener('load', resizeAllGridItems);
window.addEventListener('resize', resizeAllGridItems);

// Optional: if images load dynamically
gallery.forEach(grid => {
  const imgs = grid.querySelectorAll('img');
  imgs.forEach(img => {
    img.addEventListener('load', () => {
      resizeAllGridItems();
    });
  });
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.floating-shape').forEach((el, index) => {
      const speed = (index + 1) * 0.5;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });

    // === Progress bar update ===
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.querySelector('.progress-bar').style.width = `${scrollPercent}%`;
  });
