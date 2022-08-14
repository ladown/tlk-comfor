'use strict';

import Swiper, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import CircleProgress from '../modules/circle-progress';

const AboutInfoSlider = {
	textInstance: null,
	photoInstance: null,

	nodes: {
		wrap: document.querySelector('.about-info'),
		textSlider: document.querySelector('.js-slider-about-info-text'),
		photoSlider: document.querySelector('.js-slider-about-info-photo'),
		buttons: {
			prevEl: document.querySelector('.about-info .js-slider-prev-btn'),
			nextEl: document.querySelector('.about-info .js-slider-next-btn'),
		},
	},

	setInstance() {
		this.textInstance = new Swiper(this.nodes.textSlider, {
			slidesPerView: 1,
			spaceBetween: 15,
			modules: [Navigation],
			navigation: {
				prevEl: this.nodes.buttons.prevEl,
				nextEl: this.nodes.buttons.nextEl,
			},
			on: {
				slideChange: (swiper) => {
					this.photoInstance.slideTo(swiper.activeIndex);

					CircleProgress(
						this.nodes.wrap,
						[this.textInstance.activeIndex + 1, this.textInstance.slides.length],
						`${this.textInstance.activeIndex + 1} / ${this.textInstance.slides.length}`,
						true,
					);
				},
			},
		});

		this.photoInstance = new Swiper(this.nodes.photoSlider, {
			slidesPerView: 1,
			spaceBetween: 15,
			on: {
				slideChange: (swiper) => {
					this.textInstance.slideTo(swiper.activeIndex);
				},
			},
		});
	},

	init() {
		if (this.nodes.wrap) {
			this.setInstance();
		}
	},
};

export default AboutInfoSlider;
