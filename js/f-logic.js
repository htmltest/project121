$(document).ready(function() {

    $.validator.addMethod('passportDate',
        function(passportDate, element) {
            var curForm = $(element).parents().filter('form');
            var birthdayDate = curForm.find('.birthdayDate').val();
            return checkPassportDate(passportDate, birthdayDate);
        },
        'Срок действия документа истек'
    );

    $.validator.addMethod('passportOrBirthDate',
        function(passportDate, element) {
            var curForm = $(element).parents().filter('form');
            var birthdayDate = $(element).data('birthday');
            return checkPassportDate(passportDate, birthdayDate);
        },
        'Срок действия документа истек'
    );

    $.validator.addMethod('birthdayDate',
        function(birthdayDate, element) {
            var curForm = $(element).parents().filter('form');
            curForm.find('.passportDate').valid();
            return true;
        },
        ''
    );

    $.validator.addMethod('passportSeries',
        function(curSeries, element) {
            return this.optional(element) || curSeries.match(/^[0-9]{4}$/);
        },
        'Серия введена некорректно'
    );

    $.validator.addMethod('birthsertSeries',
        function(curSeries, element) {
            return this.optional(element) || curSeries.match(/^[IVXLCivxlc]+-[А-Яа-я]{2}$/);
        },
        'Серия введена некорректно'
    );

    $.validator.addMethod('promoMask',
        function(curSeries, element) {
            return this.optional(element) || curSeries.match(/^[А-Яа-яA-Za-z0-9]{2,24}$/);
        },
        'Неверный формат промокода'
    );

    $('#phone').on('keyup', function(e) {
        var curInput = $(this);
        var curValue = curInput.val();
        if (curValue.match(/^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/)) {
            curInput.parent().addClass('loading');
            $.ajax({
                type: 'POST',
                url: 'ajax/order-phone.json',
                dataType: 'json',
                data: JSON.stringify({'phone': curValue}),
                cache: false
            }).done(function(data) {
                curInput.parent().removeClass('loading');
                if (data.status == 'ok') {
                    $('#phone-hint').show();
                } else {
                    $('#phone-hint').hide();
                }
            });
        } else {
            $('#phone-hint').hide();
        }
    });

    $('.order-address-checkbox input').change(function() {
        if ($(this).prop('checked')) {
            $('.order-address-jur').hide();
            $('.order-address-jur input').removeClass('required');
        } else {
            $('.order-address-jur').show();
            $('.order-address-jur input').addClass('required');
        }
    });

    $('.order-address-checkbox input').each(function() {
        if ($(this).prop('checked')) {
            $('.order-address-jur').hide();
            $('.order-address-jur input').removeClass('required');
        } else {
            $('.order-address-jur').show();
            $('.order-address-jur input').addClass('required');
        }
    });

    $('.order-middlename-checkbox input').change(function() {
        if ($(this).prop('checked')) {
            $('.form-field-middlename input').removeClass('required');
            $('.form-field-middlename em').hide();
        } else {
            $('.form-field-middlename input').addClass('required');
            $('.form-field-middlename em').show();
        }
    });

    $('.order-middlename-checkbox input').each(function() {
        if ($(this).prop('checked')) {
            $('.form-field-middlename input').removeClass('required');
            $('.form-field-middlename em').hide();
        } else {
            $('.form-field-middlename input').addClass('required');
            $('.form-field-middlename em').show();
        }
    });

    $('#order-confirm').change(function() {
        if ($(this).prop('checked')) {
            $(this).prop('disabled', true);
            var curCheckbox = $(this).parents().filter('.form-checkbox');
            var curForm = $(this).parents().filter('form');
            curForm.find('.order-confirm-form-back').hide();
            curCheckbox.addClass('loading');
            $.ajax({
                type: 'POST',
                url: 'ajax/order-confirm.json',
                data: {'phone': $('#confirmPhone').val(), 'url': $('#confirmURL').val()},
                dataType: 'json',
                cache: false,
                timeout: 5000
            }).fail(function(jqXHR, textStatus, errorThrown) {
                curCheckbox.removeClass('loading');
                curForm.find('.form-error').remove();
                curForm.append('<div class="form-error"><div class="form-error-title">Произошла ошибка</div><div class="form-error-text">' + errorThrown + '</div></div>');
            }).done(function(data) {
                curCheckbox.removeClass('loading');
                if (data.status == 'ok') {
                    curForm.find('.form-error').remove();
                    $('.order-confirm-form').addClass('open');
                } else {
                    curForm.find('.form-error').remove();
                    curForm.append('<div class="form-error"><div class="form-error-title">Произошла ошибка</div><div class="form-error-text">' + data.errorMessage + '</div></div>');
                }
            });
        } else {
            $('.order-confirm-form').removeClass('open');
        }
    });

    $('.order-confirm-sms-new a').click(function(e) {
        var curCheckbox = $(this).parents().filter('.form-checkbox');
        var curForm = $(this).parents().filter('form');
        $('.order-confirm-sms-new a').addClass('loading');
        $.ajax({
            type: 'POST',
            url: 'ajax/order-confirm.json',
            data: {'phone': $('#confirmPhone').val(), 'url': $('#confirmURL').val()},
            dataType: 'json',
            cache: false,
            timeout: 5000
        }).fail(function(jqXHR, textStatus, errorThrown) {
            $('.order-confirm-sms-new a').removeClass('loading');
            curForm.find('.form-error').remove();
            curForm.append('<div class="form-error"><div class="form-error-title">Произошла ошибка</div><div class="form-error-text">' + errorThrown + '</div></div>');
        }).done(function(data) {
            $('.order-confirm-sms-new a').removeClass('loading');
            if (data.status == 'ok') {
                curForm.find('.form-error').remove();
            } else {
                curForm.find('.form-error').remove();
                curForm.append('<div class="form-error"><div class="form-error-title">Произошла ошибка</div><div class="form-error-text">' + data.errorMessage + '</div></div>');
            }
        });
        e.preventDefault();
    });

    $('#order-confirm').each(function() {
        $(this).prop('checked', false);
    });

    $('#order-confirm-data').change(function() {
        if (!($('#order-confirm-info').prop('checked') && $('#order-confirm-data').prop('checked'))) {
            $('.order-confirm-sms-row .form-input input').prop('disabled', true);
            $('.order-confirm-sms-row .form-input').addClass('form-input-disabled');
            $('.order-confirm-form').addClass('close');
        } else {
            $('.order-confirm-form').removeClass('close');
            $('.order-confirm-sms-row .form-input input').prop('disabled', false);
            $('.order-confirm-sms-row .form-input').removeClass('form-input-disabled');
        }
    });

    $('#order-confirm-data').each(function() {
        if (!($('#order-confirm-info').prop('checked') && $('#order-confirm-data').prop('checked'))) {
            $('.order-confirm-sms-row .form-input input').prop('disabled', true);
            $('.order-confirm-sms-row .form-input').addClass('form-input-disabled');
            $('.order-confirm-form').addClass('close');
        } else {
            $('.order-confirm-form').removeClass('close');
            $('.order-confirm-sms-row .form-input input').prop('disabled', false);
            $('.order-confirm-sms-row .form-input').removeClass('form-input-disabled');
        }
    });

    $('#order-confirm-info').change(function() {
        if (!($('#order-confirm-info').prop('checked') && $('#order-confirm-data').prop('checked'))) {
            $('.order-confirm-sms-row .form-input input').prop('disabled', true);
            $('.order-confirm-sms-row .form-input').addClass('form-input-disabled');
            $('.order-confirm-form').addClass('close');
        } else {
            $('.order-confirm-form').removeClass('close');
            $('.order-confirm-sms-row .form-input input').prop('disabled', false);
            $('.order-confirm-sms-row .form-input').removeClass('form-input-disabled');
        }
    });

    $('#order-confirm-info').each(function() {
        if (!($('#order-confirm-info').prop('checked') && $('#order-confirm-data').prop('checked'))) {
            $('.order-confirm-sms-row .form-input input').prop('disabled', true);
            $('.order-confirm-sms-row .form-input').addClass('form-input-disabled');
            $('.order-confirm-form').addClass('close');
        } else {
            $('.order-confirm-form').removeClass('close');
            $('.order-confirm-sms-row .form-input input').prop('disabled', false);
            $('.order-confirm-sms-row .form-input').removeClass('form-input-disabled');
        }
    });

    var confirmForm = $('.order-confirm-form');
    if (confirmForm.length > 0) {
        var validator = confirmForm.validate();
        validator.destroy();
        confirmForm.validate({
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
                confirmForm.addClass('loading');
                confirmForm.find('input[type="submit"]').prop('disabled', true);
                confirmForm.find('input[type="text"]').prop('disabled', true);
                confirmForm.find('input[type="text"]').parent().addClass('form-input-disabled');
                $(form).find('.form-error').remove();
                $.ajax({
                    type: 'POST',
                    url: $(form).attr('action'),
                    dataType: 'json',
                    data: JSON.stringify({'sms': $(form).find('input[type="text"]').val()}),
                    cache: false,
                    timeout: 5000
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    confirmForm.removeClass('loading');
                    confirmForm.find('input[type="submit"]').prop('disabled', false);
                    confirmForm.find('input[type="text"]').prop('disabled', false);
                    confirmForm.find('input[type="text"]').parent().removeClass('form-input-disabled');
                    $(form).append('<div class="form-error"><div class="form-error-title">Произошла ошибка</div><div class="form-error-text">' + errorThrown + '</div></div>');
                }).done(function(data) {
                    confirmForm.removeClass('loading');
                    confirmForm.find('input[type="submit"]').prop('disabled', false);
                    confirmForm.find('input[type="text"]').prop('disabled', false);
                    confirmForm.find('input[type="text"]').parent().removeClass('form-input-disabled');
                    if (data.status == 'ok') {
                        $('.order-confirm-form').addClass('sms-success');
                    } else {
                        $(form).append('<div class="form-error"><div class="form-error-title">Произошла ошибка</div><div class="form-error-text">' + data.errorMessage + '</div></div>');
                    }
                });
            }
        });
    }

    $('body').on('change', '.order-field-type input', function() {
        var curIndex = $('.order-field-type input').index('.order-field-type input:checked');
        $('.order-types-tab.active input.required').removeClass('required').addClass('required_');
        $('.order-types-tab.active').removeClass('active');
        $('.order-types-tab').eq(curIndex).addClass('active');
        $('.order-types-tab').eq(curIndex).find('input.required_').addClass('required').removeClass('required_');
    });

    $('.order-field-type input:checked', function() {
        var curIndex = $('.order-field-type input').index('.order-field-type input:checked');
        $('.order-types-tab.active input.required').removeClass('required').addClass('required_');
        $('.order-types-tab.active').removeClass('active');
        $('.order-types-tab').eq(curIndex).addClass('active');
        $('.order-types-tab').eq(curIndex).find('input.required_').addClass('required').removeClass('required_');
    });

    $('body').on('change', '.order-field-doc input', function() {
        var curIndex = $('.order-field-doc input').index('.order-field-doc input:checked');
        if (curIndex == 0) {
            $('#passportORbirthsert').val('');
            $('#passportORbirthsert').mask('0000');
            $('#passportORbirthsert').removeClass('birthsertSeries').addClass('passportSeries');
        } else {
            var options =  {
                translation: {
                    'X': {
                        pattern: /[IVXLCivxlc]/
                    },
                    'W': {
                        pattern: /[IVXLCivxlc]/, optional: true
                    },
                    'Z': {
                        pattern: /[А-Яа-я]/
                    }
                }
            }
            $('#passportORbirthsert').val('');
            $('#passportORbirthsert').mask('XWW-ZZ', options);
            $('#passportORbirthsert').addClass('birthsertSeries').removeClass('passportSeries');
        }
    });

    $('.order-field-doc').each(function() {
        if (typeof ($(this).data('birthday')) != 'undefined') {
            var bitrhDate = new Date($(this).data('birthday').replace(/(\d{2}).(\d{2}).(\d{4})/, '$3-$2-$1'));

            var bDate15 = new Date(bitrhDate);
            bDate15.setFullYear(bDate15.getFullYear() + 15);

            var curDate = new Date();
            if (curDate >= bDate15) {
                $('.order-field-doc input').eq(0).prop('checked', true);
                $('.order-field-doc input').eq(1).parent().parent().hide();
            } else {
                $('.order-field-doc input').eq(1).parent().parent().show();
            }
        }
    });

    $('.order-field-doc input:checked', function() {
        var curIndex = $('.order-field-doc input').index('.order-field-doc input:checked');
        if (curIndex == 0) {
            $('#passportORbirthsert').mask('0000');
            $('#passportORbirthsert').removeClass('birthsertSeries').addClass('passportSeries');
        } else {
            var options =  {
                translation: {
                    'X': {
                        pattern: /[IVXLCivxlc0-9]/
                    },
                    'W': {
                        pattern: /[IVXLCivxlc]/, optional: true
                    },
                    'Z': {
                        pattern: /[А-Яа-я]/
                    }
                }
            }
            $('#passportORbirthsert').mask('XWW-ZZ', options);
            $('#passportORbirthsert').addClass('birthsertSeries').removeClass('passportSeries');
        }
    });

    $('body').on('click', '.main-events-form-results-info-type-header-value span', function() {
        $('.main-events-form-results-info-type').toggleClass('open');
        $('.main-events-form-results-info-type-content').slideToggle();
    });

    var options =  {
        translation: {
            'X': {
                pattern: /[IVXLCivxlc0-9]/
            },
            'W': {
                pattern: /[IVXLCivxlc]/, optional: true
            },
            'Z': {
                pattern: /[А-Яа-я]/
            }
        }
    }
    $('input.birthsertSeries').mask('XWW-ZZ', options);

    var optionsPromo =  {
        translation: {
            'X': {
                pattern: /[А-Яа-яA-Za-z0-9]/
            },
            'W': {
                pattern: /[А-Яа-яA-Za-z0-9]/, optional: true
            }
        }
    }
    $('input.promoMask').mask('XXWWWWWWWWWWWWWWWWWWWWWW', optionsPromo);

    $('body').on('change', '#order-programm-select', function() {
        var curValue = $(this).val();
        $('.order-programm-detail').hide();
        var curProgramm = $('.order-programm-detail[data-id="' + curValue + '"]');
        curProgramm.show();
    });

    $('#order-programm-select').each(function() {
        var curValue = $(this).val();
        $('.order-programm-detail').hide();
        var curProgramm = $('.order-programm-detail[data-id="' + curValue + '"]');
        curProgramm.show();
    });

    if ($('#order-date-start').length == 1) {
        $('#order-date-start').change(function() {
            var curDateText = $(this).val();
            if (curDateText.match(/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/)) {
                var curDateArray = curDateText.split('.');
                var curDate = new Date(Number(curDateArray[2]), Number(curDateArray[1]) - 1, Number(curDateArray[0]));
                $('#order-date-start').data('datepicker').selectDate(curDate);
                var newDate = new Date(curDate.getTime());
                newDate.setFullYear(newDate.getFullYear() + 1);
                newDate.setDate(newDate.getDate() - 1);
                $('#order-date-end').data('datepicker').selectDate(newDate);
            }
        });
        $('#order-date-start').each(function() {
            var curDateText = $(this).val();
            if (curDateText != '') {
                var curDateArray = curDateText.split('.');
                var curDate = new Date(Number(curDateArray[2]), Number(curDateArray[1]) - 1, Number(curDateArray[0]));
                $('#order-date-start').data('datepicker').selectDate(curDate);
                var newDate = new Date(curDate.getTime());
                newDate.setFullYear(newDate.getFullYear() + 1);
                newDate.setDate(newDate.getDate() - 1);
                $('#order-date-end').data('datepicker').selectDate(newDate);
            } else {
                $('#order-date-end').val('');
                $('#order-date-start').data('datepicker').clear();
                $('#order-date-end').data('datepicker').clear();
            }
        });
    }

    $('body').on('change', '[data-calcField]', function() {
        updatePrecalc($(this).parents().filter('form'));
    });

    $('body').on('click', '.order-form-results-code-btn a', function(e) {
        $('#order-promo').trigger('change');
        e.preventDefault();
    });

    $('body').on('click', '.order-form-results-code .form-input-clear', function(e) {
        $('#order-promo').val('').trigger('change');
        e.preventDefault();
    });

    $("#address").each(function() {
        $("#address").attr('autocomplete', 'off');
        $("#address").suggestions({
            token: "b1ef55f1fac05ac03f0b616c47ace94e60ff6f0b",
            type: "ADDRESS",
            count: 5,
            onSelect: function(suggestion) {
                var curDataField = $(this).parent().find('.form-input-dadata');
                curDataField.html('');
                for(curItem in suggestion.data) {
                    if (suggestion.data[curItem] != null) {
                        curDataField.append('<input type="hidden" name="address[' + curItem + ']" value="' + suggestion.data[curItem] + '" />');
                    }
                }
            },
            onSelectNothing: function() {
                $(this).val('');
                var curDataField = $(this).parent().find('.form-input-dadata');
                curDataField.html('');
            }
        });
    });

    $("#address_jur").each(function() {
        $("#address_jur").attr('autocomplete', 'off');
        $("#address_jur").suggestions({
            token: "b1ef55f1fac05ac03f0b616c47ace94e60ff6f0b",
            type: "ADDRESS",
            count: 5,
            onSelect: function(suggestion) {
                var curDataField = $(this).parent().find('.form-input-dadata');
                curDataField.html('');
                if (suggestion.data.flat != null) {
                    $(this).removeClass('error');
                    $(this).parent().find('label.error').remove();
                    for(curItem in suggestion.data) {
                        if (suggestion.data[curItem] != null) {
                            curDataField.append('<input type="hidden" name="address_jur[' + curItem + ']" value="' + suggestion.data[curItem] + '" />');
                        }
                    }
                } else {
                    $(this).addClass('error');
                    $(this).parent().find('label.error').remove();
                    $(this).after('<label class="error">Необходимо ввести квартиру</label>');
                }
            },
            onSelectNothing: function() {
                $(this).val('');
                $(this).removeClass('error');
                $(this).parent().find('label.error').remove();
                var curDataField = $(this).parent().find('.form-input-dadata');
                curDataField.html('');
            }
        });
    });

    $('#vzr-confirm-data').change(function() {
        if ($(this).prop('checked')) {
            $(this).prop('disabled', true);
            var curCheckbox = $(this).parents().filter('.form-checkbox');
            var curForm = $(this).parents().filter('form');
            $('.order-confirm-form').addClass('open');
        } else {
            $('.order-confirm-form').removeClass('open');
        }
    });

    $('#vzr-confirm-data').each(function() {
        if ($(this).prop('checked')) {
            $(this).prop('disabled', true);
            var curCheckbox = $(this).parents().filter('.form-checkbox');
            var curForm = $(this).parents().filter('form');
            $('.order-confirm-form').addClass('open');
        } else {
            $('.order-confirm-form').removeClass('open');
        }
    });

    $('#vzr-confirm-info, #vzr-confirm').change(function() {
        if (!($('#vzr-confirm-info').prop('checked') && $('#vzr-confirm').prop('checked'))) {
            $('.order-confirm-sms-row .form-input input').prop('disabled', true);
            $('.order-confirm-sms-row .form-input').addClass('form-input-disabled');
            $('.order-confirm-form').addClass('close');
        } else {
            $('.order-confirm-form').removeClass('close');
            $('.order-confirm-sms-row .form-input input').prop('disabled', false);
            $('.order-confirm-sms-row .form-input').removeClass('form-input-disabled');
        }
    });

    $('#vzr-confirm-info, #vzr-confirm').each(function() {
        if (!($('#vzr-confirm-info').prop('checked') && $('#vzr-confirm').prop('checked'))) {
            $('.order-confirm-sms-row .form-input input').prop('disabled', true);
            $('.order-confirm-sms-row .form-input').addClass('form-input-disabled');
            $('.order-confirm-form').addClass('close');
        } else {
            $('.order-confirm-form').removeClass('close');
            $('.order-confirm-sms-row .form-input input').prop('disabled', false);
            $('.order-confirm-sms-row .form-input').removeClass('form-input-disabled');
        }
    });

    $('body').on('change', '#vzr-country-select', function() {
        var curOption = $(this).find('option:selected');
        if (curOption.length == 1) {
            if (typeof (curOption.attr('data-schengen')) != 'undefined') {
                $('.order-vzr-schengen').addClass('visible');
            } else {
                $('.order-vzr-schengen').removeClass('visible');
            }

            if (typeof (curOption.attr('data-docs')) != 'undefined') {
                $('.order-vzr-docs').addClass('visible');
                $('#vzr-date-docs').addClass('required');
            } else {
                $('.order-vzr-docs').removeClass('visible');
                $('#vzr-date-docs').removeClass('required');
            }
        }
    });

    $('#vzr-country-select').each(function() {
        var curOption = $(this).find('option:selected');
        if (curOption.length == 1) {
            if (typeof (curOption.attr('data-schengen')) != 'undefined') {
                $('.order-vzr-schengen').addClass('visible');
            } else {
                $('.order-vzr-schengen').removeClass('visible');
            }

            if (typeof (curOption.attr('data-docs')) != 'undefined') {
                $('.order-vzr-docs').addClass('visible');
                $('#vzr-date-docs').addClass('required');
            } else {
                $('.order-vzr-docs').removeClass('visible');
                $('#vzr-date-docs').removeClass('required');
            }
        }
        $('#vzr-country-select').chosen('destroy');
        $('#vzr-country-select').chosen({disable_search: false, placeholder_text_multiple: ' ', no_results_text: 'Нет результатов'});
        $('#vzr-country-select').each(function() {
            var curSelect = $(this);
            if (curSelect.data('placeholder') != '') {
                curSelect.parent().find('.chosen-single').prepend('<strong>' + curSelect.data('placeholder') + '</strong>');
            }
        });
        $(window).on('resize', function() {
            $('#vzr-country-select').chosen('destroy');
            $('#vzr-country-select').chosen({disable_search: false, placeholder_text_multiple: ' ', no_results_text: 'Нет результатов'});
            $('#vzr-country-select').each(function() {
                var curSelect = $(this);
                if (curSelect.data('placeholder') != '') {
                    curSelect.parent().find('.chosen-single').prepend('<strong>' + curSelect.data('placeholder') + '</strong>');
                }
            });
        });
    });

    if ($('#vzr-date-start').length == 1) {
        var today = new Date();
        var tommorow = new Date(today.getTime());
        tommorow.setDate(tommorow.getDate() + 1);
        var aftertommorow = new Date(tommorow.getTime());
        aftertommorow.setDate(tommorow.getDate() + 1);
        var selfyear = new Date(today.getTime());
        selfyear.setMonth(selfyear.getMonth() + 6);

        $('#vzr-date-start').data('datepicker').update({
            minDate: tommorow
        });

        $('#vzr-date-docs').data('datepicker').update({
            minDate: tommorow,
            maxDate: selfyear
        });

        $('#vzr-date-end').data('datepicker').update({
            minDate: aftertommorow
        });

        $('#vzr-date-start').change(function() {
            var curDate = $('#vzr-date-start').data('datepicker').selectedDates[0];
            if (curDate) {
                var newDate = new Date(curDate.getTime());
                newDate.setDate(newDate.getDate() + 1);
                $('#vzr-date-end').data('datepicker').update({
                    minDate: newDate
                });
                var endDateCurr = $('#vzr-date-end').data('datepicker').selectedDates[0];
                if (endDateCurr && endDateCurr < newDate) {
                    $('#vzr-date-end').data('datepicker').selectDate(newDate);
                }
            }
        });

        $('#vzr-date-start').each(function() {
            var curDate = $('#vzr-date-start').data('datepicker').selectedDates[0];
            if (curDate) {
                var newDate = new Date(curDate.getTime());
                newDate.setDate(newDate.getDate() + 1);
                $('#vzr-date-end').data('datepicker').update({
                    minDate: newDate
                });
                var endDateCurr = $('#vzr-date-end').data('datepicker').selectedDates[0];
                if (endDateCurr && endDateCurr < newDate) {
                    $('#vzr-date-end').data('datepicker').selectDate(newDate);
                }
            }
        });

        $('#vzr-date-start, #vzr-date-end').change(function() {
            var startDate = $('#vzr-date-start').data('datepicker').selectedDates[0];
            if (startDate) {
                if ($('#vzr-multiple').prop('checked')) {
                    var curDays = Number($('#vzr-days-select').val());
                    var newDate = new Date(startDate.getTime());
                    newDate.setDate(newDate.getDate() + curDays);
                    $('#vzr-date-end').data('datepicker').selectDate(newDate);
                }
            }
            var endDate = $('#vzr-date-end').data('datepicker').selectedDates[0];
            if (startDate && endDate) {
                var countDays = Math.ceil(Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
                $('.order-vzr-days-count-value').html(countDays);
            }
        });

        $('#vzr-date-start').each(function() {
            var startDate = $('#vzr-date-start').data('datepicker').selectedDates[0];
            var endDate = $('#vzr-date-end').data('datepicker').selectedDates[0];
            if (startDate && endDate) {
                var countDays = Math.ceil(Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
                $('.order-vzr-days-count-value').html(countDays);
            }
        });
    }

    $('body').on('change', '#vzr-days-select', function() {
        var curDays = Number($(this).val());
        var curDate = $('#vzr-date-start').data('datepicker').selectedDates[0];
        if (curDate) {
            var newDate = new Date(curDate.getTime());
            newDate.setDate(newDate.getDate() + curDays);
            $('#vzr-date-end').data('datepicker').selectDate(newDate);
        }
    });

    $('#vzr-days-select').each(function() {
        var curDays = Number($(this).val());
        var curDate = $('#vzr-date-start').data('datepicker').selectedDates[0];
        if (curDate) {
            var newDate = new Date(curDate.getTime());
            newDate.setDate(newDate.getDate() + curDays);
            $('#vzr-date-end').data('datepicker').selectDate(newDate);
        }
    });

    $('body').on('change', '#vzr-multiple', function() {
        if ($(this).prop('checked')) {
            $('.order-form-row-vzr-dates').addClass('multiple');
            $('#vzr-date-end').prop('disabled', true).parent().addClass('form-input-disabled');
            $('#vzr-date-start').trigger('change');
        } else {
            $('.order-form-row-vzr-dates').removeClass('multiple');
            $('#vzr-date-end').prop('disabled', false).parent().removeClass('form-input-disabled');
        }
    });

    $('#vzr-multiple').each(function() {
        if ($(this).prop('checked')) {
            $('.order-form-row-vzr-dates').addClass('multiple');
            $('#vzr-date-end').prop('disabled', true).parent().addClass('form-input-disabled');
        } else {
            $('.order-form-row-vzr-dates').removeClass('multiple');
            $('#vzr-date-end').prop('disabled', false).parent().removeClass('form-input-disabled');
        }
    });

    $('body').on('change', '#vzr-currency', function() {
        if ($(this).prop('checked')) {
            $('.vzr-programms').addClass('vzr-programms-currency-2');
        } else {
            $('.vzr-programms').removeClass('vzr-programms-currency-2');
        }
        $('.vzr-programms-item input').trigger('change');
    });

    $('#vzr-currency').each(function() {
        if ($(this).prop('checked')) {
            $('.vzr-programms').addClass('vzr-programms-currency-2');
        } else {
            $('.vzr-programms').removeClass('vzr-programms-currency-2');
        }
    });

    $('body').on('change', '#vzr-type-active', function() {
        if ($(this).prop('checked')) {
            $('#vzr-type-extreme').prop('checked', false);
            $('.vzr-add').removeClass('visible');
            $('.main-events-form-results-info-type').addClass('disabled');
            $('.main-events-form-results-info-type-header-value span').html($(this).parent().find('.vzr-type-title').html());
        } else {
            $('.main-events-form-results-info-type').addClass('disabled');
            $('.main-events-form-results-info-type-header-value span').html($('.vzr-type-static .vzr-type-title').html());
        }
    });

    $('#vzr-type-active').each(function() {
        if ($(this).prop('checked')) {
            $('.main-events-form-results-info-type').addClass('disabled');
            $('.main-events-form-results-info-type-header-value span').html($(this).parent().find('.vzr-type-title').html());
        }
    });

    $('body').on('change', '#vzr-type-extreme', function() {
        if ($(this).prop('checked')) {
            $('#vzr-type-active').prop('checked', false);
            $('.vzr-add').addClass('visible');
            $('.main-events-form-results-info-type').removeClass('disabled');
            $('.main-events-form-results-info-type-header-value span').html($(this).parent().find('.vzr-type-title').html());
        } else {
            $('.vzr-add').removeClass('visible');
            $('.main-events-form-results-info-type').addClass('disabled');
            $('.main-events-form-results-info-type-header-value span').html($('.vzr-type-static .vzr-type-title').html());
        }
    });

    $('#vzr-type-extreme').each(function() {
        if ($(this).prop('checked')) {
            $('.vzr-add').addClass('visible');
            $('.main-events-form-results-info-type').removeClass('disabled');
            $('.main-events-form-results-info-type-header-value span').html($(this).parent().find('.vzr-type-title').html());
        }
    });

    $('body').on('change', '.vzr-programms-item input', function() {
        var curItem = $('.vzr-programms-item input:checked').parents().filter('.vzr-programms-item');
        if ($('#vzr-currency').prop('checked')) {
            $('#vzr-results-programm').html(curItem.find('.vzr-programms-item-price-2').html());
        } else {
            $('#vzr-results-programm').html(curItem.find('.vzr-programms-item-price-1').html());
        }
    });

    $('.vzr-programms-item input').each(function() {
        var curItem = $('.vzr-programms-item input:checked').parents().filter('.vzr-programms-item');
        if ($('#vzr-currency').prop('checked')) {
            $('#vzr-results-programm').html(curItem.find('.vzr-programms-item-price-2').html());
        } else {
            $('#vzr-results-programm').html(curItem.find('.vzr-programms-item-price-1').html());
        }
    });

    $('body').on('change', '.vzr-add-list input', function() {
        var newHTML = '';
        $('.vzr-add-list input:checked').each(function() {
            newHTML += '<div class="main-events-form-results-info-type-item">' + $(this).parent().find('span').html() + '</div>';
        });
        $('.main-events-form-results-info-type-content-inner').html(newHTML);
    });

    $('.vzr-add-list').each(function() {
        var newHTML = '';
        $('.vzr-add-list input:checked').each(function() {
            newHTML += '<div class="main-events-form-results-info-type-item">' + $(this).parent().find('span').html() + '</div>';
        });
        $('.main-events-form-results-info-type-content-inner').html(newHTML);
    });

    $('body').on('change', '.vzr-more-item input', function() {
        var newHTML = '';
        $('.vzr-more-item input:checked').each(function() {
            newHTML += '<div class="main-events-form-results-info-add-row"><span class="main-events-form-results-info-add-label">' + $(this).parent().find('.vzr-more-checkbox-title').html() + '</span><span class="main-events-form-results-info-add-value">' + $(this).parent().find('.vzr-more-checkbox-price').html() + '</span></div>';
        });
        $('.main-events-form-results-info-add-row').remove();
        $('.main-events-form-results-info-add').append(newHTML);
    });

    $('.vzr-more-list').each(function() {
        var newHTML = '';
        $('.vzr-more-item input:checked').each(function() {
            newHTML += '<div class="main-events-form-results-info-add-row"><span class="main-events-form-results-info-add-label">' + $(this).parent().find('.vzr-more-checkbox-title').html() + '</span><span class="main-events-form-results-info-add-value">' + $(this).parent().find('.vzr-more-checkbox-price').html() + '</span></div>';
        });
        $('.main-events-form-results-info-add-row').remove();
        $('.main-events-form-results-info-add').append(newHTML);
    });

    $('.vzr-form-window-mobile').each(function() {
        window.setInterval(function() {
            $('.vzr-form-window-mobile-cost').html($('.main-events-form-results-value-price').html());
        }, 100);
    });

    $('body').on('click', '.vzr-form-window-mobile-detail a', function(e) {
        $('html, body').animate({'scrollTop': $('.main-events-form-results-info').parent().offset().top});
        e.preventDefault();
    });

});

function checkPassportDate(passportDate, dudeDate) {
    var dob = new Date(dudeDate.replace(/(\d{2}).(\d{2}).(\d{4})/, '$3-$2-$1'));
    var pssprtDate = new Date(passportDate.replace(/(\d{2}).(\d{2}).(\d{4})/, '$3-$2-$1'));

    var pDate20 = new Date(dob);
    pDate20.setFullYear(pDate20.getFullYear() + 20);
    var pDate45 = new Date(dob);
    pDate45.setFullYear(pDate45.getFullYear() + 45);

    var ageDude = parseInt(yearsDiff(new Date(dudeDate.replace(/(\d{2}).(\d{2}).(\d{4})/, '$3-$2-$1'))));

    if (ageDude >= 20 && ageDude < 45) {
        if (pssprtDate < pDate20) {
            return false;
        }
    }

    if (ageDude >= 45) {
        if (pssprtDate < pDate45) {
            return false;
        }
    }

    return true;
}

function yearsDiff(dt) {
    if (dt > new Date()) {
        return 0;
    }

    var crntDate = new Date();

    var yearDiff = parseInt(crntDate.getFullYear() - dt.getFullYear());

    var dat4check = new Date(dt);
    dat4check.setFullYear(crntDate.getFullYear());
    if (dat4check > crntDate) {
        yearDiff--;
    }

    if (yearDiff <= 0) {
        return 0;
    }

    if (yearDiff === 1) {
        var monthDiff = parseInt(crntDate.getMonth() - dt.getMonth());
        if (monthDiff >= 0) {
            if (monthDiff == 0) {
                var dayDiff = parseInt(crntDate.getDate() - dt.getDate());
                if (dayDiff > 0) {
                    return yearDiff;
                } else {
                    return 0;
                }
            } else {
                return crntDate.getFullYear() - dt.getFullYear();
            }
        } else {
            return 0;
        }
    } else {
        return yearDiff;
    }
}

function updatePrecalc(curForm) {
    $('#programCost').addClass('loading').html('');
    var curData = {};
    curForm.find('[data-calcField]').each(function() {
        var curField = $(this);
        curData[curField.attr('data-calcField')] = curField.val();
    });
    var curURL = curForm.attr('data-calcForm');
    var promo = $('#order-promo').val();
    if (typeof promo === 'string' && promo.length > 0) {
        curURL = curForm.attr('data-calcFormPromo');
    }

    $.post({
        url: curURL,
        data: curData,
        dataType: 'json'
    }).done(function(data) {

        if (data.status) {
            if (typeof data.response === 'object') {
                if (data.response.MESSAGE.length > 0) {
                    $('#order-promo').addClass('error').parent().find('label.error').remove();
                    $('#order-promo').prop('disabled', false).after('<label class="error">' + data.response.MESSAGE + '</label>');
                    $('.order-form-results-code').removeClass('success');
                    if (typeof gtag === 'function') {
                        gtag('event', 'exception', {
                            'description': data.response.MESSAGE,
                            'fatal': false
                        });
                    }
                } else {
                    $('#order-promo').removeClass('error').prop('disabled', true).parent().find('label.error').remove();
                    $('.order-form-results-code').addClass('success');
                }

                $('#programCost').removeClass('loading').html(data.response.SUM + ' ₽');

                if (Number(data.response.OLD) > 0) {
                    $('#programCost').append(' <em>' + data.response.OLD + ' ₽</em>');
                }
            } else {
                $('#programCost').removeClass('loading').html(data.response + ' ₽');
            }
        }

    }).fail(function() {
        curForm.find('.form-error').remove()
        curForm.prepend('<div class="form-error">Сервис временно недоступен, попробуйте позже.</div>');
    });
}

$(window).on('load', function() {

    $('form[data-calcForm]').each(function() {
        updatePrecalc($(this));
    });

});