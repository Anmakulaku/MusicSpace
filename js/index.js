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

fetch('https://raw.githubusercontent.com/Anmakulaku/MusicSpace/feature/shop/js/products.json')
        .then(response => response.json())
        .then(data => {
                const products = data.products;
                const shopCardContainer = document.querySelector('.shop__card');
                
                products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                
                // Generowanie zawartości karty produktu
                const productName = document.createElement('h3');
                productName.textContent = product.name;
                
                const productImage = document.createElement('img');
                productImage.src = product.imgSrc;
                productImage.alt = product.name;
                
                const productPrice = document.createElement('p');
                productPrice.textContent = 'Price: ' + product.price;
                
                const productStock = document.createElement('p');
                productStock.textContent = 'In stock: ' + product.instock;
                
                // Dodawanie elementów do karty produktu
                productCard.appendChild(productName);
                productCard.appendChild(productImage);
                productCard.appendChild(productPrice);
                productCard.appendChild(productStock);
                
                // Dodawanie karty produktu do kontenera
                shopCardContainer.appendChild(productCard);
                });
        })
        .catch(error => {
        console.error('Wystąpił błąd podczas pobierania danych z pliku products.js:', error);
        });











