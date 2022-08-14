'use strict';

const CircleProgress = (wrap, value, text = '', isSlider = false) => {
	const progress = wrap.querySelector('.js-circle-progress');
	const progressBar = progress.querySelector('.js-circle-progress-bar');
	const progressText = progress.querySelector('.js-circle-progress-text');
	const dashArray = Number(getComputedStyle(progressBar).strokeDasharray.split(', ')[0].replace('px', ''));

	if (isSlider) {
		const [active, lenght] = value;
		const percentPerSlider = dashArray / lenght;

		progressBar.style.strokeDashoffset = dashArray - active * percentPerSlider;
	} else {
		progressBar.style.strokeDashoffset = dashArray - (dashArray / 100) * value;
	}

	if (text) {
		progressText.textContent = text;
	}
};

export default CircleProgress;
