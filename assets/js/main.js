document.addEventListener('DOMContentLoaded', function () {
    // Fade-in animación con IntersectionObserver
    const fadeEls = document.querySelectorAll('.bienvenida, .galeria img, .links-destacados, .hero, section h2');
    const options = { threshold: 0.15 };
    const fadeInObserver = new window.IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    fadeEls.forEach(el => fadeInObserver.observe(el));

    // Scroll suave para anclas internas
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Efecto zoom en galería con JS para más suavidad
    const galImgs = document.querySelectorAll('.galeria img');
    galImgs.forEach(img => {
        img.addEventListener('mouseenter', () => img.classList.add('zoom'));
        img.addEventListener('mouseleave', () => img.classList.remove('zoom'));
    });

    // Highlight de links destacados según scroll
    const sections = [
        { id: 'bienvenida', link: 'a[href="#bienvenida"]' },
        // Puedes agregar más secciones aquí si usas anclas en el menú
    ];
    function updateHighlights() {
        const scroll = window.scrollY + window.innerHeight / 3;
        sections.forEach(sec => {
            const el = document.getElementById(sec.id);
            const link = document.querySelector(sec.link);
            if (el && link) {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight / 2 && rect.bottom > 0) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', updateHighlights);
    updateHighlights();
});
