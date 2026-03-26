// Auto-detect system theme unless user has explicitly chosen one.
(function () {
	const html = document.documentElement;
	const storedTheme = localStorage.getItem("theme");
	const media = window.matchMedia("(prefers-color-scheme: dark)");

	function getSystemTheme() {
		return media.matches ? "dark" : "light";
	}

	function applyTheme(theme) {
		html.setAttribute("data-theme", theme);
	}

	applyTheme(storedTheme || getSystemTheme());

	media.addEventListener("change", function () {
		if (!localStorage.getItem("theme")) {
			applyTheme(getSystemTheme());
		}
	});
})();

function toggleTheme() {
	const html = document.documentElement;
	const current = html.getAttribute("data-theme");
	const next = current === "light" ? "dark" : "light";
	html.setAttribute("data-theme", next);
	localStorage.setItem("theme", next);
}

$(function () {
	const $header = $(".header");
	const $toggle = $(".nav-toggle");
	const $navLinks = $(".main-nav a");
	const mobileBreakpoint = 820;

	function closeMobileNav() {
		$header.removeClass("nav-open");
		$toggle.attr("aria-expanded", "false");
	}

	$toggle.on("click", function () {
		$header.toggleClass("nav-open");
		$toggle.attr(
			"aria-expanded",
			$header.hasClass("nav-open") ? "true" : "false",
		);
	});

	$navLinks.on("click", function () {
		if (window.innerWidth <= mobileBreakpoint) {
			closeMobileNav();
		}
	});

	$(window).on("resize", function () {
		if (window.innerWidth > mobileBreakpoint) {
			closeMobileNav();
		}
	});
});
