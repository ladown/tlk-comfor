'use strict';

class AnimatingNumbers {
	constructor(item) {
		this.time = 0.3;
		this.cc = 0;
		this.countedValue = 1;
		this.block = item;
		this.value = Number(this.block.textContent.replace(/\s/gim, ''));
		this.step = (1000 * this.time) / this.value;
		this.block.textContent = 0;
	}

	startAnimation() {
		const interval = setInterval(() => {
			if (this.countedValue <= this.value) {
				this.block.textContent = this.countedValue;
			} else {
				this.cc = this.cc + 2;
				clearInterval(interval);
			}
			this.countedValue++;
		}, this.step);
	}
}

export default AnimatingNumbers;
