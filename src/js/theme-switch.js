class ThemeSwitch extends HTMLElement {
	/*
		Custom elements based theme switcher

		How to:
			1. Add class name to your html tag:
			<html class="theme-blue-yellow"></html>

			2. Define theme in your CSS:
			.theme-blue-yellow {
				--primary-color: #33cccc;
				--secondary-color: #cccc33;
				--background-color: #051414;
			}

			3. Add this custom element to your HTML
			<theme-switch
				themes="theme-blue-yellow theme-dark-silver theme-deep-purple" default="theme-blue-yellow"
				key="my-themes">
				<button id="theme-switch" onclick="parentNode.switch()">Toggle Theme</button>
			</theme-switch>
	*/
	constructor() {
		super();
		this.themes = this.getAttribute('themes').split(' ');
		// if there is not set theme use default one
		this.defaultTheme = this.getAttribute('default');
		this.changeThemeEvent = new CustomEvent('theme-change', 
			{detail: JSON.stringify(
				{ themes: this.getAttribute('themes').split(' '), default: this.getAttribute('default')}
			)}
		);
		this.switch();
	}
	
	switch() {
		this.dispatchEvent(this.changeThemeEvent);
	}

	defaultSwitcher() {
		let themeName = document.querySelector(':root').className;
		let index = this.themes.indexOf(themeName) || 0;
		let length = this.themes.length;

		index += 1;
		if (index >= length) {
			index = 0;
		}

		document.querySelector(':root').className = this.themes[index];
	}
}

window.customElements.define('theme-switch', ThemeSwitch);