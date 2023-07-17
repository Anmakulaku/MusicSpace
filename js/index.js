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
                button.textContent = 'WIĘCEJ';
        } else {
                textWrap.classList.add('about__collapsed--wrap');
                textLong.classList.add('about__collapsed--long');
                aboutInfo.classList.add('about__info--expanded');
                button.textContent = 'MNIEJ';
        }
});

// active

// Znajdź elementy menu
const menuItems = document.querySelectorAll('.menu__item');

// Dodaj obsługę kliknięcia na elementy menu
menuItems.forEach(item => {
        item.addEventListener('click', () => {
        // Usuń klasę "active" z wszystkich elementów menu
        menuItems.forEach(item => {
        item.classList.remove('menu__item--active');
        });

        // Dodaj klasę "active" do klikniętego elementu menu
        item.classList.add('menu__item--active');
        });
});

// Pobranie danych z pliku products.js za pomocą fetch
fetch('https://raw.githubusercontent.com/Anmakulaku/MusicSpace/main/js/products.json')
        .then(response => response.json())
        .then(products => {
        // Tutaj możesz przetworzyć pobrane produkty i wykorzystać je na stronie

        // Przykład: Wyświetlenie nazw produktów w konsoli
        products.forEach(product => {
        console.log(product.name);
        });

        // Przykład: Generowanie elementów HTML dla każdego produktu i dodawanie ich do strony
        const productList = document.querySelector('.product-list');

        products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
                <img src="${product.imgSrc}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>In stock: ${product.instock}</p>
        `;
        productList.appendChild(productItem);
        });
        })
        .catch(error => {
        console.error('Wystąpił błąd podczas pobierania danych z pliku products.js:', error);
});










