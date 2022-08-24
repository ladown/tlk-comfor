'use strict';

import { cities } from '../data';

import { gsap } from 'gsap';

class Autocomplete {
	constructor(blockEl) {
		this.block = blockEl;
		this.input = this.block.querySelector('input');
		this.autocomplete = this.block.querySelector('.js-autocomplete');
		this.autocompleteWrap = this.autocomplete.querySelector('.autocomplete__wrap');
		this.state = false;
		this.activeIndex = -1;

		this.modes = {
			opened: 'is-opened',
			active: 'is-active',
		};
	}

	removeAutocompleteItems() {
		const items = this.autocompleteWrap.querySelectorAll('.autocomplete__item');

		items.forEach((item) => {
			item.remove();
		});
	}

	createAutocompleteItem(text = '') {
		const span = document.createElement('span');
		span.classList.add('autocomplete__item');
		span.textContent = text;
		span.addEventListener('click', () => {
			this.setValue(span, text);
		});
		return span;
	}

	fillAutocompleteBlock(val) {
		let relevantItem = 0;
		this.removeAutocompleteItems();
		cities.forEach((city) => {
			if (city.substring(0, val.length).toUpperCase() == val.toUpperCase()) {
				const item = this.createAutocompleteItem(city);
				relevantItem += 1;
				this.autocompleteWrap.append(item);
			}
		});

		if (relevantItem !== 0) {
			this.openAutocomplete();
			relevantItem = 0;
		} else {
			this.closeAutocomplete();
		}
	}

	setValue(option, value) {
		this.input.setAttribute('value', value);
		this.input.value = value;
		option.classList.add(this.modes.active);
		this.closeAutocomplete(true);
	}

	openAutocomplete() {
		this.block.classList.add(this.modes.opened);

		gsap.to(this.autocomplete, {
			opacity: 1,
			display: 'flex',
			transform: 'translateY(0)',
			duration: 0.3,
		});
	}

	closeAutocomplete() {
		this.block.classList.remove(this.modes.opened);

		gsap.to(this.autocomplete, {
			opacity: 0,
			display: 'none',
			transform: 'translateY(50rem)',
			duration: 0.3,
		});
	}

	addActive(items) {
		if (!items) return false;
		this.removeActive(items);
		if (this.activeIndex >= items.length) this.activeIndex = 0;
		if (this.activeIndex < 0) this.activeIndex = items.length - 1;
		items[this.activeIndex].classList.add(this.modes.active);
	}

	removeActive(items) {
		items.forEach((item) => {
			item.classList.remove(this.modes.active);
		});
	}

	setListener() {
		this.input.addEventListener('input', ({ currentTarget }) => {
			this.activeIndex = -1;

			if (currentTarget.value) {
				this.fillAutocompleteBlock(currentTarget.value);
			} else {
				this.closeAutocomplete();
			}
		});

		this.input.addEventListener('keydown', (event) => {
			const items = this.autocompleteWrap.querySelectorAll('.autocomplete__item');

			if (event.key === 'ArrowDown' && event.code === 'ArrowDown') {
				this.activeIndex++;
				this.addActive(items);
			} else if (event.key === 'ArrowUp' && event.code === 'ArrowUp') {
				this.activeIndex--;
				this.addActive(items);
			} else if (event.keyCode == 13) {
				event.preventDefault();

				if (this.activeIndex > -1) {
					if (items) {
						items[this.activeIndex].click();
					}
				}
			}
		});

		document.addEventListener('click', (event) => {
			const path = event.composedPath && event.composedPath();

			if (!path.includes(this.block) && this.block.classList.contains(this.modes.opened)) {
				this.closeAutocomplete();
			}
		});
	}

	init() {
		this.setListener();
	}
}

export default Autocomplete;
