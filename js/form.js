$('#WarnJS').hide();
$('#SignUpForm').show();
$('.dropdown').dropdown({
	transition: 'slide down'
});

var inputId = [
	'#entry-182736608', // Operating System
	'#entry-1959991238', // Browser
	// '#entry-537207203', // School ID
	'#entry-1907044871', // Feedback
	'#entry-905367400', // Version
	'#entry-1258616304' // User Agent
];

$('#entry-905367400').val($('#Version').text()); // Version
$('#entry-1258616304').val(window.navigator.userAgent); // User Agent

function checkForm() {
	$('#SignUpForm').addClass('loading');
	$('#Sign #error1').slideUp(250);
	$('#Sign #error2').slideUp(250);

	var error = validateForm();
	switch (error) {
		case 0:
			setTimeout(function() {
				$('#ThankYou').slideDown(250);
				$('#SignUpForm').removeClass('loading').slideUp(250);
			}, 500);
			return true;
		case 1:
			setTimeout(function() {
				$('#Sign #error1').slideDown(250);
				$('#SignUpForm').removeClass('loading');
			}, 500);
			return false;
		case 2:
			setTimeout(function() {
				$('#Sign #error2').slideDown(250);
				$('#SignUpForm').removeClass('loading');
			}, 500);
			return false;
	};
}

function validateForm() {
	var tmp;
	for (var i = 0; i < inputId.length; i++) {
		tmp = $(inputId[i]).val();
		if (tmp == '' || tmp == null) {
			return 1
		}
	}

	if (/^[\u4e00-\u9fa5]$/.test($('#entry-1907044871').val()[0]) == false) return 2;

	tmp = $("#entry-537207203").val();
	if (tmp == '' || tmp == null);
	else if (isNaN(tmp) || tmp < 1 || tmp > 52) {
		return 2;
	}
	return 0;
}
