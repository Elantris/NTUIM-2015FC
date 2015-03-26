$(document).ready(function() {
	$('#WarnJS').hide();
	$('#SignUpForm').show();
	$('.dropdown').dropdown({
		transition: 'slide down'
	});
	$('#entry-677460826').attr('value', $('#Version').text());
});


function checkForm() {
	$('#SignUpForm').addClass('loading');
	var flag = true,
		tmp,
		inputId = [
			'#entry-1152289928',
			'#entry-357541403',
			'#entry-837454648'
		];
	for (var i = 0; i < inputId.length && flag; i++) {
		tmp = $(inputId[i]).val();
		if (tmp == '' || tmp == null) {
			flag = false;
		};
	};
	tmp = $("#entry-791517028").val();
	if (isNaN(tmp) || tmp <= 0 || tmp >= 52) {
		flag = false;
	};
	if (flag) {
		$('#SignUpForm').slideUp(200).removeClass('error loading');
		$('#ThankYou').slideDown(200);
	} else {
		$('#SignUpForm').addClass('error').removeClass('loading');
	};
	return flag;
}
