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
