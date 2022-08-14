'use strict';

import ScrollReveal from 'scrollreveal';
import { gsap } from 'gsap';

export default () => {
	const Reveal = ScrollReveal({
		viewOffset: {
			top: document.querySelector('.js-header').offsetHeight,
		},
		viewFactor: 0.5,
		easing: 'linear',
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
						ease: 'linear',
					},
					0.1 * i + 0.1,
				);
			}
		} else {
			const mapPhoto = map.querySelector('.map__map-photo.from-mobile-hidden');

			timeline.to(mapPhoto, {
				x: 0,
				duration: 0.6,
				ease: 'linear',
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
		duration: 300,
		delay: 150,
	});

	Reveal.reveal('.js-reveal-fadeIn', {
		opacity: 0,
		duration: 300,
		delay: 150,
	});

	Reveal.reveal('.js-reveal-slideLeft', {
		distance: '50%',
		origin: 'rigth',
		opacity: 0,
		duration: 300,
		delay: 150,
	});

	Reveal.reveal('.js-reveal-slideRight', {
		distance: '50%',
		origin: 'left',
		opacity: 0,
		duration: 300,
		delay: 150,
	});

	Reveal.reveal('.js-reveal-scale', {
		scale: 0.5,
		opacity: 0,
		duration: 600,
		delay: 150,
	});

	Reveal.reveal('.js-reveal-interval', {
		interval: 200,
	});

	Reveal.reveal('.js-reveal-viewFactor', {
		viewFactor: 0,
	});
};
