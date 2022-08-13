'use strict';

class Forms {
	constructor() {
		this.forms = document.querySelectorAll('.js-form');
	}

	setListener() {
		this.forms.forEach((form) => {
			form.addEventListener('submit', () => {
				event.preventDefault();
				window.open('/success.html');
			});
		});
	}

	init() {
		if (this.forms.length) {
			this.setListener();
		}
	}
}

export default Forms;
