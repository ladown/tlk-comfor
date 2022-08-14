'use strict';

class Defaults {
	changingButton() {
		const buttons = document.querySelectorAll('.js-changing-button');

		if (buttons.length) {
			buttons.forEach((button) => {
				let isChanged = true;
				const parent = button.parentElement;
				const phoneInput = parent.querySelector('.field_tel');
				const emailInput = parent.querySelector('.field_email');
				button.addEventListener('click', () => {
					if (isChanged) {
						phoneInput.classList.add('is-hidden');
						emailInput.classList.remove('is-hidden');
						button.textContent = 'Хочу указать телефон';

						isChanged = !isChanged;
					} else {
						phoneInput.classList.remove('is-hidden');
						emailInput.classList.add('is-hidden');
						button.textContent = 'Хочу указать E-mail';
						isChanged = !isChanged;
					}
				});
			});
		}
	}
	init() {
		this.changingButton();
	}
}

export default Defaults;
