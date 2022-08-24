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

	setServiceAlgoritmProgress() {
		const wrap = document.querySelector('.service-algoritm');

		if (wrap) {
			const progress = wrap.querySelectorAll('.js-circle-progress');
			const progressBar = wrap.querySelectorAll('.js-circle-progress-bar');
			const dashArray = Number(getComputedStyle(progressBar[0]).strokeDasharray.split(', ')[0].replace('px', ''));
			const percentPerItem = dashArray / progress.length;

			progress.forEach((el, index) => {
				progressBar[index].style.strokeDashoffset = dashArray - (index + 1) * percentPerItem;
			});
		}
	}

	setListenerBackButton() {
		const button = document.querySelector('.js-back');

		if (button) {
			button.addEventListener('click', () => {
				history.back();
			});
		}
	}

	changeDirections() {
		const button = document.querySelectorAll('.js-change-direction');

		button.forEach((el) => {
			const parentElement = el.parentElement;
			const directionFrom = parentElement.querySelector('[name="destination_from"]');
			const directionTo = parentElement.querySelector('[name="destination_to"]');

			el.addEventListener('click', () => {
				const directionFromValue = directionFrom.value;
				const directionToValue = directionTo.value;

				directionFrom.value = directionToValue;
				directionFrom.setAttribute('value', directionToValue);
				directionTo.value = directionFromValue;
				directionTo.setAttribute('value', directionFromValue);
			});
		});
	}

	init() {
		this.changingButton();
		this.setServiceAlgoritmProgress();
		this.setListenerBackButton();
		this.changeDirections();
	}
}

export default Defaults;
