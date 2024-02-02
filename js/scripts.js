var site = {
	body: $('body'),
	init: function () {
		
		/******************************************************************************
		* iOS window height fix
		*/
		$(window).resize(function() {
			
			var windowHeight = $(window).height();
			
			$('body').css('--app-height', windowHeight + 'px');
			
		}).resize();
		
		/******************************************************************************
		* Light / Dark theme.
		*/
		const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
		
		// Set initial body class.
		if (prefersDarkScheme.matches) {
			
			site.body.addClass('dark-theme');
			
		} else {
			
			site.body.toggleClass('light-theme');
			
		}
		
		// Check for local storage and add preference if not set.
		if (!localStorage.getItem('mode')) {
			
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				
				localStorage.setItem('mode', 'dark-theme');
				
			} else {
				
				localStorage.setItem('mode', 'light-theme');
				
			}
			
		}
		
		// Set interface to match local storage
		if (localStorage.getItem('mode') == 'dark-theme') {
			
			site.body.addClass('dark-theme');
			site.body.removeClass('light-theme');
			
		} else {
			
			site.body.removeClass('dark-theme');
			site.body.addClass('light-theme');
			
		}
		
		// Theme toggle button
		$('#theme-toggle').on('click', function(event) {
			
			event.preventDefault();
			
			if (site.body.hasClass('dark-theme')) {
				
				site.body.removeClass('dark-theme');
				site.body.addClass('light-theme');
				
				localStorage.setItem('mode', 'light-theme');
				
			} else {
				
				site.body.removeClass('light-theme');
				site.body.addClass('dark-theme');
				
				localStorage.setItem('mode', 'dark-theme');
				
			}
			
		});
		
	}
};

$(document).ready(function () { site.init(); });
