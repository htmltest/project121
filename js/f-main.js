$(document).ready(function() {

    $.validator.addMethod('phoneRU',
        function(phone_number, element) {
            return this.optional(element) || phone_number.match(/^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/);
        },
        'Ошибка заполнения'
    );

    $.validator.addMethod('onlyRUS',
        function(value, element) {
            var pattern = /^[а-яё][а-яё\ \-’]+$/i;
            return this.optional(element) || pattern.test(value);
        },
        'Ошибка заполнения'
    );

    $.validator.addMethod('onlyEN',
        function(value, element) {
            var pattern = /^[a-z][a-z\ \-’]+$/i;
            return this.optional(element) || pattern.test(value);
        },
        'Ошибка заполнения'
    );

    $.validator.addMethod('inputDate',
        function(curDate, element) {
            if (this.optional(element) && curDate == '') {
                return true;
            } else {
                if (curDate.match(/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/)) {
                    var userDate = new Date(curDate.substr(6, 4), Number(curDate.substr(3, 2)) - 1, Number(curDate.substr(0, 2)));
                    if ($(element).attr('min')) {
                        var minDateStr = $(element).attr('min');
                        var minDate = new Date(minDateStr.substr(6, 4), Number(minDateStr.substr(3, 2)) - 1, Number(minDateStr.substr(0, 2)));
                        if (userDate < minDate) {
                            return false;
                        }
                    }
                    if ($(element).attr('max')) {
                        var maxDateStr = $(element).attr('max');
                        var maxDate = new Date(maxDateStr.substr(6, 4), Number(maxDateStr.substr(3, 2)) - 1, Number(maxDateStr.substr(0, 2)));
                        if (userDate > maxDate) {
                            return false;
                        }
                    }
                    return true;
                } else {
                    return false;
                }
            }
        },
        'Дата введена некорректно'
    );

    $('body').on('change', '.form-file input', function() {
        var curInput = $(this);
        var curField = curInput.parents().filter('.form-file');
        var curForm = curField.parents().filter('form');
        curField.find('.form-file-name-text').html(curInput.val().replace(/.*(\/|\\)/, ''));
        curForm.find('.form-files').append(curForm.data('filesCode'));
        curField.find('label.error').remove();
        curField.removeClass('error');
    });

    $('body').on('click', '.form-file-name-remove', function() {
        var curField = $(this).parents().filter('.form-file');
        curField.remove();
    });

    $('body').on('click', '.form-input-clear', function(e) {
        var curField = $(this).parents().filter('.form-input');
        curField.find('input').val('').trigger('blur').trigger('change');
        e.preventDefault();
    });

    $('form').each(function() {
        initForm($(this));
    });

    $('body').on('copy paste cut', '#emailCopy', function() {
        return false;
    });

    $('body').on('click', '.btn-form-send', function(e) {
        $(this).parents().filter('form').validate().destroy();
        $(this).parents().filter('form').append('<input type="hidden" name="' + $(this).data('name') + '" value="1" />');
        $(this).parents().filter('form').trigger('submit');
        e.preventDefault();
    });

    $('body').on('click', '.-selected-', function(e) {
        if (!($(this).hasClass('-range-from-')) && !($(this).hasClass('-range-to-'))) {
            $('.form-input-date input').each(function() {
                var curDatepicker = $(this).data('datepicker');
                if (curDatepicker) {
                    curDatepicker.hide();
                }
            });
        }
    });

});

$(window).on('resize', function() {
    $('.form-select select').chosen('destroy');
    $('.form-select select').chosen({disable_search: true, placeholder_text_multiple: ' ', no_results_text: 'Нет результатов'});
    $('.form-select select').each(function() {
        var curSelect = $(this);
        if (curSelect.data('placeholder') != '') {
            curSelect.parent().find('.chosen-single').prepend('<strong>' + curSelect.data('placeholder') + '</strong>');
        }
    });
});

$.fn.datepicker.language['ru'] =  {
    days: ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
    daysShort: ['Вос','Пон','Вто','Сре','Чет','Пят','Суб'],
    daysMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
    months: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    monthsShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
    today: 'Сегодня',
    clear: 'Очистить',
    dateFormat: 'dd.mm.yyyy',
    timeFormat: 'hh:ii',
    firstDay: 1
};

function initForm(curForm) {
    curForm.find('input.phoneRU').mask('+7 (000) 000-00-00');
    curForm.find('.form-input-date input').mask('00.00.0000');
    curForm.find('.form-input-date input').attr('autocomplete', 'off');
    curForm.find('.form-input-date-range input').attr('autocomplete', 'off');
    curForm.find('input.digit3').mask('000');
    curForm.find('input.digit4').mask('0000');
    curForm.find('input.digit6').mask('000000');
    curForm.find('input.digit10').mask('0000000000');
    curForm.find('input.digit12').mask('000000000000');
    curForm.find('input.digit13').mask('0000000000000');
    curForm.find('input.digit15').mask('000000000000000');

    curForm.find('.form-input input, .form-input textarea').each(function() {
        if ($(this).val() != '') {
            $(this).parent().addClass('focus');
        }
    });

    curForm.find('.form-input input, .form-input textarea').focus(function() {
        $(this).parent().addClass('focus');
    });

    curForm.find('.form-input input, .form-input textarea').blur(function() {
        if ($(this).val() == '') {
            $(this).parent().removeClass('focus');
        }
    });

    curForm.find('.form-select select').chosen({disable_search: true, no_results_text: 'Нет результатов'});
    curForm.find('.form-select select').each(function() {
        var curSelect = $(this);
        if (curSelect.data('placeholder') != '') {
            curSelect.parent().find('.chosen-single').prepend('<strong>' + curSelect.data('placeholder') + '</strong>');
        }
    });

    curForm.find('input[type="number"]').each(function() {
        var curBlock = $(this).parent();
        curBlock.addClass('form-input-number');
        var curHTML = curBlock.html();
        curBlock.html(curHTML.replace(/type=\"number\"/g, 'type="text"'));
        curBlock.find('input').spinner();
        curBlock.find('input').keypress(function(evt) {
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode > 31 && (charCode < 43 || charCode > 57)) {
                return false;
            }
            return true;
        });
    });

    curForm.find('.form-input-date input').on('change', function() {
        var curValue = $(this).val();
        if (curValue.match(/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/)) {
            var myDatepicker = $(this).data('datepicker');
            if (myDatepicker) {
                var curValueArray = curValue.split('.');
                myDatepicker.selectDate(new Date(Number(curValueArray[2]), Number(curValueArray[1]) - 1, Number(curValueArray[0])));
            }
        } else {
            var myDatepicker = $(this).data('datepicker');
            if (myDatepicker) {
                myDatepicker.clear();
            }
        }
    });

    curForm.find('.form-input-date input').on('keyup', function() {
        var curValue = $(this).val();
        if (curValue.match(/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/)) {
            var myDatepicker = $(this).data('datepicker');
            if (myDatepicker) {
                var curValueArray = curValue.split('.');
                myDatepicker.selectDate(new Date(Number(curValueArray[2]), Number(curValueArray[1]) - 1, Number(curValueArray[0])));
                myDatepicker.show();
                $(this).focus();
            }
        }
    });

    curForm.find('.form-input-date input').each(function() {
        var minDateText = $(this).attr('min');
        var minDate = null;
        if (typeof (minDateText) != 'undefined') {
            var minDateArray = minDateText.split('.');
            minDate = new Date(Number(minDateArray[2]), Number(minDateArray[1]) - 1, Number(minDateArray[0]));
        }
        var maxDateText = $(this).attr('max');
        var maxDate = null;
        if (typeof (maxDateText) != 'undefined') {
            var maxDateArray = maxDateText.split('.');
            maxDate = new Date(Number(maxDateArray[2]), Number(maxDateArray[1]) - 1, Number(maxDateArray[0]));
        }
        if ($(this).hasClass('maxDate1Year')) {
            var curDate = new Date();
            curDate.setFullYear(curDate.getFullYear() + 1);
            maxDate = curDate;
            var maxDay = curDate.getDate();
            if (maxDay < 10) {
                maxDay = '0' + maxDay
            }
            var maxMonth = curDate.getMonth() + 1;
            if (maxMonth < 10) {
                maxMonth = '0' + maxMonth
            }
            $(this).attr('max', maxDay + '.' + maxMonth + '.' + curDate.getFullYear());
        }
        var startDate = new Date();
        if (typeof ($(this).attr('value')) != 'undefined') {
            var curValue = $(this).val();
            if (curValue != '') {
                var startDateArray = curValue.split('.');
                startDate = new Date(Number(startDateArray[2]), Number(startDateArray[1]) - 1 , Number(startDateArray[0]));
            }
        }
        $(this).datepicker({
            language: 'ru',
            minDate: minDate,
            maxDate: maxDate,
            startDate: startDate,
            autoClose: true,
            toggleSelected: false
        });
        if (typeof ($(this).attr('value')) != 'undefined') {
            var curValue = $(this).val();
            if (curValue != '') {
                var startDateArray = curValue.split('.');
                startDate = new Date(Number(startDateArray[2]), Number(startDateArray[1]) - 1 , Number(startDateArray[0]));
                $(this).data('datepicker').selectDate(startDate);
            }
        }
    });

    curForm.find('.form-input-date-range input').each(function() {
        var minDateText = $(this).attr('min');
        var minDate = null;
        if (typeof (minDateText) != 'undefined') {
            var minDateArray = minDateText.split('.');
            minDate = new Date(Number(minDateArray[2]), Number(minDateArray[1]) - 1, Number(minDateArray[0]));
        }
        var maxDateText = $(this).attr('max');
        var maxDate = null;
        if (typeof (maxDateText) != 'undefined') {
            var maxDateArray = maxDateText.split('.');
            maxDate = new Date(Number(maxDateArray[2]), Number(maxDateArray[1]) - 1, Number(maxDateArray[0]));
        }
        $(this).datepicker({
            language: 'ru',
            range: true,
            multipleDatesSeparator: ' - ',
            minDate: minDate,
            maxDate: maxDate
        });
    });

    window.setInterval(function() {
        $('.form-input-date input, .form-input-date-range input').each(function() {
            if ($(this).val() != '') {
                $(this).parent().addClass('focus');
            }
        });
    }, 100);

    curForm.find('.form-slider').each(function() {
        var curSlider = $(this);
        var curRange = curSlider.find('.form-slider-range-inner')[0];
        noUiSlider.create(curRange, {
            start: [Number(curSlider.find('.form-slider-from').val()), Number(curSlider.find('.form-slider-to').val())],
            connect: true,
            range: {
                'min': Number(curSlider.find('.form-slider-range-from').html()),
                'max': Number(curSlider.find('.form-slider-range-to').html())
            },
            format: wNumb({
                decimals: 0
            })
        });
        curRange.noUiSlider.on('update', function(values, handle) {
            if (handle == 0) {
                curSlider.find('.form-slider-from').val(values[handle]);
                curSlider.find('.form-slider-hint-from').html(values[handle]);
            } else {
                curSlider.find('.form-slider-to').val(values[handle]);
                curSlider.find('.form-slider-hint-to').html(values[handle]);
            }
        });
    });

    if (curForm.find('.form-files').length > 0) {
        curForm.data('filesCode', curForm.find('.form-files').html());
    }

    curForm.find('.onlyRUS').each(function() {
        $(this).keypress(function(evt) {
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 1039 && charCode < 1104) || charCode == 1105 || charCode == 1025 || charCode == 45 || charCode == 32) {
                return true;
            }
            return false;
        });
    });

    curForm.find('.onlyEN').each(function() {
        $(this).keypress(function(evt) {
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 96 && charCode < 123) || (charCode > 64 && charCode < 91) || charCode == 45 || charCode == 32) {
                return true;
            }
            return false;
        });
    });

    curForm.find('[data-analitycs]').each(function() {
        if (typeof gtag === 'function') {
            var productID = curForm.attr('data-product');
            var stageID = curForm.attr('data-stage');
            if (typeof (productID) != 'undefined' && typeof (stageID) != 'undefined') {
                var data = {
                    'url': document.location.href,
                    'id': productID,
                    'name': $(this).val(),
                    'content_type' : $(this).attr('data-analitycs'),
                    'type_select' : 'auto'
                };
                gtag('event', 'generate_lead', data);
            }
        }
    });

    curForm.find('[data-analitycs]').change(function() {
        if (typeof gtag === 'function') {
            var productID = curForm.attr('data-product');
            var stageID = curForm.attr('data-stage');
            if (typeof (productID) != 'undefined' && typeof (stageID) != 'undefined') {
                var data = {
                    'url': document.location.href,
                    'id': productID,
                    'name': $(this).val(),
                    'content_type' : $(this).attr('data-analitycs'),
                    'type_select' : 'manual'
                };
                gtag('event', 'generate_lead', data);
            }
        }
    });

    curForm.validate({
        ignore: '',
        invalidHandler: function(event, validator) {
            validator.showErrors();
            if (typeof gtag === 'function') {
                var curForm = $(validator.currentForm);
                var productID = curForm.attr('data-product');
                var stageID = curForm.attr('data-stage');
                if (typeof (productID) != 'undefined' && typeof (stageID) != 'undefined') {
                    var invalidElements = validator.invalidElements();
                    for (var i = 0; i < invalidElements.length; i++) {
                        var curElement = $(invalidElements[i]);
                        var curAnalitycs = curElement.attr('data-analitycs');
                        if (typeof (curAnalitycs) != 'undefined') {
                            var curError = curElement.parent().find('label.error').text();
                            var data = {
                                'description': curError,
                                'fatal': true,
                                'product_id': productID,
                                'stage_id': stageID,
                                'field_id': curAnalitycs
                            };
                            gtag('event', 'exception', data);
                        }
                    }
                }
            }
        },
        submitHandler: function(form) {
            if ($(form).hasClass('ajax-form')) {
                windowOpen($(form).attr('action'), false, new FormData(form));
            } else {
                form.submit();
            }
        }
    });
}