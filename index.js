//przejście z bannera do about
const btn = document.querySelector('.banner__btn--large');
const aboutSection = document.querySelector('.about');

document.addEventListener('DOMContentLoaded', function() {
        btn.addEventListener('click', function(event) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
        });
});
//kliknięcie search
const searchInput = document.querySelector('.search__input');
const searchButton = document.querySelector('.search__btn');

// Kliknięto poza obszarem inputu i przycisku
document.addEventListener('click', function(event) {
        if (event.target !== searchInput && event.target !== searchButton) {
                searchInput.style.display = 'none';
        }
});

searchButton.addEventListener('click', function(event) {
        event.stopPropagation(); // wyświetlanie inputu w sposób ciagły

        if (searchInput.style.display === 'none') {
                searchInput.style.display = 'inline-block';
        } else {
                searchInput.style.display = 'none';
        }
});

// //wyświetlanie text o about
const button = document.querySelector('.about__btn--italic');
const textWrap = document.querySelector('.about__text--wrap');
const textLong = document.querySelector('.about__text--long');
const aboutInfo = document.querySelector('.about__info');

button.addEventListener('click', function() {
        if (textWrap.classList.contains('about__collapsed--wrap')) {
                textWrap.classList.remove('about__collapsed--wrap');
                textLong.classList.remove('about__collapsed--long');
                aboutInfo.classList.remove('about__info--expanded');
                button.textContent = 'Więcej';
        } else {
                textWrap.classList.add('about__collapsed--wrap');
                textLong.classList.add('about__collapsed--long');
                aboutInfo.classList.add('about__info--expanded');
                button.textContent = 'Mniej';
        }
});








