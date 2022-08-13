'use strict';

// import $ from 'jquery';

const TypesTabs = {
	nodes: {
		tabs: document.querySelectorAll('.js-types-tab'),
		tabsContent: document.querySelectorAll('.js-types-tab-item'),
		tabsParant: document.querySelector('.js-types-tabs'),
	},

	mods: {
		active: 'is-active',
		locked: 'is-locked',
	},

	hideTypes() {
		this.nodes.tabsContent.forEach((tabContent) => {
			tabContent.classList.remove(this.mods.active);
		});

		this.nodes.tabs.forEach((tab) => {
			tab.classList.remove(this.mods.active);
		});
	},

	showTypes(index) {
		this.nodes.tabsContent[index].classList.add(this.mods.active);
		this.nodes.tabs[index].classList.add(this.mods.active);
	},

	setListener() {
		this.nodes.tabsParant.addEventListener('click', (event) => {
			if (event.target && event.target.classList.contains('js-types-tab')) {
				this.nodes.tabs.forEach((tab, index) => {
					if (event.target === tab) {
						this.hideTypes();
						this.showTypes(index);
					}
				});
			}
		});
	},

	init() {
		if (this.nodes.tabs.length && this.nodes.tabsContent.length && this.nodes.tabsParant) {
			this.setListener();
		}
	},
};

export default TypesTabs;
