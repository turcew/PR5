document.addEventListener('DOMContentLoaded', () => {
    const buttonAuth = document.querySelector('.button-auth');
	const buttonOut = document.querySelector('.button-out');
	const userName = document.querySelector('.user-name');
	const modalAuth = document.querySelector('.modal-auth');
	const closeAuth = document.querySelector('.close-auth');
	const logInForm = document.querySelector('#logInForm');
	const loginInput = document.querySelector('#login');
	
	console.log("hello")
	if (!modalAuth) {
		console.warn('Модальне вікно авторизації не знайдено на цій сторінці');
	}

	const openModalAuth = () => {
		if (modalAuth) {
			modalAuth.classList.add('show');
			loginInput.style.borderColor = '';
		}
	};

	const closeModalAuth = () => {
		if (modalAuth) {
			modalAuth.classList.remove('show');
			logInForm?.reset();
			loginInput.style.borderColor = '';
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

	if (buttonAuth) {
		buttonAuth.addEventListener('click', openModalAuth);
	}

	if (buttonOut) {
		buttonOut.addEventListener('click', logout);
	}

	if (closeAuth) {
		closeAuth.addEventListener('click', closeModalAuth);
	}

	if (logInForm) {
		logInForm.addEventListener('submit', (event) => {
			event.preventDefault();

			const loginValue = loginInput.value.trim();

			if (!loginValue) {
				loginInput.style.borderColor = 'red';
				return;
			}

			const user = { login: loginValue };
			localStorage.setItem('user', JSON.stringify(user));

			login(loginValue);
			closeModalAuth();
		});

		loginInput.addEventListener('input', () => {
			if (loginInput.value.trim()) {
				loginInput.style.borderColor = '';
			}
		});
	}
});
