(function () {
    function setActiveMenuItem() {
        const menuItems = document.querySelectorAll('.menu__link');
        const currentPath = window.location.pathname;

        menuItems.forEach(item => {
            if (item.pathname === currentPath) {
                item.classList.add('active');
            }
        });
    }

    function showLoadTime() {
        const loadTime = window.performance.now();
        const footer = document.querySelector('footer');

        const loadTimeElement = document.createElement('p');
        loadTimeElement.classList.add('load-time');
        loadTimeElement.textContent = `Время загрузки страницы: ${loadTime.toFixed(2)} мс`;
        footer.appendChild(loadTimeElement);
    }

    window.addEventListener('load', () => {
        setActiveMenuItem();
        showLoadTime();
    });
})();
