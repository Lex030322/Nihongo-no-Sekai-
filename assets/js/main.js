/**
 * Funcionalidades principales del sitio
 */

/**
 * Ajustar tamaño de imágenes dinámicas
 */
function adjustImageSize(img) {
  try {
    const maxWidth = 1200;
    if (img.classList.contains('dynamic-img') && img.naturalWidth > maxWidth) {
      img.style.width = maxWidth + 'px';
      img.style.height = 'auto';
    }
  } catch (e) {
    console.warn('Error ajustando tamaño de imagen:', e);
  }
}

/**
 * Ajustar tamaño del banner principal
 */
function adjustBannerSize(img) {
  try {
    if (!img || !img.naturalWidth) return;
    
    const originalWidth = img.naturalWidth;
    const originalHeight = img.naturalHeight;
    const aspectRatio = originalHeight / originalWidth;
    const container = img.parentElement;
    const maxWidth = Math.min(container.offsetWidth * 0.9, 800); // Máximo 90% del contenedor o 800px
    
    if (originalWidth > maxWidth) {
      img.style.width = maxWidth + 'px';
      img.style.height = maxWidth * aspectRatio + 'px';
    } else {
      img.style.width = originalWidth + 'px';
      img.style.height = originalHeight + 'px';
    }
    
    img.style.maxWidth = '100%';
    img.style.display = 'block';
    img.style.margin = '0 auto';
  } catch (e) {
    console.warn('Error ajustando banner:', e);
  }
}

/**
 * Lazy loading para imágenes
 */
function initLazyLoading() {
  const images = document.querySelectorAll('img');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => {
      if (img.dataset.src) {
        imageObserver.observe(img);
      }
    });
  }
}

/**
 * Smooth scroll para anclas internas
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Actualizar URL sin recargar página
        history.pushState(null, null, href);
      }
    });
  });
}

/**
 * Animaciones al hacer scroll
 */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
      }
    });
  }, observerOptions);
  
  const elementsToAnimate = document.querySelectorAll('section, .writing-system-card');
  elementsToAnimate.forEach(el => observer.observe(el));
}

/**
 * Mejorar accesibilidad
 */
function improveAccessibility() {
  // Agregar indicadores de carga para imágenes
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('load', function() {
      this.style.opacity = '1';
    });
    
    img.addEventListener('error', function() {
      this.alt = 'Error cargando imagen: ' + this.alt;
      this.style.opacity = '0.5';
    });
  });
  
  // Mejorar navegación por teclado
  const focusableElements = document.querySelectorAll('a, button, [tabindex]');
  focusableElements.forEach(el => {
    el.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && this.tagName === 'A') {
        this.click();
      }
    });
  });
}

/**
 * Inicialización al cargar la página
 */
document.addEventListener('DOMContentLoaded', function() {
  // Ajustar banner principal
  const bannerImg = document.querySelector('.banner-img');
  if (bannerImg) {
    if (bannerImg.complete) {
      adjustBannerSize(bannerImg);
    } else {
      bannerImg.addEventListener('load', () => adjustBannerSize(bannerImg));
    }
  }
  
  // Inicializar funcionalidades
  initLazyLoading();
  initSmoothScroll();
  initScrollAnimations();
  improveAccessibility();
  
  // Ajustar imágenes al redimensionar ventana
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (bannerImg) adjustBannerSize(bannerImg);
    }, 250);
  });
});

/**
 * CSS para animaciones (se agrega dinámicamente)
 */
const animationStyles = `
  .animate-fade-in {
    animation: fadeIn 0.6s ease-out forwards;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  img {
    transition: opacity 0.3s ease;
  }
`;

// Agregar estilos al head
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);
