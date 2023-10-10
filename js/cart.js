document.addEventListener('DOMContentLoaded', function () {

    // Pobierz koszyk z pamięci lokalnej
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Pobierz templatke na elementy koszyka
    const cartContainer = document.querySelector('.cart__items');
    const cartTemplate = document.getElementById('cart__template'); // Pobierz szablon

    // Sprawdz, czy udało się pobrać szablon
    if (!cartTemplate) {
        console.error("Nie można znaleźć elementu o id 'cart__template' na stronie.");
        return; // Wyjdź z funkcji, nie można kontynuować
    } else {
        console.log("Znaleziono element o id 'card__template' na stronie.");
    }
    // Po każdym dodaniu lub usunięciu produktu z koszyka, oblicz sumę cen
    function calculateCartTotal() {
        let cartTotal = 0;

        // Iteruj przez produkty w koszyku i dodawaj ich ceny do sumy
        cart.forEach((product) => {
            cartTotal += product.price * product.quantity;
        });

        return cartTotal;
    }

    // Funkcja do aktualizacji sumy cen w koszyku
    function updateCartTotal() {
        const cartTotalElement = document.querySelector('.cart__summaryPrice');
        const total = calculateCartTotal();

        // Aktualizuj tekst w elemencie .cart__summaryPrice z obliczoną sumą
        cartTotalElement.textContent = total + ' zł';
    }

    // Po dodaniu/usunięciu produktu, wywołaj funkcję aktualizującą sumę cen
    function updateCart() {
        // Zapisuj aktualny koszyk w pamięci lokalnej
        localStorage.setItem('cart', JSON.stringify(cart));

        // Aktualizuj sumę cen
        updateCartTotal();
    }
    // Funkcja do wyświetlania produktów w koszyku
    function displayCart() {
        // Usun istniejące elementy w koszyku
        cartContainer.innerHTML = '';

        // Iteruj przez produkty w koszyku i tworz elementy na podstawie szablonu
        cart.forEach((product, index) => {
            const productClone = cartTemplate.content.cloneNode(true);

            // Ustaw dane produktu w elemencie
            productClone.querySelector('.product-name').textContent = product.name;
            productClone.querySelector('.product-image').src = product.imgSrc;
            productClone.querySelector('.product-image').alt = product.name;
            productClone.querySelector('.product-price').textContent = 'Cena: ' + product.price + ' PLN';
            
            // Dodaj obsługę przycisków "+" i "-" do zmiany ilości produktów w koszyku
            const btnMinus = productClone.querySelector('.btn-minus');
            const btnPlus = productClone.querySelector('.btn-plus');
            const counter = productClone.querySelector('.counter');

            product.quantity= 1;

            btnMinus.addEventListener('click', () => {
                // Odejmuj 1 od ilości produktu w koszyku
                product.quantity--;
                if (product.quantity < 1) {
                    product.quantity = 1;
                }
                // Aktualizuj licznik
                counter.textContent = product.quantity;
                updateCart();
                // Aktualizuj sumę cen
                updateCartTotal();
            });

            btnPlus.addEventListener('click', () => {
                // Dodaj 1 do ilości produktu w koszyku
                product.quantity++;
                // Aktualizuj licznik
                counter.textContent = product.quantity;
                updateCart();
                // Aktualizuj sumę cen
                updateCartTotal();
            });

            // Ustaw licznik produktu
            counter.textContent = product.quantity;

            // Funkcja do aktualizacji sumy cen w koszyku
            function updateCartTotal() {
                const cartTotalElement = document.querySelector('.cart__summaryPrice');
                const total = calculateCartTotal();

                // Aktualizuj tekst w elemencie .cart__summaryPrice z obliczoną sumą
                cartTotalElement.textContent = total + ' zł';

                if (cart.length === 0) {
                    // Jeśli koszyk jest pusty, ustaw kwotę na 0 zł
                    cartTotalElement.textContent = ' 0 zł';
                }
            }

            // Dodaj obsługę przycisku "Usuń"
            const btnRemove = productClone.querySelector('.btn-remove');
            btnRemove.addEventListener('click', () => {
                // Usuń pozycję z koszyka na podstawie jej indeksu w tablicy
                cart.splice(index, 1);
                // Aktualizuj koszyk w pamięci lokalnej
                updateCart();
                // // Aktualizuj liczbę przedmiotów w koszyku na stronie głównej
                // updateCartItemCount();
                // Aktualizuj wyświetlanie koszyka
                displayCart();
                // Aktualizuj sumę cen
                updateCartTotal();
            });

            // Dodaj element produktu do koszyka
            cartContainer.appendChild(productClone);
            updateCartTotal();
        });
        
    }
    //Nie ma dostępu do index.js
    // function updateCartItemCount() {
    //     const cartItemCountElement = document.querySelector('.menu__cartItemCount');
    //     const cartItemCount = cart.reduce((total, product) => total + product.quantity, 0);
    //     cartItemCountElement.textContent = cartItemCount;
    // }

    // Funkcja do aktualizacji danych w koszyku
    function updateCart() {
        // Zapisuj aktualny koszyk w pamięci lokalnej
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Funkcja do wyświetlania produktów w koszyku
    displayCart();

    


    // Przycisk "Przejdź do strony głównej"
    const backBtn = document.querySelector('.back-btn');
    backBtn.addEventListener('click', function() {
            window.location.href = 'index.html'; // Przekieruj na stronę index.html
    });
    
});