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

const menuItems = document.querySelectorAll('.menu__item');

menuItems.forEach(item => {
        item.addEventListener('click', () => {
        menuItems.forEach(item => {
        // Usuwanie klasy "active" do klikniętego elementu menu
        item.classList.remove('menu__item--active');
        });   

        // Dodawanie klasy "active" do klikniętego elementu menu
        item.classList.add('menu__item--active');
        });
});

fetch('https://raw.githubusercontent.com/Anmakulaku/MusicSpace/feature/shop/js/products.json')
        .then(response => response.json())
        .then(data => {
                const products = data.products;
                const shopCardContainer = document.querySelector('.shop__card');
                const perPageSelect = document.getElementById('perPageSelect');
                const sortSelect = document.getElementById('sortSelect');
                const prevButton = document.querySelector('.prev-btn');
                const nextButton = document.querySelector('.next-btn');
                const pageList = document.querySelector('.page__list');
                
                let currentPage = 1;
                let productsPerPage = parseInt(perPageSelect.value);

                function displayProducts(startIdx, endIdx, sortBy) {
                shopCardContainer.innerHTML = ''; // Clear the container

                let sortedProducts = [...products];

                if (sortBy === 'priceLow') {
                        sortedProducts.sort((a, b) => a.price - b.price);
                } else if (sortBy === 'priceHigh') {
                        sortedProducts.sort((a, b) => b.price - a.price);
                } else if (sortBy === 'default') { // No sorting 
                }

                for (let i = startIdx; i < endIdx && i < sortedProducts.length; i++) {
                        const product = sortedProducts[i];
                        const productCard = document.createElement('div');
                        productCard.classList.add('product-card');

                        // Generowanie zawartości karty produktu
                        const productName = document.createElement('h3');
                        productName.textContent = product.name;
                        
                        const productImage = document.createElement('img');
                        productImage.src = product.imgSrc;
                        productImage.alt = product.name;
                        
                        const productPrice = document.createElement('p');
                        productPrice.textContent = 'Cena: ' + product.price + ' PLN';
                        productPrice.classList.add('product-price');
                        
                        const productAvailability = document.createElement('p');
                        productAvailability.textContent = product.instock > 0 ? "Dostępna" : "Niedostępna";
                        productAvailability.classList.add('product-availability');
                        productAvailability.classList.add(product.instock > 0 ? 'available' : 'unavailable');

                        const productButton = document.createElement('button');
                        productButton.textContent = "KUP TERAZ";

                        // Dodawanie elementów do karty produktu
                        productCard.appendChild(productName);
                        productCard.appendChild(productImage);
                        productCard.appendChild(productPrice);
                        productCard.appendChild(productAvailability);
                        productCard.appendChild(productButton);

                        // Dodawanie karty produktu do kontenera
                        shopCardContainer.appendChild(productCard);
                }
                }

                function updatePaginationButtons() {
                prevButton.disabled = currentPage === 1;
                nextButton.disabled = currentPage === Math.ceil(products.length / productsPerPage);
                }

                function createPageButtons() {
                pageList.innerHTML = '';

                const totalPages = Math.ceil(products.length / productsPerPage);

                for (let i = 1; i <= totalPages; i++) {
                        const pageItem = document.createElement('li');
                        pageItem.textContent = i;
                        pageItem.classList.add('page__item');
                        if (i === currentPage) {
                        pageItem.classList.add('page__item--active');
                        }
                        pageList.appendChild(pageItem);

                        pageItem.addEventListener('click', () => {
                        currentPage = i;
                        updatePaginationButtons();
                        displayProducts((currentPage - 1) * productsPerPage, currentPage * productsPerPage, sortSelect.value);
                        updatePageButtons();
                        });
                }
                }

                function updatePageButtons() {
                const pageItems = document.querySelectorAll('.page__item');
                pageItems.forEach(item => item.classList.remove('page__item--active'));
                pageItems[currentPage - 1].classList.add('page__item--active');
                }

                perPageSelect.addEventListener('change', () => {
                currentPage = 1; // Reset to first page when changing products per page
                productsPerPage = parseInt(perPageSelect.value);
                displayProducts(0, productsPerPage, sortSelect.value);
                updatePaginationButtons();
                createPageButtons();
                });

                sortSelect.addEventListener('change', () => {
                currentPage = 1; // Reset to first page when changing sorting
                displayProducts(0, productsPerPage, sortSelect.value);
                updatePaginationButtons();
                createPageButtons();
                });

                prevButton.addEventListener('click', () => {
                if (currentPage > 1) {
                        currentPage--;
                        displayProducts((currentPage - 1) * productsPerPage, currentPage * productsPerPage, sortSelect.value);
                        updatePaginationButtons();
                        updatePageButtons();
                }
                });

                nextButton.addEventListener('click', () => {
                if (currentPage < Math.ceil(products.length / productsPerPage)) {
                        currentPage++;
                        displayProducts((currentPage - 1) * productsPerPage, currentPage * productsPerPage, sortSelect.value);
                        updatePaginationButtons();
                        updatePageButtons();
                }
                });

                // Initial display
                displayProducts(0, productsPerPage, sortSelect.value);
                updatePaginationButtons();
                createPageButtons();
        })
        .catch(error => {
                console.error('Wystąpił błąd podczas pobierania danych z pliku products.json:', error);
        });

