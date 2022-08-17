'use strict';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutHero = {
	instance: null,

	nodes: {
		wrap: document.querySelector('.js-about-hero'),
		photo: document.querySelector('.js-about-hero-photo'),
		appendBlock: document.querySelector('.js-about-hero-append-block'),
	},

	size: {
		width: 0,
		height: 0,
	},

	getHeaderHeight() {
		return document.querySelector('.js-header').offsetHeight;
	},

	setSizes() {
		this.size.width = `${this.nodes.appendBlock.offsetWidth}px`;
		this.size.height = `${this.nodes.appendBlock.offsetHeight}px`;
	},

	getCoords(elem) {
		let box = elem.getBoundingClientRect();

		return {
			top: box.top + window.pageYOffset,
			right: box.right + window.pageXOffset,
			bottom: box.bottom + window.pageYOffset,
			left: box.left + window.pageXOffset,
		};
	},

	setAnimation() {
		this.instance = gsap
			.timeline({
				scrollTrigger: {
					trigger: this.nodes.wrap,
					endTrigger: this.nodes.appendBlock,
					start: 'top +=10',
					end: `bottom 75%`,
					scrub: 1,
				},
			})
			.to(this.nodes.photo, {
				width: this.size.width,
				height: this.size.height,
				translateY: this.getCoords(this.nodes.appendBlock).top,
				duration: 0.6,
				delay: 0.1,
				ease: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
			});
	},

	init() {
		if (this.nodes.wrap) {
			this.setSizes();
			this.setAnimation();
		}
	},
};

export default AboutHero;
