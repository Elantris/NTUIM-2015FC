/* ========== document ========== */

// var numRow = Math.floor($(window).height() / $(window).width() * 10) + 1;

// for (var i = 0; i < numRow * 10; i++) {
// 	$('#board').append('<div class="box"></div>');
// }

// var index = 0;

// $(function() {
// 	$('.box').delay(500).each(function() {
// 		$(this).delay(100 * Math.floor(index / 10 + index % 10)).animate({
// 			opacity: 0
// 		}, 100);
// 		index++;
// 	});
// 	$('#board').delay(500).fadeOut(1000 + Math.max(10, numRow) * 100);
// }); // opening animation in prepare


$(function() {
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 500);
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
		scrollTop: target.offset().top - offset
	}, 500);
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





/* ========== News page ========== */

$('#News .news .title').click(function() {
	$('#News .content.active').removeClass('active').hide();
	if ($(this).hasClass('active')) {
		$(this).removeClass('active');
	} else {
		moveTo($(this), 64);
		$('#News .title.active').removeClass('active');
		$(this).addClass('active');
		$('#News .content[data-file="' + $(this).attr('data-file') + '"]').addClass('active').load('doc/news' + $(this).attr('data-file') + '.md',
			function() {
				$(this).html(markdown.toHTML($(this).text()));
			}).fadeIn(500);
	}
});





/* ========== Infor page ========== */

$('#Story').load('doc/story.md', function() {
	$(this).html(markdown.toHTML($(this).text()));
}); // story message





/* ========== Staff page ========== */

$('span.like').each(function() {
	$(this).attr('data-count', 0).html('<i class="fa fa-heart-o"></i> <span></span>');
	$('.like i.fa-heart-o').click(function() {
		$(this).removeClass('fa-heart-o').addClass('fa-heart');
	});
}).click(function() {
	$(this).attr('data-count', parseInt($(this).attr('data-count')) + 1).find('span').text($(this).attr('data-count'));
	$('#LikeName').val($(this).attr('data-name'));
	$('#like-count-form').submit();
}); // like function

$('.show-tab').click(function() {
	$('.tab.active').removeClass('active').hide();
	if ($(this).hasClass('button-primary')) {
		$(this).removeClass('button-primary');
	} else {
		$('.show-tab.button-primary').removeClass('button-primary');
		$(this).addClass('button-primary');
		$('.tab[data-tab="' + $(this).attr('data-tab') + '"]').addClass('active').fadeIn(500);
	}
}); // staff list





/* ========== Sign up page ========== */

$('#Sign-start-contract').load('doc/contract.md', function() {
	$(this).html(markdown.toHTML($(this).text()));
}); // standard form contract

var signChecked = false;

$('#Sign-start-check').click(function() {
	signChecked = !signChecked;
	if (signChecked) {
		$(this).find('i').addClass('fa-check-square-o').removeClass('fa-square-o');
		$('#Sign-start-next').addClass('button-primary').removeAttr('disabled');
	} else {
		$(this).find('i').removeClass('fa-check-square-o').addClass('fa-square-o');
		$('#Sign-start-next').removeClass('button-primary').attr('disabled', true);
	}
}); // the button for agreement of the contract

$('#Sign-start-next').click(function() {
	moveTo($('#Sign'));
	$('#Sign-start').slideUp(500);
	$('#Sign-form').fadeIn(500);
});

$('#Version').val('20150814/1.0.2/Infor Imporved');
$('#UserAgent').val(navigator.userAgent); // hidden input field

var daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

$('#BirthYear, #BirthMonth').change(function() {
	var dayLimit = daysOfMonth[$('#BirthMonth').val() - 1];
	if ($('#BirthYear').val() == 85 && $('#BirthMonth').val() == 2) {
		dayLimit = 29;
	}
	if ($('#BirthDay').val() > dayLimit) {
		$('#BirthDay').val(dayLimit);
	}
	for (var i = 29; i <= 31; i++) {
		if (i <= dayLimit) {
			$('#BirthDay option[value="' + i + '"]').removeAttr('disabled');
		} else {
			$('#BirthDay option[value="' + i + '"]').attr('disabled', true);
		}
	}
}); // birth date condition

var field = [
		'#Name',
		'#IDNumber',
		'#StudentID',
		'#Phone',
		'#Email',
		'#Habit',
	], // field IDs
	regex = [
		/^\S+$/,
		/^[A-Za-z]{1}[1-2]{1}[0-9]{8}$/,
		/^[BbRr]{1}[0-9]{8}$/,
		/^[0-9]{10}$/,
		/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
		/^\S+$/,
	], // regular expressions
	validation = []; // result

$('#Form-sign-up').submit(function() { // form onsubmit event
	var result = true;

	$('#StudentID').val($('#StudentID').val().toUpperCase());
	$('#IDNumber').val($('#IDNumber').val().toUpperCase());

	for (var i = 0; i < field.length; i++) {
		validation[i] = regex[i].test($(field[i]).val());
	} // regular expression test

	if (validation[1]) {
		var letterToNumber = 'ABCDEFGHJKLMNPQRSTUVWXYZIO',
			x = 0;
		for (var i = 0; i < letterToNumber.length; i++) {
			if ($('#IDNumber').val()[0] == letterToNumber[i]) {
				i += 10;
				x += Math.floor(i / 10) + (i % 10) * 9;
				break;
			}
		}
		for (var i = 0; i < 8; i++) {
			x += $('#IDNumber').val()[i + 1] * (8 - i);
		}
		x += $('#IDNumber').val()[9] * 1;
		if (x % 10 != 0) {
			validation[1] = false;
		}
	} // ID Number validation

	for (var i = 0; i < validation.length; i++) {
		if (!validation[i]) {
			$(field[i]).addClass('error');
			result = false;
		}
	} // add error message

	if (result) {
		moveTo($('#Sign'));
		$('#Sign-form').slideUp(500);
		$('#Sign-finish').fadeIn(500);
		$('.like').addClass('hidden');
	} else {
		moveTo($('.error:first'), 128);
	}

	return result;
});

$('input, select, textarea').focus(function() {
	$(this).removeClass('error');
});
