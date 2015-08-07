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
// });

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
	return elemBottom > docViewTop;
}

function moveTo(target) {
	$('html,body').animate({
		scrollTop: $(target).offset().top
	}, 300);
}

$(document).scroll(function() {
	if ($(window).scrollTop() > $('#Cover').height() - $('nav').height()) {
		$('nav').addClass('fixed');
	} else {
		$('nav').removeClass('fixed');
	}
});

$('#Sign-Contract').load('doc/contract.md', function() {
	$(this).html(markdown.toHTML($(this).text()));
}); // standard form contract

var signChecked = false;

$('#Sign-Check').click(function() {
	signChecked = !signChecked;
	if (signChecked) {
		$(this).find('i').removeClass('fa-square-o').addClass('fa-check-square-o');
		$('#Sign-Next').addClass('button-primary').removeAttr('disabled');
	} else {
		$(this).find('i').removeClass('fa-check-square-o').addClass('fa-square-o');
		$('#Sign-Next').removeClass('button-primary').attr('disabled', true);
	}
}); // the button for agreement of the contract

$('#Sign-Next').click(function() {
	$('#Sign-Start').slideUp(300);
	$('#Sign-Form').slideDown(300);
	moveTo('#Sign');
});

$('#Version').val('20150807/0.4.4/Infor Page');
$('#UserAgent').val(navigator.userAgent);

var likeVal = [],
	likeCount = 0;

$('.like').each(function() {
	$(this).addClass('fa fa-heart-o').attr('data-id', likeCount);
	likeVal[likeCount++] = 0;
}).click(function() {
	likeVal[$(this).attr('data-id')]++;
	if (likeVal[$(this).attr('data-id')] % 2) {
		$(this).removeClass('fa-heart-o').addClass('fa-heart');
	} else {
		$(this).removeClass('fa-heart').addClass('fa-heart-o');
	}
});

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
});

var field = [
		'#Name',
		'#IDNumber',
		'#StudentID',
		'#Phone',
		'#Email',
		'#Habit',
		'#Account'
	],
	regex = [
		/^\S+$/,
		/^[A-Za-z]{1}[1-2]{1}[0-9]{8}$/,
		/^[BbRr]{1}[0-9]{8}$/,
		/^[0-9]{10}$/,
		/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
		/^\S+$/,
		/^[0-9]{5}$/
	],
	validation = [];

function formValidate() {
	var result = true;

	for (var i = 0; i < field.length; i++) {
		validation[i] = regex[i].test($(field[i]).val());
	}

	$('#StudentID').val($('#StudentID').val().toUpperCase());
	$('#IDNumber').val($('#IDNumber').val().toUpperCase());
	$('#Like').val(likeVal);

	if (validation[1]) { // ID Number validation
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
	}

	for (var i = 0; i < validation.length; i++) {
		if (!validation[i]) {
			$(field[i]).addClass('error');
			result = false;
		}
	}
	if (result) {
		$('#Sign-Form').slideUp(300);
		$('#Sign-Finish').slideDown(300);
		$('.like').addClass('hidden');
	}
	moveTo('#Sign');
	return result;
}

$('input, select, textarea').focus(function() {
	$(this).removeClass('error');
});

$('.show-tab').click(function() {
	$('.tab').slideUp(300);
	if ($(this).hasClass('button-primary')) {
		$(this).removeClass('button-primary');
	} else {
		$('.show-tab.button-primary').not(this).removeClass('button-primary');
		$(this).addClass('button-primary');
		$('#tab' + $(this).attr('data-tab')).slideDown(300);
	}
	moveTo('#Tabs');
});
