'use strict';

import ScrollReveal from 'scrollreveal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default () => {
	const Reveal = ScrollReveal({
		viewOffset: {
			top: document.querySelector('.js-header').offsetHeight,
		},
		duration: 600,
		delay: 150,
		interval: 100,
		viewFactor: 0.5,
		easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
	});

	const map = document.querySelector('.js-map-reveal');

	if (map) {
		const labels = document.querySelector('.js-map-reveal .map__labels');
		const timeline = gsap.timeline({
			paused: true,
			onComplete: () => {
				labels.classList.add('is-visible');
			},
		});

		if (window.innerWidth >= 581) {
			const mapPaths = Array.from(document.querySelectorAll('.js-map-reveal path'));

			const count = 3;
			const division = mapPaths.length / count;

			for (var i = 0; count > i; i++) {
				const el = mapPaths.splice(0, division);
				timeline.fromTo(
					el,
					{
						scale: 0.5,
						opacity: 0,
					},
					{
						scale: 1,
						opacity: 1,
						stagger: 0.05,
						duration: 1,
						ease: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
					},
					0.1 * i + 0.1,
				);
			}
		} else {
			const mapPhoto = map.querySelector('.map__map-photo.from-mobile-hidden');

			timeline.to(mapPhoto, {
				x: 0,
				duration: 0.6,
				ease: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
			});
		}

		const revealMap = () => {
			timeline.play();
		};

		Reveal.reveal('.js-map-reveal', {
			beforeReveal: revealMap,
		});
	}

	Reveal.reveal('.js-reveal-slideUp', {
		distance: '50%',
		origin: 'bottom',
		opacity: 0,
	});

	Reveal.reveal('.js-reveal-fadeIn', {
		opacity: 0,
	});

	Reveal.reveal('.js-reveal-slideLeft', {
		distance: '50%',
		origin: 'rigth',
		opacity: 0,
	});

	Reveal.reveal('.js-reveal-slideRight', {
		distance: '50%',
		origin: 'left',
		opacity: 0,
	});

	Reveal.reveal('.js-reveal-scale', {
		scale: 0.5,
		opacity: 0,
	});

	Reveal.reveal('.js-reveal-interval', {
		interval: 100,
	});

	Reveal.reveal('.js-reveal-viewFactor', {
		viewFactor: 0,
	});

	const customRevealBlock = document.querySelectorAll('.js-custom-reveal');

	if (customRevealBlock.length) {
		const headerHeight = document.querySelector('.js-header').offsetHeight;

		customRevealBlock.forEach((block) => {
			const items = Array.from(block.querySelectorAll('.js-custom-reveal-item'));

			gsap.timeline({
				scrollTrigger: {
					trigger: customRevealBlock,
					start: `top +=${headerHeight}px`,
					once: true,
					onEnter: () => {
						gsap.fromTo(
							items,
							{
								translateX: 0,
								translateY: 40,
								translateZ: 1,
								opacity: 0,
							},
							{
								translateX: 0,
								translateY: 0,
								translateZ: 1,
								opacity: 1,
								duration: 1,
								stagger: 0.5,
								ease: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
							},
						);
					},
					onEnterBack: () => {
						gsap.fromTo(
							items.reverse(),
							{
								translateX: 0,
								translateY: 40,
								translateZ: 1,
								opacity: 0,
							},
							{
								translateX: 0,
								translateY: 0,
								translateZ: 1,
								opacity: 1,
								duration: 1,
								stagger: 0.25,
								ease: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
							},
						);
					},
				},
			});
		});
	}
};
