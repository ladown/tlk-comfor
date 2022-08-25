'use strict';

import Swiper, { Navigation, EffectFade } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import CircleProgress from '../modules/circle-progress';

const AboutInfoSlider = {
	instance: null,

	nodes: {
		wrap: document.querySelector('.about-info'),
		slider: document.querySelector('.js-about-slider'),
		buttons: {
			prevEl: document.querySelector('.about-info .js-slider-prev-btn'),
			nextEl: document.querySelector('.about-info .js-slider-next-btn'),
		},
	},

	setInstance() {
		this.instance = new Swiper(this.nodes.slider, {
			slidesPerView: 1,
			spaceBetween: 15,
			autoHeight: true,
			modules: [Navigation, EffectFade],
			effect: 'fade',
			fadeEffect: {
				crossFade: true,
			},
			navigation: {
				prevEl: this.nodes.buttons.prevEl,
				nextEl: this.nodes.buttons.nextEl,
			},
			on: {
				slideChange: (swiper) => {
					CircleProgress(
						this.nodes.wrap,
						[swiper.activeIndex + 1, swiper.slides.length],
						`${swiper.activeIndex + 1} / ${swiper.slides.length}`,
						true,
					);
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
