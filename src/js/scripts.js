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

(function () {
	const consentStorageKey = "cookie-consent-v1";
	let gtmLoaded = false;

	function pushConsentEvent(status, source) {
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({
			event: "consent_updated",
			consent_status: status,
			consent_source: source,
		});
	}

	function updateGoogleConsent(granted) {
		if (typeof window.gtag !== "function") {
			return;
		}

		window.gtag("consent", "update", {
			ad_storage: granted ? "granted" : "denied",
			analytics_storage: granted ? "granted" : "denied",
			ad_user_data: granted ? "granted" : "denied",
			ad_personalization: granted ? "granted" : "denied",
		});
	}

	function loadGoogleTagManager() {
		if (gtmLoaded || !window.GTM_ID) {
			return;
		}

		gtmLoaded = true;
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({
			"gtm.start": new Date().getTime(),
			event: "gtm.js",
		});

		const script = document.createElement("script");
		script.async = true;
		script.src = "https://www.googletagmanager.com/gtm.js?id=" + window.GTM_ID;
		document.head.appendChild(script);
	}

	function applySavedConsent(consentValue, source) {
		if (consentValue === "granted") {
			updateGoogleConsent(true);
			pushConsentEvent("granted", source);
			loadGoogleTagManager();
			return;
		}

		updateGoogleConsent(false);
		pushConsentEvent("denied", source);
	}

	document.addEventListener("DOMContentLoaded", function () {
		const banner = document.getElementById("cookie-banner");
		const acceptBtn = document.getElementById("cookie-accept");
		const rejectBtn = document.getElementById("cookie-reject");
		const cookieSettingsLink = document.getElementById("cookie-settings");

		if (!banner || !acceptBtn || !rejectBtn) {
			return;
		}

		const savedConsent = localStorage.getItem(consentStorageKey);

		if (savedConsent === "granted" || savedConsent === "denied") {
			applySavedConsent(savedConsent, "stored");
			banner.setAttribute("hidden", "");
		} else {
			banner.classList.add("is-visible");
		}

		if (cookieSettingsLink) {
			cookieSettingsLink.addEventListener("click", function (event) {
				event.preventDefault();
				banner.removeAttribute("hidden");
				banner.classList.add("is-visible");
				acceptBtn.focus();
			});
		}

		acceptBtn.addEventListener("click", function () {
			localStorage.setItem(consentStorageKey, "granted");
			applySavedConsent("granted", "banner");
			banner.classList.remove("is-visible");
			banner.setAttribute("hidden", "");
		});

		rejectBtn.addEventListener("click", function () {
			localStorage.setItem(consentStorageKey, "denied");
			applySavedConsent("denied", "banner");
			banner.classList.remove("is-visible");
			banner.setAttribute("hidden", "");
		});
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
