window.furrets = window.furrets || {};
window.USER_OVERRIDE = window.USER_OVERRIDE || {};

const acceptedHostnames = window.USER_OVERRIDE.acceptedHostnames
	? window.USER_OVERRIDE.acceptedHostnames
	: [
			'css.furret.codes', // production server
			'furretcss-lib.rayhanadev.repl.co', // development server
	  ];

/*
 * @internal
 * Source: {@link https://stackoverflow.com/questions/16791527/can-i-use-a-regular-expression-in-queryselectorall}
 */
const DOMRegex = function (elem, attr, regex) {
	const output = [];
	const elements = document.querySelectorAll(elem);

	for (const link of elements) {
		const url = acceptedHostnames.includes(location.hostname)
			? new URL(link[attr], location.origin) // use website hostname (self-hosting)
			: new URL(link[attr]); // use link hostname (cdn)

		if (regex.test(url.pathname)) {
			output.push(link);
		}
	}

	return output;
};

/*
 * @internal
 */
const loadColorScheme = function (scheme) {
	if (!['light', 'dark'].includes(scheme)) scheme = 'light';

	const furretcssPath = new RegExp(
		'/furretcss/v2/full/(?:light|dark)(?:.min)?.css',
	);

	const links = DOMRegex('link', 'href', furretcssPath);

	for (const link of links) {
		const url = acceptedHostnames.includes(location.hostname)
			? new URL(link.href, location.origin) // use website hostname (self-hosting)
			: new URL(link.href); // use link hostname (cdn)

		if (!acceptedHostnames.includes(url.hostname)) continue;

		if (link.rel === 'stylesheet') {
			const min = link.href.includes('.min') ? '.min' : '';
			link.href = `${url.protocol}//${url.hostname}/furretcss/v2/full/${scheme}${min}.css`;
		}
	}
};

/*
 * Side effect of loading the file. Sets up first interaction states
 * and sets localStorage keys. Does not activate theme, use
 * furrets.addThemeToggle() to do that.
 */
if (localStorage.getItem('furretcss-interacted') !== 'true') {
	if (
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches
	) {
		localStorage.setItem('furretcss-theme', 'dark');
		localStorage.setItem('furretcss-interacted', 'true');
	} else {
		localStorage.setItem('furretcss-theme', 'none');
	}
}

/*
 * Function to manually toggle the theme.
 */
window.furrets.themeToggle = function (toggleBtn) {
	const themeToSet =
		localStorage.getItem('furretcss-theme') === 'dark' ? 'light' : 'dark';

	loadColorScheme(themeToSet);
	localStorage.setItem('furretcss-theme', themeToSet);
	if (toggleBtn) toggleBtn.innerText = themeToSet === 'light' ? '☀️' : '🌙';

	return themeToSet;
};

/*
 * Function to initialize the theme and add a toggle to
 * the website.
 */
window.furrets.addThemeToggle = function () {
	const storedTheme = localStorage.getItem('furretcss-theme');
	const themeToggle = document.createElement('button');
	themeToggle.innerText = storedTheme === 'light' ? '☀️' : '🌙';
	themeToggle.className = 'theme-toggle-btn';
	themeToggle.addEventListener('click', () =>
		window.furrets.themeToggle(themeToggle),
	);

	const container = document.querySelector('div.container');
	container.insertAdjacentElement('afterbegin', themeToggle);

	const furretcssPath = new RegExp(
		'/furretcss/v2/full/(?:light|dark)(?:.min)?.css',
	);
	const links = DOMRegex('link', 'href', furretcssPath);

	if (links.length === 0) {
		console.warn(
			'Warning: a full furretcss stylesheet was not found. Cannot choose stylesheet to preload.',
		);
		return;
	}

	const loadedTheme =
		links[0].href.split('/').pop().split('.')[0] === 'light'
			? 'light'
			: 'dark';
	const themeToPreload = loadedTheme === 'light' ? 'dark' : 'light';

	const preload = document.createElement('link');
	preload.rel = 'preconnect';
	preload.href = links[0].href.replace(loadedTheme, themeToPreload);
	preload.as = 'text/css';

	links[0].after(preload);

	loadColorScheme(storedTheme);
};
