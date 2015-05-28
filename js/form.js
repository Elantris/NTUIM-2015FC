var like = '';

$('#Staff span.like').html('<i class="fa fa-heart-o"></i><i class="fa fa-heart hidden"></i>').click(function() {
	$(this).find('i').toggle();
	like += $(this).attr('data-value');
});

$('[name="entry.birthYear"], [name="entry.birthMonth"]').change(function() {
	var MD = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		tmp = MD[$('[name="entry.birthMonth"]').val() - 1];
	if ($('[name="entry.birthYear"]').val() == 85 && $('[name="entry.birthMonth"]').val() == 2) {
		tmp = 29;
	}
	if ($('[name="entry.birthDay"]').val() > tmp) {
		$('[name="entry.birthDay"]').val(tmp);
	}
	for (var i = 29; i <= 31; i++) {
		if (i <= tmp) {
			$('[name="entry.birthDay"] option[value="' + i + '"]').removeAttr('disabled');
		} else {
			$('[name="entry.birthDay"] option[value="' + i + '"]').attr('disabled', true);
		}
	}
});

$('#UA').val(navigator.userAgent);

$('#form-check').click(function() {
	$(this).removeClass('fa-square-o').addClass('fa-check-square-o');
	$('#form-submit').removeAttr('disabled');
});

$('#form-extra').click(function() {
	$(this).hide(500);
	$('#Extra-infor').slideDown(500);
});

function formValidation() {
	var validation = true;
	$('#test1, #test2, #ErrorMessage').html('');

	// Name
	if (!$('[name="entry.name"]').val()) {
		$('#ErrorMessage').append('<li>姓名 必須填寫</li>');
		validation = false;
	}
	// ID Number
	var tmp = /^[A-Z]{1}[1-2]{1}[0-9]{8}$/.test($('[name="entry.IDnumber"]').val());
	if (tmp) {
		var L1 = 'ABCDEFGHJKLMNPQRSTUVWXYZIO',
			x = 0;
		for (var i = 0; i < L1.length; i++) {
			if ($('[name="entry.IDnumber"]').val()[0] == L1[i]) {
				i += 10;
				x += (i - (i % 10)) / 10;
				x += (i % 10) * 9;
				break;
			}
		}
		for (var i = 0; i < 8; i++) {
			x += $('[name="entry.IDnumber"]').val()[i + 1] * (8 - i);
		}
		if ((x + $('[name="entry.IDnumber"]').val()[9] * 1) % 10 != 0) {
			$('#ErrorMessage').append('<li>身份證字號 填寫錯誤</li>');
			validation = false;
		}
	} else {
		$('#ErrorMessage').append('<li>身分證字號 格式錯誤（英文 + 9 個數字）</li>');
		validation = false;
	}
	// Net ID
	if (!$('[name="entry.IDname"]').val()) {
		$('#ErrorMessage').append('<li>常用 ID 必須填寫</li>');
		validation = false;
	}
	// Phone
	tmp = /^[0-9]{10}$/.test($('[name="entry.phone"]').val());
	if (!tmp) {
		$('#ErrorMessage').append('<li>聯絡電話 格式錯誤 （10 個數字）</li>');
		validation = false;
	}
	// Email
	tmp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test($('[name="entry.email"]').val());
	if (!tmp) {
		$('#ErrorMessage').append('<li>電子信箱 格式錯誤</li>');
		validation = false;
	}
	// Account
	tmp = /^[0-9]{5}$/.test($('[name="entry.account"]').val());
	if(!tmp) {
		$('#ErrorMessage').append('<li>帳戶末五碼 格式錯誤</li>');
		validation = false;
	}
	// Eat
	if (!$('[name="entry.eat"]').val()) {
		$('#ErrorMessage').append('<li>飲食習慣 必須填寫</li>');
		validation = false;
	}

	$('#LIKE').val(like);

	// debug
	$('#test1').append('<b>* TEXT</b><br>');
	$('#Basic-infor [type="text"]').each(function() {
		if ($(this).val()) {
			$('#test1').append($(this).attr('name') + ' = ' + $(this).val() + '<br>');
		}
	});
	$('#test1').append('<b>* SELECT</b><br>');
	$('#Basic-infor select').each(function() {
		$('#test1').append($(this).attr('name') + ' = ' + $(this).val() + '<br>');
	});
	$('#test1').append('<b>* RADIO</b><br>');
	$('#Basic-infor [type="radio"]:checked').each(function() {
		$('#test1').append($(this).attr('name') + ' = ' + $(this).val() + '<br>');
	});
	$('#test1').append('<b>* TEXTAREA</b><br>');
	$('#Basic-infor textarea').each(function() {
		if ($(this).val()) {
			$('#test1').append($(this).attr('name') + ' = ' + $(this).val() + '<br>');
		}
	});

	$('#test2').append('<b>* TEXT</b><br>');
	$('#Extra-infor [type="text"]').each(function() {
		if ($(this).val()) {
			$('#test2').append($(this).attr('name') + ' = ' + $(this).val() + '<br>');
		}
	});
	$('#test2').append('<b>* SELECT</b><br>');
	$('#Extra-infor select').each(function() {
		$('#test2').append($(this).attr('name') + ' = ' + $(this).val() + '<br>');
	});
	$('#test2').append('<b>* RADIO</b><br>');
	$('#Extra-infor [type="radio"]:checked').each(function() {
		$('#test2').append($(this).attr('name') + ' = ' + $(this).val() + '<br>');
	});
	$('#test2').append('<b>* TEXTAREA</b><br>');
	$('#Extra-infor textarea').each(function() {
		if ($(this).val()) {
			$('#test2').append($(this).attr('name') + ' = ' + $(this).val() + '<br>');
		}
	});

	if (validation) {
		$('#ErrorMessage').hide();
		$('#Sign form').slideUp(300);
		$('#ThanksPage').slideDown(300);
		$('#Staff span.like').hide();
	} else {
		$('#ErrorMessage').show();
	}
	return false;
}

function formValidation_Feedback() {
	var validation = true;
	if ($('[name="entry.1404204003"]').val() == '' || $('[name="entry.1404204003"]').val() == null) {
		validation = false;
	}
	if ($('[name="entry.2002821061"]').val() == '' || $('[name="entry.2002821061"]').val() == null) {
		validation = false;
	}
	$('#LIKE').val(like);
	if (validation) {
		$('#EM').hide();
		$('#Feedback form').slideUp(300);
		$('#TP').slideDown(300);
		$('#Staff span.like').hide();
	} else {
		$('#EM').show();
	}
	return validation;
}
