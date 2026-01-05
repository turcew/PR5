document.addEventListener('DOMContentLoaded', () => {
    // === Елементи DOM ===
    const buttonAuth = document.querySelector('.button-auth');
    const buttonOut = document.querySelector('.button-out');
    const userName = document.querySelector('.user-name');
    const modalAuth = document.querySelector('.modal-auth');
    const closeAuth = document.querySelector('.close-auth');
    const logInForm = document.querySelector('#logInForm');
    const loginInput = document.querySelector('#login');
    const passwordInput = document.querySelector('#password');

    const defaultBorderColor = loginInput ? (loginInput.style.borderColor || '') : '';

    const restaurants = [
        { title: "Піца плюс", time: "50 хвилин", rating: 4.5, price: "від 200 ₴", category: "Піца", image: "img/pizza-plus/preview.jpg" },
        { title: "Танукі", time: "60 хвилин", rating: 4.5, price: "От 1 200 ₴", category: "Суші, роли", image: "img/tanuki/preview.jpg" },
        { title: "FoodBand", time: "40 хвилин", rating: 4.5, price: "От 150 ₴", category: "Піца", image: "img/food-band/preview.jpg" },
        { title: "Ikigai", time: "55 хвилин", rating: 4.5, price: "От 250 ₴", category: "Піца", image: "img/palki-skalki/preview.jpg" },
        { title: "Пузата хата", time: "75 хвилин", rating: 4.5, price: "От 300 ₴", category: "Українські страви", image: "img/gusi-lebedi/preview.jpg" },
        { title: "PizzaBurger", time: "45 хвилин", rating: 4.5, price: "От 700 ₴", category: "Піца", image: "img/pizza-burger/preview.jpg" }
    ];

    const menuItems = [
        { title: "Піца Везувій", image: "img/pizza-plus/pizza-vesuvius.jpg", ingredients: "Соус томатний, сир «Моцарелла», шинка, пепероні, перець «Халапіння», соус «Тобаско», томати.", price: 545 },
        { title: "Піца BBQ", image: "img/pizza-plus/pizza-girls.jpg", ingredients: "Соус томатний, пісне тісто, нежирний сир, кукурудза, цибуля, маслини, гриби, помідори, болгарський перець", price: 150 },
        { title: "Піца Оле-Оле", image: "img/pizza-plus/pizza-oleole.jpg", ingredients: "Соус томатний, сир «Моцарелла», черрі, маслини, зелень, майонез", price: 440 },
        { title: "Піца Плюс", image: "img/pizza-plus/pizza-plus.jpg", ingredients: "Соус томатний, сир «Моцарелла», сир «Чеддер», томат, пепероні, телятина, гриби, бекон, болгарський перець.", price: 405 },
        { title: "Піца Гавайська", image: "img/pizza-plus/pizza-hawaiian.jpg", ingredients: "Соус томатний, сир «Моцарелла», шинка, ананаси", price: 340 },
        { title: "Піца Класика", image: "img/pizza-plus/pizza-classic.jpg", ingredients: "Соус томатний, сир «Моцарелла», сир «Пармезан», шинка, салямі, гриби.", price: 310 }
    ];

    function createRestaurantCard(restaurant) {
        return `
            <a href="restaurant.html" class="card card-restaurant">
                <img src="${restaurant.image}" alt="${restaurant.title}" class="card-image" />
                <div class="card-text">
                    <div class="card-heading">
                        <h3 class="card-title">${restaurant.title}</h3>
                        <span class="card-tag tag">${restaurant.time}</span>
                    </div>
                    <div class="card-info">
                        <div class="rating">${restaurant.rating}</div>
                        <div class="price">${restaurant.price}</div>
                        <div class="category">${restaurant.category}</div>
                    </div>
                </div>
            </a>
        `;
    }

    function createMenuCard(item) {
        const cardHTML = `
            <div class="card">
                <img src="${item.image}" alt="${item.title}" class="card-image" />
                <div class="card-text">
                    <div class="card-heading">
                        <h3 class="card-title card-title-reg">${item.title}</h3>
                    </div>
                    <div class="card-info">
                        <div class="ingredients">${item.ingredients}</div>
                    </div>
                    <div class="card-buttons">
                        <button class="button button-primary button-add-cart">
                            <span class="button-card-text">В кошик</span>
                            <span class="button-cart-svg"></span>
                        </button>
                        <strong class="card-price-bold">${item.price} ₴</strong>
                    </div>
                </div>
            </div>
        `;

        const menuContainer = document.querySelector('.cards-menu');
        if (menuContainer) {
            menuContainer.insertAdjacentHTML('beforeend', cardHTML);
        }
    }

    function renderRestaurants() {
        const container = document.querySelector('.cards.cards-restaurants');
        if (!container) return;
        container.innerHTML = '';
        restaurants.forEach(rest => {
            container.insertAdjacentHTML('beforeend', createRestaurantCard(rest));
        });
    }

    function renderMenuItems() {
        const container = document.querySelector('.cards-menu');
        if (!container) return;
        container.innerHTML = '';
        menuItems.forEach(item => createMenuCard(item));
    }

    function initRestaurantClickHandler() {
        const container = document.querySelector('.cards.cards-restaurants');
        if (!container) return;

        container.addEventListener('click', (e) => {
            const card = e.target.closest('.card-restaurant');
            if (!card) return;

            const isLoggedIn = localStorage.getItem('user');
            if (!isLoggedIn) {
                e.preventDefault();
                openModalAuth();
            }
        });
    }

    const openModalAuth = () => {
        if (modalAuth) {
            loginInput.style.borderColor = defaultBorderColor;
            passwordInput.style.borderColor = defaultBorderColor;
            logInForm.reset();
            modalAuth.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeModalAuth = () => {
        if (modalAuth) {
            modalAuth.classList.remove('is-open');
            document.body.style.overflow = '';
            logInForm.reset();
            loginInput.style.borderColor = defaultBorderColor;
            passwordInput.style.borderColor = defaultBorderColor;
        }
    };

    const login = (userLogin) => {
        if (buttonAuth) buttonAuth.style.display = 'none';
        if (buttonOut) buttonOut.style.display = 'flex';
        if (userName) {
            userName.style.display = 'inline';
            userName.textContent = userLogin;
        }
    };

    const logout = () => {
        if (buttonAuth) buttonAuth.style.display = 'flex';
        if (buttonOut) buttonOut.style.display = 'none';
        if (userName) {
            userName.style.display = 'none';
            userName.textContent = '';
        }
        localStorage.removeItem('user');
    };

    if (localStorage.getItem('user')) {
        const user = JSON.parse(localStorage.getItem('user'));
        login(user.login);
    }

    if (buttonAuth) buttonAuth.addEventListener('click', openModalAuth);
    if (buttonOut) buttonOut.addEventListener('click', logout);
    if (closeAuth) closeAuth.addEventListener('click', closeModalAuth);

    if (modalAuth) {
        modalAuth.addEventListener('click', (e) => {
            if (e.target === modalAuth) closeModalAuth();
        });
    }

    if (logInForm) {
        logInForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const loginValue = loginInput.value.trim();
            const passwordValue = passwordInput.value.trim();

            let hasError = false;
            if (!loginValue) { loginInput.style.borderColor = 'red'; hasError = true; }
            else loginInput.style.borderColor = defaultBorderColor;

            if (!passwordValue) { passwordInput.style.borderColor = 'red'; hasError = true; }
            else passwordInput.style.borderColor = defaultBorderColor;

            if (hasError) return;

            const user = { login: loginValue };
            localStorage.setItem('user', JSON.stringify(user));
            login(loginValue);
            closeModalAuth();
        });

        [loginInput, passwordInput].forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim()) input.style.borderColor = defaultBorderColor;
            });
        });
    }

    if (document.querySelector('.cards.cards-restaurants')) {
        renderRestaurants();
        initRestaurantClickHandler();
    }

    if (document.querySelector('.cards-menu')) {
        renderMenuItems();
    }
});