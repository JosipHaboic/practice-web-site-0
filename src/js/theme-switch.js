class ThemeSwitch extends HTMLElement {
	/*
		# Custom elements based theme switcher

		## How to

			### Define theme in your CSS:
			.theme-blue-yellow {
				--primary-color: #33cccc;
				--secondary-color: #cccc33;
				--background-color: #051414;
			}

			### Add this custom element to your HTML

			<theme-switch
				themes="theme-blue-yellow theme-dark-silver theme-deep-purple" default="theme-blue-yellow"
				key="my-themes">
				<button id="theme-switch" onclick="parentNode.dispatch()">Toggle Theme</button>
			</theme-switch>


			### Add your way of saving the theme name to preserve it on next page load

			themeSwitch.addEventListener('theme-change', function onThemeChange(event) {
				// change the theme and save current theme as state to localStorage to backend etc.
				// replace default function with your own
				this.switch((themeName) => localStorage.setItem('andromeda-web', themeName));
			});
	*/
	constructor() {
		super();
		this.themes = this.getAttribute('themes').split(' ');
		this.defaultTheme = this.getAttribute('default');
		this.changeThemeEvent = new Event('theme-change');
		this.switch();
	}
	
	dispatch() {
		this.dispatchEvent(this.changeThemeEvent);
	}

	switch(saveStateFn) {
		let themeName = document.querySelector(':root').className;
		let index = this.themes.indexOf(themeName) || 0;
		let length = this.themes.length;

		index += 1;
		if (index >= length) {
			index = 0;
		}

		document.querySelector(':root').className = this.themes[index];

		// use some function to save theme name to e.g localStorage, Vuex store, or any other store
		if (typeof saveStateFn === 'function') {
			saveStateFn(this.themes[index]);
		}
	}
}

window.customElements.define('theme-switch', ThemeSwitch);


// example of how to switch theme and store theme name to localStorage
// (function init() {
// 	let themeSwitch = document.getElementById('theme-switch');

// 	themeSwitch.addEventListener('theme-change', function onThemeChange(event) {
// 		// change the theme and save current theme as state to localStorage to backend etc.
// 		// replace default function with your own
// 		this.switch((themeName) => localStorage.setItem('andromeda-web', themeName));
// 	});

// })();