'use strict';

const ScrollTop = {
	node: document.querySelector('.js-scroll-top'),

	setListener() {
		this.node.addEventListener('click', () => {
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
		});
	},

	init() {
		if (this.node) {
			this.setListener();
		}
	},
};

export default ScrollTop;
