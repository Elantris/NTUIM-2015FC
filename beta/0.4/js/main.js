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
	var flag = 1;
	if ($(window).scrollTop() > $('#Cover').height()) {
		$('nav').addClass('fixed');
	} else {
		$('nav').removeClass('fixed');
	}
	$('nav a').removeClass('active').each(function() {
		if (flag && isScrolledIntoView($($(this).attr('href')))) {
			$(this).addClass('active');
			flag = 0;
		}
	});
});

$('#Sign-Contract').load('doc/contract.md', function() {
	$(this).html(markdown.toHTML($(this).text()));
}); // standard form contract

$('#Sign-Check').click(function() {
	$(this).find('i').removeClass('fa-square-o').addClass('fa-check-square-o');
	$('#Sign-Next').show().click(function() {
		$('#Sign-Start').slideUp(200);
		$('#Sign-Form').slideDown(200, function() {
			moveTo('#Sign');
		});
	});;
}); // the button for agreement of the contract

$('#Form-Show-Extra').click(function() {
	$(this).hide();
	$('#Form-Extra').slideDown(200);
});

$('#Version').val('20150804/0.4/beta');
$('#UserAgent').val(navigator.userAgent);

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

var field = ['#Name', '#IDNumber', '#Phone', '#Email', '#Habit', '#Account'];

function formValidate() {
	var validation = [
			/^\S+$/.test($('#Name').val()),
			/^[A-Z]{1}[1-2]{1}[0-9]{8}$/.test($('#IDNumber').val()),
			/^[0-9]{10}$/.test($('#Phone').val()),
			/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test($('#Email').val()),
			/^\S+$/.test($('#Habit').val()),
			/^[0-9]{5}$/.test($('#Account').val())
		],
		result = true;
	for (var i = 0; i < validation.length; i++) {
		if (!validation[i]) {
			$(field[i]).addClass('error');
			result = false;
		}
	}
	if (result) {
		$('#Sign-Form').slideUp(200);
		$('#Sign-Finish').slideDown(200);
	}
	moveTo('#Sign');
	return result;
}

$('input, select, textarea').focus(function() {
	$(this).removeClass('error');
});