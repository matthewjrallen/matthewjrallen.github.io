// Theme persistence across pages
(function () {
	const saved = localStorage.getItem("theme") || "light";
	document.documentElement.setAttribute("data-theme", saved);
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
