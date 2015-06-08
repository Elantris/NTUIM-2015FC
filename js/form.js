var likeVal = [],
	likeCount = 0;

$('#Staff span.like').html('<i class="fa fa-heart-o"></i><i class="fa fa-heart hidden"></i>').each(function() {
	$(this).attr('data-id', likeCount);
	likeVal[likeCount++] = 0;
}).click(function() {
	$(this).find('i').toggle();
	likeVal[$(this).attr('data-id')]++;
});

$('#form-extra').click(function() {
	$(this).hide(300);
	$('#Extra-infor').slideDown(300);
});

$('#form-check').click(function() {
	$(this).find('i').removeClass('fa-square-o').addClass('fa-check-square-o');
	$('#form-submit').removeAttr('disabled');
});

var formInputs = {
	realName: '[name="entry.964583837"]',
	birthYear: '[name="entry.1066476723"]',
	birthMonth: '[name="entry.1611764283"]',
	birthDay: '[name="entry.2053091259"]',
	IdNumber: '[name="entry.622678089"]',
	phoneNumber: '[name="entry.362600180"]',
	emailAddress: '[name="entry.1445610279"]',
	emergencyCall: '[name="entry.2110180731"]',
	account: '[name="entry.1511944138"]',
	nickname: '[name="entry.1341100529"]',
	gender: '[name="entry.1620987134"]',
	size: '[name="entry.569168868"]',
	eatingHabit: '[name="entry.1852489224"]',
	selfIntro: '[name="entry.2048275994"]',
	toSenpai: '[name="entry.162312682"]',
	status: '[name="entry.909153445"]',
	sexOri: '[name="entry.334248260"]',
	like: '[name="entry.1861483295"]',
	ver: '[name="entry.665308974"]',
	ua: '[name="entry.1243370905"]',
	F_ver: '[name="entry.455410392"]',
	F_ua: '[name="entry.481937225"]'
};

$(formInputs.birthYear + ', ' + formInputs.birthMonth).change(function() {
	var MD = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		tmp = MD[$(formInputs.birthMonth).val() - 1];
	if ($(formInputs.birthYear).val() == 85 && $(formInputs.birthMonth).val() == 2) {
		tmp = 29;
	}
	if ($(formInputs.birthDay).val() > tmp) {
		$(formInputs.birthDay).val(tmp);
	}
	for (var i = 29; i <= 31; i++) {
		if (i <= tmp) {
			$(formInputs.birthDay + ' option[value="' + i + '"]').removeAttr('disabled');
		} else {
			$(formInputs.birthDay + ' option[value="' + i + '"]').attr('disabled', true);
		}
	}
});

$(formInputs.F_ver + ', ' + formInputs.ver).val('20150608/0.3.2.2/bugs fixed');
$(formInputs.F_ua + ', ' + formInputs.ua).val(navigator.userAgent);

function formValidation() {
	var validation = true;
	$('#Basic-infor p').hide();
	if (!$(formInputs.realName).val()) {
		$('#Basic-infor .realName').show();
		validation = false;
	}
	var tmp = /^[A-Z]{1}[1-2]{1}[0-9]{8}$/.test($(formInputs.IdNumber).val());
	if (tmp) {
		var L1 = 'ABCDEFGHJKLMNPQRSTUVWXYZIO',
			x = 0;
		for (var i = 0; i < L1.length; i++) {
			if ($(formInputs.IdNumber).val()[0] == L1[i]) {
				i += 10;
				x += (i - (i % 10)) / 10;
				x += (i % 10) * 9;
				break;
			}
		}
		for (var i = 0; i < 8; i++) {
			x += $(formInputs.IdNumber).val()[i + 1] * (8 - i);
		}
		if ((x + $(formInputs.IdNumber).val()[9] * 1) % 10 != 0) {
			$('#Basic-infor .IdNumber1').show();
			validation = false;
		}
	} else {
		$('#Basic-infor .IdNumber2').show();
		validation = false;
	}
	tmp = /^[0-9]{10}$/.test($(formInputs.phoneNumber).val());
	if (!tmp) {
		$('#Basic-infor .phoneNumber').show();
		validation = false;
	}
	tmp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test($(formInputs.emailAddress).val());
	if (!tmp) {
		$('#Basic-infor .emailAddress').show();
		validation = false;
	}
	tmp = /^[0-9]{10}$/.test($(formInputs.emergencyCall).val());
	if (!tmp) {
		$('#Basic-infor .emergencyCall').show();
		validation = false;
	}
	tmp = /^[0-9]{5}$/.test($(formInputs.account).val());
	if (!tmp) {
		$('#Basic-infor .account').show();
		validation = false;
	}
	if (!$(formInputs.nickname).val()) {
		$('#Basic-infor .nickname').show();
		validation = false;
	}
	if (!$(formInputs.eatingHabit).val()) {
		$('#Basic-infor .eatingHabit').show();
		validation = false;
	}
	tmp = '';
	for (var i = 0; i < likeCount; i++) {
		tmp += likeVal[i] + ' ';
	}
	$(formInputs.like).val(tmp);
	if (validation) {
		$('#Staff span.like').hide();
		$('#Sign form').slideUp(300);
		$('#ThanksPage, #Debug').slideDown(300);
		$('body').animate({
			scrollTop: $('#Sign').offset().top
		}, 300);
	}
	return validation;
}

$('#Feedback-check').click(function() {
	$(this).hide(300);
	$('#Feedback').slideDown(300);
	$('body').animate({
		scrollTop: $('#Feedback').offset().top - 128
	}, 300);
});

function formValidation_Feedback() {
	var validation = true;
	if (!$('[name="entry.1404204003"]').val() || !$('[name="entry.2002821061"]').val()) {
		validation = false;
	}
	if (validation) {
		$('#EM').hide();
		$('#Feedback form').slideUp(300);
		$('#TP').slideDown(300);
		$('body').animate({
			scrollTop: $('#Feedback').offset().top - 128
		}, 300);
	} else {
		$('#EM').show();
	}
	return validation;
}
