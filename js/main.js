$(function() {
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 300);
				return false;
			}
		}
	});
}); // smooth scroll

function isScrolledIntoView(elem) {
	var docViewTop = $(window).scrollTop(),
		docViewBottom = docViewTop + $(window).height(),
		elemTop = $(elem).offset().top,
		elemBottom = elemTop + $(elem).height();
	return elemTop < docViewBottom;
}

function moveTo(target, offset) {
	if (!offset) offset = 0;
	$('html,body').animate({
		scrollTop: $(target).offset().top - offset
	}, 300);
} // scroll to target smoothly

$(document).scroll(function() {
	if ($(window).scrollTop() > $('#Cover').height() - $('nav').height()) {
		$('nav').addClass('fixed');
	} else {
		$('nav').removeClass('fixed');
	}
	$('.wait').each(function() {
		if (isScrolledIntoView($(this))) {
			$(this).animate({
				opacity: 1
			}, 500).removeClass('wait');
		}
	});
}); // navigator fixed when out of screen

$('#News .news .title').click(function() {
	$('.content').hide();
	if ($(this).hasClass('active')) {
		$(this).removeClass('active');
	} else {
		$(this).addClass('active');
		$('.content[data-file="' + $(this).attr('data-file') + '"]').load('doc/news' + $(this).attr('data-file') + '.md', function() {
			$(this).html(markdown.toHTML($(this).text()));
		}).fadeIn(500);
	}
});

$('#Story').load('doc/story.md', function() {
	$(this).html(markdown.toHTML($(this).text()));
}); // story message

$('.show-tab').click(function() {
	$('.tab.active').removeClass('active').hide();
	if ($(this).hasClass('button-primary')) {
		$(this).removeClass('button-primary');
	} else {
		$('.show-tab.button-primary').removeClass('button-primary');
		$(this).addClass('button-primary');
		$('.tab[data-tab="' + $(this).attr('data-tab') + '"]').addClass('active').fadeIn(300);
	}
}); // Staff
