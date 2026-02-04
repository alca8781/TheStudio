const menuToggle = document.getElementById('menu-toggle');
const navUl = document.querySelector('nav ul');
const dropdowns = document.querySelectorAll('li.dropdown');

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
  navUl.classList.toggle('show');
});

// Toggle dropdowns on mobile
dropdowns.forEach(drop => {
  drop.addEventListener('click', (e) => {
    if (window.innerWidth <= 860) {
      drop.classList.toggle('active');
    }
  });
});
