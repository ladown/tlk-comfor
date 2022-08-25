'use strict';

import '../scss/app.scss';

import Select from './classes/select';
import Header from './modules/header';
import HeaderSubblock from './modules/header-subblock';
import Tabs from './classes/tabs';
import Sliders from './sliders/sliders';
import Popup from './classes/popup';
import Forms from './classes/forms';
import Reveal from './modules/reveal';
import AboutHero from './modules/about-hero';
import Autocomplete from './classes/autocomplete';

import Defaults from './classes/defaults';

window.addEventListener('DOMContentLoaded', () => {
	Header.init();
	HeaderSubblock.init();
	Sliders();
	new Defaults().init();
	new Forms().init();
	Reveal();
	AboutHero.init();

	const selects = document.querySelectorAll('.js-select');
	if (selects.length) {
		selects.forEach((select) => {
			new Select(select).init();
		});
	}

	const tabs = document.querySelectorAll('.js-tabs');
	if (tabs.length) {
		tabs.forEach((tab) => {
			const isOwnAnimation = tab.getAttribute('data-tabs-own-animation');
			const isSlider = tab.getAttribute('data-tabs-slider');
			new Tabs(tab, isOwnAnimation, isSlider).init();
			tab.removeAttribute('data-tabs-own-animation');
			tab.removeAttribute('data-tabs-slider');
		});
	}

	const callbackPopup = document.querySelector('.js-popup-callback');
	if (callbackPopup) {
		new Popup(callbackPopup, '.js-popup-callback-trigger').init();
	}

	const servicePopup = document.querySelector('.js-popup-service');
	if (servicePopup) {
		new Popup(servicePopup, '.js-popup-service-trigger').init();
	}

	const autocompleteBlocks = document.querySelectorAll('.js-autocomplete-field');
	if (autocompleteBlocks.length) {
		autocompleteBlocks.forEach((block) => {
			new Autocomplete(block).init();
		});
	}
});
