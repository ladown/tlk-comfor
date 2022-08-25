'use strict';

import Locker from './locker';
import { gsap } from 'gsap';

const HeaderSubblock = {
	isHoverSet: false,
	isClickSet: false,
	isOpened: false,

	nodes: {
		trigger: document.querySelector('.js-header-subblock-trigger'),
		subblock: document.querySelector('.js-header-subblock'),
	},

	modes: {
		open: 'is-opened',
		unreached: 'is-unreached',
	},

	closeSubblock() {
		gsap.to(HeaderSubblock.nodes.subblock, {
			display: 'none',
			translateY: '40rem',
			opacity: 0,
			duration: 0.3,
			ease: 'linear',
			onStart: () => {
				HeaderSubblock.nodes.subblock.classList.add(HeaderSubblock.modes.unreached);
				Locker.unlock();
			},

			onComplete: () => {
				HeaderSubblock.nodes.subblock.classList.remove(HeaderSubblock.modes.unreached);
			},
		});

		HeaderSubblock.nodes.trigger.classList.remove(HeaderSubblock.modes.open);

		HeaderSubblock.isOpened = !HeaderSubblock.isOpened;
	},

	openSubblock() {
		gsap.to(HeaderSubblock.nodes.subblock, {
			display: 'block',
			translateY: '0',
			opacity: 1,
			duration: 0.3,
			ease: 'linear',
			onStart: () => {
				Locker.lock();
			},
		});

		HeaderSubblock.nodes.trigger.classList.add(HeaderSubblock.modes.open);

		HeaderSubblock.isOpened = !HeaderSubblock.isOpened;
	},

	toggleVisibility(event) {
		event.preventDefault();
		event.stopPropagation();

		const link = event.currentTarget.querySelector('.header__link');
		const path = event.composedPath && event.composedPath();

		if (HeaderSubblock.isOpened) {
			if (path.includes(link)) {
				HeaderSubblock.closeSubblock();
			}
		} else {
			HeaderSubblock.openSubblock();
		}
	},

	setListenerForHover() {
		this.nodes.trigger.addEventListener('mouseenter', this.openSubblock);
		this.nodes.trigger.addEventListener('mouseleave', this.closeSubblock);

		this.isHoverSet = true;
	},

	unsetListenerForHover() {
		this.nodes.trigger.removeEventListener('mouseenter', this.openSubblock);
		this.nodes.trigger.removeEventListener('mouseleave', this.closeSubblock);

		this.isHoverSet = false;
	},

	setListenerForClick() {
		this.nodes.trigger.addEventListener('click', this.toggleVisibility);

		this.isClickSet = true;
	},

	unsetListenerForClick() {
		this.nodes.trigger.removeEventListener('click', this.toggleVisibility);

		this.isClickSet = false;
	},

	setListenersOnResize() {
		window.addEventListener('resize', ({ target }) => {
			if (target && target.innerWidth >= 581 && !this.isHoverSet && this.isClickSet) {
				this.setListenerForHover();
				this.unsetListenerForClick();
			}

			if (target && target.innerWidth <= 580 && this.isHoverSet && !this.isClickSet) {
				this.setListenerForClick();
				this.unsetListenerForHover();
			}
		});
	},

	init() {
		if (this.nodes.subblock && this.nodes.trigger) {
			if (window.innerWidth >= 581) {
				this.setListenerForHover();
			} else {
				this.setListenerForClick();
			}

			this.setListenersOnResize();
		}
	},
};

export default HeaderSubblock;
