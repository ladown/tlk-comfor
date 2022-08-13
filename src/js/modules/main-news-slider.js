'use strict';

import Swiper, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

const MainNewsSlider = {
	instance: [],
	node: document.querySelectorAll('.js-main-news-slider'),
	button: {
		prevEl: document.querySelectorAll('.main-news .js-slider-prev-btn'),
		nextEl: document.querySelectorAll('.main-news .js-slider-next-btn'),
	},

	setInstance() {
		this.node.forEach((sliderNode, index) => {
			const slider = new Swiper(sliderNode, {
				slidesPerView: 3,
				spaceBetween: 28,
				grabCursor: true,
				observeParents: true,
				observeSlideChildren: true,
				observer: true,
				modules: [Navigation],
				navigation: {
					nextEl: this.button.nextEl[index],
					prevEl: this.button.prevEl[index],
				},
				breakpoints: {
					0: {
						slidesPerView: 'auto',
						spaceBetween: 12,
					},
					581: {
						slidesPerView: 'auto',
						spaceBetween: 16,
					},
					767: {
						slidesPerView: 3,
						spaceBetween: 20,
					},
					981: {
						slidesPerView: 3,
						spaceBetween: 28,
					},
				},
			});

			this.instance.push(slider);
		});
	},

	init() {
		if (this.node) {
			this.setInstance();
		}
	},
};

export default MainNewsSlider;
