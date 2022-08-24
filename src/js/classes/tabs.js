'use strict';

import $ from 'jquery';

class Tabs {
	constructor(wrapperElement, isOwnAnimation = false, isSlider = false) {
		this.tabs = wrapperElement.querySelectorAll('.js-tabs-button');
		this.tabsContent = wrapperElement.querySelectorAll('.js-tabs-content');
		this.tabsParent = wrapperElement.querySelector('.js-tabs-parent');
		this.mods = {
			active: 'is-active',
			locked: 'is-locked',
			hidden: 'is-hidden',
			out: 'is-out',
			in: 'is-in',
			rightAnimation: 'is-right-animation',
			leftAnimation: 'is-left-animation',
		};
		this.activeTab = 0;
		this.isOwnAnimation = isOwnAnimation;
		this.halfItemsCounter = isOwnAnimation && Math.ceil(this.tabsContent.length / 2);
		this.isSlider = isSlider;
		this.sliderButtons = wrapperElement.querySelectorAll('.slider-buttons');
	}

	toggleVisibility(index = 0) {
		if (this.isOwnAnimation) {
			this.tabsParent.classList.add(this.mods.locked);
			this.tabs[this.activeTab].classList.remove(this.mods.active);
			this.tabsContent[this.activeTab].classList.add(this.mods.out);
			setTimeout(() => {
				this.tabsContent[this.activeTab].classList.remove(this.mods.out, this.mods.active);

				if (index > this.activeTab) {
					this.tabsContent[index].classList.add(this.mods.rightAnimation);
				} else if (index < this.activeTab) {
					this.tabsContent[index].classList.add(this.mods.leftAnimation);
				}

				this.tabsContent[index].classList.add(this.mods.active, this.mods.in);

				setTimeout(() => {
					this.tabsContent[index].classList.remove(this.mods.in, this.mods.leftAnimation, this.mods.rightAnimation);

					this.tabs[index].classList.add(this.mods.active);
					this.tabsParent.classList.remove(this.mods.locked);

					this.activeTab = index;
				}, 400);
			}, 400);
		} else {
			this.tabsParent.classList.add(this.mods.locked);
			this.tabs[this.activeTab].classList.remove(this.mods.active);
			this.isSlider && $(this.sliderButtons[this.activeTab]).fadeOut(200, 'linear');
			$(this.tabsContent[this.activeTab]).fadeOut(300, 'linear', () => {
				$(this.tabsContent[index]).css('display', 'flex').hide().fadeIn(300, 'linear');
				this.tabs[index].classList.add(this.mods.active);
				this.isSlider && $(this.sliderButtons[this.activeTab]).css('display', 'flex').hide().fadeIn(300, 'linear');
				this.tabsParent.classList.remove(this.mods.locked);
			});

			this.activeTab = index;
		}
	}

	setListener() {
		this.tabsParent.addEventListener('click', (event) => {
			if (event.target && event.target.classList.contains('js-tabs-button')) {
				this.tabs.forEach((tab, index) => {
					if (event.target === tab && index !== this.activeTab) {
						this.toggleVisibility(index);
					}
				});
			}
		});
	}

	init() {
		this.setListener();
	}
}

export default Tabs;
