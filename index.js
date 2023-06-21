
document.addEventListener('DOMContentLoaded', function() {
        const btn = document.querySelector('.banner__btn--large');
    
        btn.addEventListener('click', function(event) {
        event.preventDefault();
    
        const aboutSection = document.querySelector('.about');
        aboutSection.scrollIntoView({ behavior: 'smooth' });
        });
});