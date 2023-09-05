console.log("Plik index.js został wczytany.");


//przejście z bannera do about
const btn = document.querySelector('.banner__btn--large');
const aboutSection = document.querySelector('.about');

document.addEventListener('DOMContentLoaded', function() {
        btn.addEventListener('click', function(event) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
                console.log("kliknięcie btn baneru");
        });
});

// //kliknięcie search
// const searchInput = document.querySelector('.search__input');
// const searchButton = document.querySelector('.search__btn');

// // Kliknięcie poza obszarem inputu i buttona
// document.addEventListener('click', function(event) {
//         if (event.target !== searchInput && event.target !== searchButton) {
//                 searchInput.style.display = 'none';
//         }
// });

// searchButton.addEventListener('click', function(event) {
//         event.stopPropagation(); // wyświetlanie inputu w sposób ciagły

//         if (searchInput.style.display === 'none') {
//                 searchInput.style.display = 'inline-block';
//         } else {
//                 searchInput.style.display = 'none';
//         }
// });

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
                const shopCardContainer = document.querySelector('.shop__products');
                const perPageSelect = document.getElementById('perPageSelect');
                const sortSelect = document.getElementById('sortSelect');
                const prevButton = document.querySelector('.prev-btn');
                const nextButton = document.querySelector('.next-btn');
                const pageList = document.querySelector('.page__list');
                const productCardTemplate = document.querySelector('.product-card-template');

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
                        const productCardClone = productCardTemplate.cloneNode(true); // Clone the template

                        // Wstawianie danych z JSON do klonowanej karty
                        productCardClone.querySelector('.product-name').textContent = product.name;
                        productCardClone.querySelector('.product-image').src = product.imgSrc;
                        productCardClone.querySelector('.product-image').alt = product.name;
                        productCardClone.querySelector('.product-price').textContent = 'Cena: ' + product.price + ' PLN';
                        // productCardClone.querySelector('.product-availability').textContent = product.instock > 0 ? "Dostępna" : "Niedostępna";
                        
                        
                        const availabilityElement = productCardClone.querySelector('.product-availability');
                        availabilityElement.textContent = product.instock > 0 ? "Dostępna" : "Niedostępna";
                        availabilityElement.classList.add(product.instock > 0 ? "available" : "unavailable");

                        // Dodawanie klonowanej karty do kontenera
                        shopCardContainer.appendChild(productCardClone);
                        productCardClone.style.display = 'block'; // Pokaż klon
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
                        // console.log("kliknięcie btn prev");
                }
                });

                nextButton.addEventListener('click', () => {
                if (currentPage < Math.ceil(products.length / productsPerPage)) {
                        currentPage++;
                        displayProducts((currentPage - 1) * productsPerPage, currentPage * productsPerPage, sortSelect.value);
                        updatePaginationButtons();
                        updatePageButtons();
                        // console.log("kliknięcie btn next");
                }
                });

                // Initial display
                displayProducts(0, productsPerPage, sortSelect.value);
                updatePaginationButtons();
                createPageButtons();

               // Pobierz wszystkie przyciski "KUP TERAZ"
                const buyNowButtons = document.querySelectorAll('.product-button');
                console.log(buyNowButtons);
                // Deklaracja zmiennej do przechowywania liczby przedmiotów w koszyku
                let cartItemCount = 0;


               // Przypisz event listener do kontenera przycisków "KUP TERAZ" (delegowanie zdarzenia)
                shopCardContainer.addEventListener('click', function(event) {
                if (event.target.classList.contains('product-button')) {
                        const clickedButton = event.target;
                        const productCard = clickedButton.closest('.product-card-template');
                        const productName = productCard.querySelector('.product-name').textContent;

                        // Znajdź produkt w danych JSON na podstawie nazwy
                        const product = products.find(p => p.name === productName);

                        if (product) {
                        addToCart(product);
                        } else {
                        alert(`Produkt "${productName}" nie został znaleziony.`);
                        }
                }
                });


                // Funkcja do obsługi dodawania produktu do koszyka
                function addToCart(product) {
                        const modalMessage = document.getElementById('modalMessage');
                        const goToCartBtn = document.getElementById('goToCartBtn');

                        // Sprawdź czy produkt jest dostępny
                        if (product.instock > 0) {
                                cartItemCount++;
                                localStorage.setItem('cartItemCount', cartItemCount.toString());
                                updateCartItemCount(); // Aktualizacja liczby przedmiotów w koszyku
                                // alert(`Dodano produkt "${product.name}" do koszyka.`);
                                modalMessage.textContent = `Dodałeś do koszyka: ${product.name}.`;
                                goToCartBtn.disabled = false; // Odblokuj przycisk "Idź do koszyka"
                        } else {
                                modalMessage.textContent = `Przepraszamy, produkt "${product.name}" jest obecnie niedostępny.`;
                                goToCartBtn.disabled = true; // Zablokuj przycisk "Idź do koszyka"
                                // alert(`Przepraszamy, produkt "${product.name}" jest obecnie niedostępny. Prosimy o kontakt w celu uzyskania informacji o dostępności.`);
                        }
                        // Wyświetl modal
                        const modal = document.getElementById('myModal');
                        modal.style.display = 'block';

                        // Dodaj obsługę przycisku "Kontynuuj zakupy" w modalu
                        const continueShoppingBtn = document.getElementById('continueShoppingBtn');
                        continueShoppingBtn.addEventListener('click', closeModal);

                        function closeModal() {
                        // Ukryj modal po kliknięciu przycisku "Kontynuuj zakupy"
                        const modal = document.getElementById('myModal');
                        modal.style.display = 'none';
                        }
                }
                

                // Funkcja do aktualizacji liczby przedmiotów w koszyku
                function updateCartItemCount() {
                        const cartItemCountElement = document.querySelector('.menu__cartItemCount');
                        cartItemCountElement.textContent = cartItemCount;
                }

                // Aktualizacja liczby przedmiotów w koszyku na starcie strony
                updateCartItemCount();

        })
        .catch(error => {
                console.error('Wystąpił błąd podczas pobierania danych z pliku products.json:', error);
        });

