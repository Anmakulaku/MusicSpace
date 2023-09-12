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
            });

            btnPlus.addEventListener('click', () => {
                // Dodaj 1 do ilości produktu w koszyku
                product.quantity++;
                // Aktualizuj licznik
                counter.textContent = product.quantity;
                updateCart();
            });

            // Ustaw licznik produktu
            counter.textContent = product.quantity;

            // Dodaj obsługę przycisku "Usuń"
            const btnRemove = productClone.querySelector('.btn-remove');
            btnRemove.addEventListener('click', () => {
                // Usuń pozycję z koszyka na podstawie jej indeksu w tablicy
                cart.splice(index, 1);
                // Aktualizuj wyświetlanie koszyka
                displayCart();
                // Aktualizuj koszyk w pamięci lokalnej
                updateCart();
            });


            // Dodaj element produktu do koszyka
            cartContainer.appendChild(productClone);
            
        });
        
    }

    // Funkcja do aktualizacji danych w koszyku
    function updateCart() {
        // Zapisuj aktualny koszyk w pamięci lokalnej
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Funkcja do wyświetlania koszyka na stronie
    displayCart();

    // Przycisk "Przejdź do strony głównej"
    const backBtn = document.querySelector('.back-btn');
    backBtn.addEventListener('click', function() {
            window.location.href = 'index.html'; // Przekieruj na stronę index.html
    });
    
});