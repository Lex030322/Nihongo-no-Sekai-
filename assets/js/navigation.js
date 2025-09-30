/**
 * Funcionalidad de navegación móvil
 */
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  // Toggle del menú móvil
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      navMenu.classList.toggle('hidden');

      // Cambiar el ícono del menú
      const svg = menuToggle.querySelector('svg');
      if (navMenu.classList.contains('open')) {
        svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
        menuToggle.setAttribute('aria-label', 'Cerrar menú de navegación');
      } else {
        svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
        menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
      }
    });

    // Cerrar menú al hacer clic en un enlace
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navMenu.classList.add('hidden');
        const svg = menuToggle.querySelector('svg');
        svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
        menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
      });
    });

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', (event) => {
      if (!navMenu.contains(event.target) && !menuToggle.contains(event.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navMenu.classList.add('hidden');
        const svg = menuToggle.querySelector('svg');
        svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
        menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
      }
    });
  }

  // Resaltar enlace activo basado en la página actual
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('#nav-menu a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    // Normalizar rutas para comparación
    const normalizedHref = href.startsWith('../') ? href.replace('../', '/') : `/${href}`;
    const normalizedCurrentPath = `/${currentPath.split('/').pop()}`;
    
    if (normalizedCurrentPath === normalizedHref || (currentPath.includes('index.html') && href === '#inicio')) {
      link.setAttribute('aria-current', 'page');
      link.classList.add('bg-red-900');
    }
  });
});
