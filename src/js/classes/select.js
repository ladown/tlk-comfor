'use strict';

import { gsap } from 'gsap';

class Select {
	constructor(select) {
		this.isOpened = false;
		this.select = select;
		this.input = this.select.querySelector('.js-select-input');
		this.value = this.select.querySelector('.js-select-value');
		this.optionWrap = this.select.querySelector('.js-select-options');
		this.options = this.select.querySelectorAll('.js-select-option');
		this.modes = {
			opened: 'is-opened',
			active: 'is-active',
			filled: 'is-filled',
		};
	}

	toggleState() {
		this.isOpened = !this.isOpened;
	}

	setValue(option, value) {
		this.input.setAttribute('value', value);
		this.value.textContent = value;

		if (!this.select.classList.contains(this.modes.filled)) {
			this.select.classList.add(this.modes.filled);
		}

		this.setActiveOption(option);
	}

	setActiveOption(option) {
		this.options.forEach((el) => {
			if (option === el) {
				el.classList.add(this.modes.active);
			} else {
				el.classList.remove(this.modes.active);
			}
		});
	}

	openSelect() {
		this.select.classList.add(this.modes.opened);

		gsap.to(this.optionWrap, {
			opacity: 1,
			display: 'flex',
			transform: 'translateY(0)',
			duration: 0.3,
			ease: 'linear',
		});

		this.toggleState();
	}

	closeSelect() {
		this.select.classList.remove(this.modes.opened);

		gsap.to(this.optionWrap, {
			opacity: 0,
			display: 'none',
			transform: 'translateY(50rem)',
			duration: 0.3,
			ease: 'linear',
		});

		this.toggleState();
	}

	closeOtherSelect() {
		const selects = document.querySelectorAll('.js-select');

		selects.forEach((select) => {
			const selectsOptions = select.querySelector('.js-select-options');

			select.classList.remove(this.modes.opened);

			gsap.to(selectsOptions, {
				opacity: 0,
				display: 'none',
				transform: 'translateY(50rem)',
				duration: 0.3,
				ease: 'linear',
			});
		});
	}

	setListenerForBlock() {
		this.select.addEventListener('click', (event) => {
			event.stopPropagation();

			if (event.target && event.target.classList.contains('js-select-head')) {
				if (!this.isOpened) {
					this.closeOtherSelect();
					this.openSelect();
				} else {
					this.closeSelect();
				}
			} else if (event.target && event.target.classList.contains('js-select-option')) {
				const value = event.target.textContent.trim();

				if (!event.target.classList.contains(this.modes.active)) {
					this.setValue(event.target, value);
				}

				this.closeSelect();
			}
		});
	}

	setListenerForDocument() {
		document.body.addEventListener('click', (event) => {
			const path = event.composedPath && event.composedPath();
			if (this.isOpened && !path.includes(this.select)) {
				this.closeSelect();
			}
		});
	}

	init() {
		this.setListenerForBlock();

		this.setListenerForDocument();
	}
}

export default Select;
