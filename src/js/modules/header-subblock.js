'use strict';

import { gsap } from 'gsap';

const HeaderSubblock = {
	isOpened: false,

	nodes: {
		trigger: document.querySelector('.js-header-subblock-trigger'),
		subblock: document.querySelector('.js-header-subblock'),
	},

	modes: {
		open: 'is-opened',
	},

	closeSubblock() {
		gsap.to(this.nodes.subblock, {
			display: 'none',
			translateY: '40rem',
			opacity: 0,
			duration: 0.3,
			ease: 'linear',
		});

		this.nodes.trigger.classList.remove(this.modes.open);

		this.isOpened = !this.isOpened;
	},

	openSubblock() {
		gsap.to(this.nodes.subblock, {
			display: 'block',
			translateY: '0',
			opacity: 1,
			duration: 0.3,
			ease: 'linear',
		});

		this.nodes.trigger.classList.add(this.modes.open);

		this.isOpened = !this.isOpened;
	},

	setListener() {
		this.nodes.trigger.addEventListener('click', (event) => {
			event.preventDefault();
			event.stopPropagation();

			if (this.isOpened) {
				this.closeSubblock();
			} else {
				this.openSubblock();
			}
		});
	},

	setListenerForDocument() {
		document.body.addEventListener('click', (event) => {
			const path = event.composedPath && event.composedPath();
			if (this.isOpened && !path.includes(this.nodes.subblock)) {
				this.closeSubblock();
			}
		});
	},

	init() {
		if (this.nodes.subblock && this.nodes.trigger) {
			this.setListener();
			this.setListenerForDocument();
		}
	},
};

export default HeaderSubblock;
