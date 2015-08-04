var numRow = Math.floor($(window).height() / $(window).width() * 10) + 1;

for (var i = 0; i < numRow * 10; i++) {
	$('#board').append('<div class="box"></div>');
}

var index = 0;

$(function() {
	$('.box').delay(500).each(function() {
		$(this).delay(100 * Math.floor(index / 10 + index % 10)).animate({
			opacity: 0
		}, 100);
		index++;
	});
	$('#board').delay(500).fadeOut(1000 + Math.max(10, numRow) * 100);
});
