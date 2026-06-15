document.addEventListener('DOMContentLoaded', () => {
    const discoverBtn = document.getElementById('discover-btn');
    const welcomePage = document.getElementById('welcome-page');
    const linksPage = document.getElementById('links-page');

    discoverBtn.addEventListener('click', () => {
        welcomePage.style.opacity = '0';
        welcomePage.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            welcomePage.classList.add('hidden');
            linksPage.classList.remove('hidden');
        }, 500); 
    });
});