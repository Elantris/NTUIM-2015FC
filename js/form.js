$('#Thanks').hide();
$('.dropdown').dropdown({
	transition: 'slide down'
});
$('#entry-677460826').attr('value', $('#Version').html());

function checkForm() {
	$('#SignUpForm').addClass('loading');
	var flag = true;
	var inputId = [
		'#entry-1152289928',
		'#entry-357541403',
		'#entry-837454648'
	];
	for (var i = 0; i < inputId.length && flag; i++) {
		var tmp = $(inputId[i]).val();
		if (tmp == '' || tmp == null) {
			flag = false;
		}
	}
	if (flag) {
		$('#SignUpForm').removeClass('error');
		$('#Thanks').fadeIn(500);
		$('#SignUp').fadeOut(500);
	} else {
		$('#SignUpForm').addClass('error');
		$('#SignUpForm').removeClass('loading');
	}
	return flag;
}
