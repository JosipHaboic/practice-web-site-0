(function init() {
	let themeSwitch = document.getElementById('theme-switch');

	themeSwitch.addEventListener('theme-change', function onThemeChange(event) {
		// change the theme and save current theme as state to localStorage to backend etc.
		// replace default function with your own
		this.switch((themeName) => localStorage.setItem('andromeda-web', themeName));
	});

})();
