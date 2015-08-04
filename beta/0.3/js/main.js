function isScrolledIntoView(elem) {
	var docViewTop = $(window).scrollTop(),
		docViewBottom = docViewTop + $(window).height(),
		elemTop = $(elem).offset().top,
		elemBottom = elemTop + $(elem).height();
	return elemBottom > docViewTop;
}

$(document).scroll(function() {
	var flag = 1;
	if($(window).scrollTop() > $('#Cover').height() - $('nav').height()) {
		$('nav').addClass('fixed');
	}
	else {
		$('nav').removeClass('fixed');
	}
	$('nav a').removeClass('active').each(function() {
		if (flag && isScrolledIntoView($($(this).attr('href')))) {
			$(this).addClass('active');
			flag = 0;
		}
	});
});

$('#Staff button.tab').click(function() {
	$('#Staff button.tab').removeAttr('disabled');
	$(this).attr('disabled', true);
	$('#Staff .tab-page').slideUp(300);
	$('#Staff #' + $(this).attr('data-tab')).slideDown(300);
});
