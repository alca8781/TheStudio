const menuToggle = document.getElementById('menu-toggle');
const navUl = document.querySelector('nav ul');
const dropdowns = document.querySelectorAll('li.dropdown');

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
  navUl.classList.toggle('show');
});

dropdowns.forEach(drop => {
  drop.addEventListener('click', (e) => {
    if (window.innerWidth <= 860) {

      // prevent link navigation
      e.stopPropagation();

      // CLOSE all other dropdowns
      dropdowns.forEach(d => {
        if (d !== drop) {
          d.classList.remove('active');
        }
      });

      // TOGGLE current one
      drop.classList.toggle('active');
    }
  });
});

