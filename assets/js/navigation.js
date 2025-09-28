document.addEventListener('DOMContentLoaded', function () {
    // Hamburger menu toggle
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    const burger = document.createElement('button');
    burger.className = 'burger-menu';
    burger.setAttribute('aria-label', 'Abrir menú de navegación');
    burger.innerHTML = '<span></span><span></span><span></span>';
    header.appendChild(burger);

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-open');
        burger.classList.toggle('open');
    });

    // Close menu on link click (mobile)
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 860) {
                nav.classList.remove('nav-open');
                burger.classList.remove('open');
            }
        });
    });

    // Highlight active section
    function highlightActive() {
        const links = nav.querySelectorAll('a');
        let found = false;
        links.forEach(link => {
            link.classList.remove('active');
            if (!found && link.hash && location.hash === link.hash) {
                link.classList.add('active');
                found = true;
            }
        });
    }

    window.addEventListener('hashchange', highlightActive);
    highlightActive();

    // Responsive: hide/show nav
    function handleResize() {
        if (window.innerWidth < 860) {
            nav.classList.remove('nav-open');
            burger.style.display = 'inline-block';
        } else {
            nav.classList.remove('nav-open');
            burger.classList.remove('open');
            burger.style.display = 'none';
        }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
});
