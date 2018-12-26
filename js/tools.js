$(document).ready(function() {

    if ($('.main').length > 0) {
        $('footer').addClass('with-main');
    }

    $('.gallery').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 201.72 381.74"><path d="M26.14,191l172.4-172.4A10.8,10.8,0,0,0,183.26,3.28L3.18,183.36a10.77,10.77,0,0,0,0,15.28l180.08,180a10.85,10.85,0,0,0,7.6,3.2,10.55,10.55,0,0,0,7.6-3.2,10.77,10.77,0,0,0,0-15.28Zm0,0" transform="translate(0 -0.1)"/></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 201.72 381.74"><path d="M26.14,191l172.4-172.4A10.8,10.8,0,0,0,183.26,3.28L3.18,183.36a10.77,10.77,0,0,0,0,15.28l180.08,180a10.85,10.85,0,0,0,7.6,3.2,10.55,10.55,0,0,0,7.6-3.2,10.77,10.77,0,0,0,0-15.28Zm0,0" transform="translate(0 -0.1)"/></svg></button>',
        dots: false
    });

    $('.nav-add-link').click(function(e) {
        $('html').toggleClass('nav-add-open');
        e.preventDefault();
    });

    $.validator.addMethod('phoneRU',
        function(phone_number, element) {
            return this.optional(element) || phone_number.match(/^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/);
        },
        'Ошибка заполнения'
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

    $('.page-menu').each(function() {
        $('.page-menu-inner').append('<ul></ul>');
        $('.page-section-item').each(function() {
            var curItem = $(this);
            $('.page-menu-inner ul').append('<li><a href="#' + curItem.attr('id') + '">' + curItem.data('title') + '</a></li>');
        });
    });

    $('body').on('click', '.page-menu ul li a', function(e) {
        var curBlock = $($(this).attr('href'));
        if (curBlock.length > 0) {
            $('html, body').animate({'scrollTop': curBlock.offset().top - 75});
        }
        e.preventDefault();
    });

    $('.main-events-list').each(function() {
        if ($('.main-events-item').length > 4) {
            var startHTML = $(this).html();
            $(this).data('startIndex', $('.main-events-item').length * 5);
            $(this).data('startCount', $('.main-events-item').length);
            $(this).prepend(startHTML).prepend(startHTML).prepend(startHTML).prepend(startHTML).prepend(startHTML);
            $(this).append(startHTML).append(startHTML).append(startHTML).append(startHTML).append(startHTML);
        }
    });

    $('.main-events-list').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: $('.main-events-list').data('startIndex'),
        prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 201.72 381.74"><path d="M26.14,191l172.4-172.4A10.8,10.8,0,0,0,183.26,3.28L3.18,183.36a10.77,10.77,0,0,0,0,15.28l180.08,180a10.85,10.85,0,0,0,7.6,3.2,10.55,10.55,0,0,0,7.6-3.2,10.77,10.77,0,0,0,0-15.28Zm0,0" transform="translate(0 -0.1)"/></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 201.72 381.74"><path d="M26.14,191l172.4-172.4A10.8,10.8,0,0,0,183.26,3.28L3.18,183.36a10.77,10.77,0,0,0,0,15.28l180.08,180a10.85,10.85,0,0,0,7.6,3.2,10.55,10.55,0,0,0,7.6-3.2,10.77,10.77,0,0,0,0-15.28Zm0,0" transform="translate(0 -0.1)"/></svg></button>',
        dots: false,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true
                }
            }
        ]
    });
    $('.main-events-list').on('setPosition', function(event, slick) {
        if ($('.main-events-list .slick-dots li').length > 0) {
            var curIndex = $('.main-events-list').slick('slickCurrentSlide');
            var startCount = $('.main-events-list').data('startCount');
            var startPage = Math.floor(curIndex / startCount) * startCount;
            $('.main-events-list .slick-dots li').css({'display': 'none'});
            $('.main-events-list .slick-dots li').each(function() {
                var curItem = $(this);
                var itemIndex = $('.main-events-list .slick-dots li').index(curItem);
                if (itemIndex >= startPage && itemIndex < startPage + startCount) {
                    curItem.css({'display': 'inline-block'});
                }
            });
        }
    });

    $('body').on('click', '.main-events-item-inner', function(e) {
        if ($('.main-events-form').length > 0) {
            var curLink = $(this);
            var curItem = curLink.parent();
            if (curItem.hasClass('active')) {
                $('.main-events-form').html('').hide();
                curItem.removeClass('active')
            } else {
                $('.main-events-item.active').removeClass('active');
                $('.main-events-form').html('<div class="loading"></div>').show();
                curItem.addClass('active')
                $.ajax({
                    type: 'POST',
                    url: curLink.attr('href'),
                    dataType: 'html',
                    cache: false
                }).done(function(html) {
                    $('.main-events-form').html(html);
                    initForm($('.main-events-form form'));
                });
            }
            e.preventDefault();
        }
    });

    $('.main-up').click(function(e) {
        $('html, body').animate({'scrollTop': 0});
        e.preventDefault();
    });

    $('.cookies-message-close').click(function() {
        $('.cookies-message').remove();
    });

    $('.block-bg-docs-title span').click(function() {
        $(this).parents().filter('.block-bg-docs').toggleClass('open').find('.block-bg-docs-content').slideToggle();
    });

    $('body').on('click', '.window-link', function(e) {
        var curLink = $(this);
        if (!curLink.hasClass('window-add')) {
            windowOpen(curLink.attr('href'));
        } else {
            curLinkWindowAdd = curLink;
            windowOpen(curLink.attr('href'), true);
        }
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $('body').on('click', '.window-close', function(e) {
        windowClose();
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $(window).resize(function() {
        windowPosition();
    });

    $('.contacts-menu a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.contacts-menu li.active').removeClass();
            curLi.addClass('active');
            var curIndex = $('.contacts-menu li').index(curLi);
            $('.contacts-tab.active').removeClass('active');
            $('.contacts-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.contacts-feedback-link a').click(function(e) {
        var curBlock = $($(this).attr('href'));
        if (curBlock.length > 0) {
            $('html, body').animate({'scrollTop': curBlock.offset().top});
        }
        e.preventDefault();
    });

    $('body').on('click', '.vacancy-title', function(e) {
        var curItem = $(this).parent().filter('.vacancy');
        curItem.toggleClass('open');
        curItem.find('.vacancy-content').slideToggle();
        e.preventDefault();
    });

    $('.mobile-menu-link').click(function(e) {
        $('html').toggleClass('mobile-menu-open');
        e.preventDefault();
    });

    $('.nav-add-item-title').click(function() {
        $(this).toggleClass('open');
    });

    $('.nav-add-item-title a').click(function(e) {
        if ($(window).width() < 1200) {
            if ($(this).parent().next().find('li').length > 1) {
                e.preventDefault();
            }
        }
    });

    $('.nav-add-item-title').each(function() {
        if ($(this).next().find('li').length > 1) {
            $(this).prepend('<svg xmlns="http://www.w3.org/2000/svg" width="6" height="14" viewBox="0 0 49.68 92.8"><path d="M5.6,91.92a3.21,3.21,0,0,1-2.32,1,3.2,3.2,0,0,1-2.32-1,3.28,3.28,0,0,1,0-4.64l40.8-40.8L1,5.68A3.28,3.28,0,0,1,5.6,1L48.72,44.16a3.28,3.28,0,0,1,0,4.64Zm0,0"/></svg>');
        }
    });

    $('.nav-add-item-list li').each(function() {
        var curLi = $(this);
        if (curLi.find('ul').length > 0) {
            curLi.addClass('mobile-with-submenu');
            curLi.find('> a').eq(0).append('<svg xmlns="http://www.w3.org/2000/svg" width="5" height="11" viewBox="0 0 49.68 92.8"><path d="M5.6,91.92a3.21,3.21,0,0,1-2.32,1,3.2,3.2,0,0,1-2.32-1,3.28,3.28,0,0,1,0-4.64l40.8-40.8L1,5.68A3.28,3.28,0,0,1,5.6,1L48.72,44.16a3.28,3.28,0,0,1,0,4.64Zm0,0" transform="translate(0 -0.08)"/></svg>');
            curLi.find('> span').eq(0).append('<svg xmlns="http://www.w3.org/2000/svg" width="5" height="11" viewBox="0 0 49.68 92.8"><path d="M5.6,91.92a3.21,3.21,0,0,1-2.32,1,3.2,3.2,0,0,1-2.32-1,3.28,3.28,0,0,1,0-4.64l40.8-40.8L1,5.68A3.28,3.28,0,0,1,5.6,1L48.72,44.16a3.28,3.28,0,0,1,0,4.64Zm0,0" transform="translate(0 -0.08)"/></svg>');
        }
    });

    $('.nav-add-item-list li a, .nav-add-item-list li span').click(function(e) {
        if ($(window).width() < 1200) {
            var curLi = $(this).parent();
            if (curLi.find('ul').length > 0) {
                curLi.toggleClass('open');
                e.preventDefault();
            }
        }
    });

    $(window).on('resize', function() {
        $('.nav-add-open').removeClass('nav-add-open');
    });

    $('.services-item').each(function() {
        var curItem = $(this);
        if (curItem.find('.services-item-list').length > 0) {
            curItem.find('.services-item-title a').prepend('<svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 92.87 49.68"><path d="M91.92,1.2a3.28,3.28,0,0,0-4.64,0L46.48,42.08,5.6,1.2A3.28,3.28,0,0,0,1,5.84L44.08,49a3.21,3.21,0,0,0,2.32,1,3.34,3.34,0,0,0,2.32-1L91.84,5.84a3.22,3.22,0,0,0,.08-4.64Zm0,0" transform="translate(0 -0.24)"/></svg>');
            curItem.find('.services-item-title span').prepend('<svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 92.87 49.68"><path d="M91.92,1.2a3.28,3.28,0,0,0-4.64,0L46.48,42.08,5.6,1.2A3.28,3.28,0,0,0,1,5.84L44.08,49a3.21,3.21,0,0,0,2.32,1,3.34,3.34,0,0,0,2.32-1L91.84,5.84a3.22,3.22,0,0,0,.08-4.64Zm0,0" transform="translate(0 -0.24)"/></svg>');
        }
    });

    $('.services-item-title a, .services-item-title span').click(function(e) {
        if ($(window).width() < 1200) {
            var curItem = $(this).parents().filter('.services-item');
            if (curItem.find('.services-item-list').length > 0) {
                curItem.toggleClass('open');
                e.preventDefault();
            }
        }
    });

    $('.main-insurance-event-mobile-btn-more-link a').click(function(e) {
        $(this).parent().toggleClass('open');
        e.preventDefault();
    });

    $('#order-programm-select').change(function() {
        var curValue = $(this).val();
        $('.order-programm-detail').hide();
        var curProgramm = $('.order-programm-detail[data-id="' + curValue + '"]');
        curProgramm.show();
        $('.main-events-form-results-value-price span').html(curProgramm.data('cost'));
        $('.main-events-form-results-value-price em').remove();
        window.setTimeout(function() {
            $('.order-form-results-code-btn a').trigger('click');
        }, 100);
    });

    $('#order-programm-select').each(function() {
        var curValue = $(this).val();
        $('.order-programm-detail').hide();
        var curProgramm = $('.order-programm-detail[data-id="' + curValue + '"]');
        curProgramm.show();
        $('.main-events-form-results-value-price span').html(curProgramm.data('cost'));
        $('.main-events-form-results-value-price em').remove();
        window.setTimeout(function() {
            $('.order-form-results-code-btn a').trigger('click');
        }, 100);
    });

    if ($('#order-date-start').length == 1) {
        $('#order-date-start').change(function() {
            var curDateText = $(this).val();
            var curDateArray = curDateText.split('.');
            var curDate = new Date(curDateArray[2] + '-' + curDateArray[1] + '-' + curDateArray[0]);
            $('#order-date-start').datepicker().data('datepicker').selectDate(curDate);
            var newDate = curDate;
            newDate.setFullYear(newDate.getFullYear() + 1);
            $('#order-date-end').datepicker().data('datepicker').selectDate(newDate);
        });
        $('#order-date-start').each(function() {
            var curDateText = $(this).val();
            if (curDateText != '') {
                var curDateArray = curDateText.split('.');
                var curDate = new Date(curDateArray[2] + '-' + curDateArray[1] + '-' + curDateArray[0]);
                $('#order-date-start').datepicker().data('datepicker').selectDate(curDate);
                var newDate = curDate;
                newDate.setFullYear(newDate.getFullYear() + 1);
                $('#order-date-end').datepicker().data('datepicker').selectDate(newDate);
            } else {
                $('#order-date-end').val('');
                $('#order-date-start').datepicker().data('datepicker').clear();
                $('#order-date-end').datepicker().data('datepicker').clear();
            }
        });
    }

    $('body').on('click', '.order-form-results-code-btn a', function(e) {
        var curValue = $('#order-promo').val();
        if (curValue != '') {
            $.ajax({
                type: 'POST',
                url: 'ajax/order-promo.json',
                dataType: 'json',
                data: JSON.stringify({'promo': curValue, 'programm': $('#order-programm-select').val()}),
                cache: false
            }).done(function(data) {
                if (data.status == 'ok') {
                    $('#order-promo').data('newcost', data.newcost);
                    var curProgrammID = $('#order-programm-select').val();
                    var curProgramm = $('.order-programm-detail[data-id="' + curProgrammID + '"]');
                    $('.main-events-form-results-value-price span').html(data.newcost);
                    $('.main-events-form-results-value-price em').remove();
                    $('.main-events-form-results-value-price').append(' <em>' + curProgramm.data('cost') + ' ₽</em>');
                    $('#order-promo').removeClass('error');
                    $('#order-promo').parent().find('label.error').remove();
                    $('#order-promo').prop('disabled', true);
                    $('.order-form-results-code').addClass('success');
                } else {
                    var curProgrammID = $('#order-programm-select').val();
                    var curProgramm = $('.order-programm-detail[data-id="' + curProgrammID + '"]');
                    $('.main-events-form-results-value-price span').html(curProgramm.data('cost'));
                    $('.main-events-form-results-value-price em').remove();
                    $('#order-promo').addClass('error');
                    $('#order-promo').parent().find('label.error').remove();
                    $('#order-promo').after('<label class="error">Неправильный промо-код</label>');
                    $('#order-promo').prop('disabled', false);
                    $('.order-form-results-code').removeClass('success');
                }
            });
        } else {
            var curProgrammID = $('#order-programm-select').val();
            var curProgramm = $('.order-programm-detail[data-id="' + curProgrammID + '"]');
            $('.main-events-form-results-value-price span').html(curProgramm.data('cost'));
            $('.main-events-form-results-value-price em').remove();
            $('#order-promo').removeClass('error');
            $('#order-promo').parent().find('label.error').remove();
            $('#order-promo').prop('disabled', false);
            $('.order-form-results-code').removeClass('success');
        }
        e.preventDefault();
    });

    $('body').on('click', '.order-form-results-code .form-input-clear', function(e) {
        var curProgrammID = $('#order-programm-select').val();
        var curProgramm = $('.order-programm-detail[data-id="' + curProgrammID + '"]');
        $('.main-events-form-results-value-price span').html(curProgramm.data('cost'));
        $('.main-events-form-results-value-price em').remove();
        $('#order-promo').removeClass('error');
        $('#order-promo').parent().find('label.error').remove();
        $('#order-promo').prop('disabled', false);
        $('.order-form-results-code').removeClass('success');
        e.preventDefault();
    });

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

    $('#order-confirm').each(function() {
        $(this).prop('checked', false);
    });

    $('#order-confirm-data').change(function() {
        if (!($('#order-confirm-info').prop('checked') && $('#order-confirm-data').prop('checked'))) {
            $('.order-confirm-form').addClass('close');
        } else {
            $('.order-confirm-form').removeClass('close');
        }
    });

    $('#order-confirm-data').each(function() {
        if (!($('#order-confirm-info').prop('checked') && $('#order-confirm-data').prop('checked'))) {
            $('.order-confirm-form').addClass('close');
        } else {
            $('.order-confirm-form').removeClass('close');
        }
    });

    $('#order-confirm-info').change(function() {
        if (!($('#order-confirm-info').prop('checked') && $('#order-confirm-data').prop('checked'))) {
            $('.order-confirm-form').addClass('close');
        } else {
            $('.order-confirm-form').removeClass('close');
        }
    });

    $('#order-confirm-info').each(function() {
        if (!($('#order-confirm-info').prop('checked') && $('#order-confirm-data').prop('checked'))) {
            $('.order-confirm-form').addClass('close');
        } else {
            $('.order-confirm-form').removeClass('close');
        }
    });

    var confirmForm = $('.order-confirm-form');
    if (confirmForm.length > 0) {
        var validator = confirmForm.validate();
        validator.destroy();
        confirmForm.validate({
            ignore: '',
            submitHandler: function(form) {
                confirmForm.addClass('loading');
                confirmForm.find('input[type="submit"]').prop('disabled', true);
                confirmForm.find('input[type="text"]').prop('disabled', true);
                confirmForm.find('input[type="text"]').parent().addClass('form-input-disabled');
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
                    $(form).find('.form-error').remove();
                    $(form).append('<div class="form-error"><div class="form-error-title">Произошла ошибка</div><div class="form-error-text">' + errorThrown + '</div></div>');
                }).done(function(data) {
                    confirmForm.removeClass('loading');
                    confirmForm.find('input[type="submit"]').prop('disabled', false);
                    confirmForm.find('input[type="text"]').prop('disabled', false);
                    confirmForm.find('input[type="text"]').parent().removeClass('form-input-disabled');
                    if (data.status == 'ok') {
                        $(form).find('.form-error').remove();
                        $('.order-confirm-form').addClass('sms-success');
                    } else {
                        $(form).find('.form-error').remove();
                        $(form).append('<div class="form-error"><div class="form-error-title">Произошла ошибка</div><div class="form-error-text">' + data.errorMessage + '</div></div>');
                    }
                });
            }
        });
    }

    $('body').on('copy paste cut', '#emailCopy', function() {
        return false;
    });

    $('body').on('click', '.btn-form-send', function(e) {
        $(this).parents().filter('form').validate().destroy();
        $(this).parents().filter('form').append('<input type="hidden" name="' + $(this).data('name') + '" value="1" />');
        $(this).parents().filter('form').trigger('submit');
        e.preventDefault();
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
    curForm.find('input.digit4').mask('0000');
    curForm.find('input.digit6').mask('000000');

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
            var charCode = (evt.which) ? evt.which : evt.keyCode
            if (charCode > 31 && (charCode < 43 || charCode > 57)) {
                return false;
            }
            return true;
        });
    });

    curForm.find('.form-input-date input').each(function() {
        var minDateText = $(this).attr('min');
        var minDate = null;
        if (typeof (minDateText) != 'undefined') {
            var minDateArray = minDateText.split('.');
            minDate = new Date(minDateArray[2] + '-' + minDateArray[1] + '-' + minDateArray[0]);
        }
        var maxDateText = $(this).attr('max');
        var maxDate = null;
        if (typeof (maxDateText) != 'undefined') {
            var maxDateArray = maxDateText.split('.');
            maxDate = new Date(maxDateArray[2] + '-' + maxDateArray[1] + '-' + maxDateArray[0]);
        }
        $(this).datepicker({
            language: 'ru',
            minDate: minDate,
            maxDate: maxDate
        });
    });

    curForm.find('.form-input-date-range input').each(function() {
        var minDateText = $(this).attr('min');
        var minDate = null;
        if (typeof (minDateText) != 'undefined') {
            var minDateArray = minDateText.split('.');
            minDate = new Date(minDateArray[2] + '-' + minDateArray[1] + '-' + minDateArray[0]);
        }
        var maxDateText = $(this).attr('max');
        var maxDate = null;
        if (typeof (maxDateText) != 'undefined') {
            var maxDateArray = maxDateText.split('.');
            maxDate = new Date(maxDateArray[2] + '-' + maxDateArray[1] + '-' + maxDateArray[0]);
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

    curForm.validate({
        ignore: '',
        submitHandler: function(form) {
            if ($(form).hasClass('ajax-form')) {
                windowOpen($(form).attr('action'), false, $(form).serialize());
            } else {
                form.submit();
            }
        }
    });
}

function windowOpen(linkWindow, addWindow = false, dataWindow, callbackWindow) {
    if (!addWindow) {
        var curPadding = $('.wrapper').width();
        $('html').addClass('window-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});

        if ($('.window').length == 0) {
            $('body').append('<div class="window"><div class="window-loading"></div></div>')
        }
    } else {
        $('body').append('<div class="window"><div class="window-loading"></div></div>')
    }

    $.ajax({
        type: 'POST',
        url: linkWindow,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        $('.window:last').html('<div class="window-container window-container-load"><div class="window-content">' + html + '<a href="#" class="window-close"></a></div></div>')

        if ($('.window:last .window-container img').length > 0) {
            $('.window:last .window-container img').each(function() {
                $(this).attr('src', $(this).attr('src'));
            });
            $('.window:last .window-container').data('curImg', 0);
            $('.window:last .window-container img').one('load', function() {
                var curImg = $('.window:last .window-container').data('curImg');
                curImg++;
                $('.window:last .window-container').data('curImg', curImg);
                if ($('.window:last .window-container img').length == curImg) {
                    $('.window:last .window-container').removeClass('window-container-load');
                    windowPosition();
                }
            });
        } else {
            $('.window:last .window-container').removeClass('window-container-load');
            windowPosition();
        }

        if (typeof (callbackWindow) != 'undefined') {
            callbackWindow.call();
        }

        $('.window:last form').each(function() {
            initForm($(this));
        });
    });
}

function windowPosition() {
    if ($('.window').length > 0) {
        $('.window:last .window-container').css({'left': '50%', 'margin-left': -$('.window:last .window-container').width() / 2});

        $('.window:last .window-container').css({'top': '50%', 'margin-top': -$('.window:last .window-container').height() / 2, 'padding-bottom': 0});
        if ($('.window:last .window-container').height() > $('.window:last').height() - 60) {
            $('.window:last .window-container').css({'top': '30px', 'margin-top': 0, 'padding-bottom': 30});
        }
    }
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window:last').remove();
        if ($('.window').length == 0) {
            $('html').removeClass('window-open');
            $('body').css({'margin-right': 0});
        }
    }
}

var pageMenuTimer = null;

$(window).on('load resize scroll', function() {
    $('.page-menu').each(function() {
        if ($(window).scrollTop() > $('.page-menu').offset().top) {
            $('.page-menu').addClass('fixed');
        } else {
            $('.page-menu').removeClass('fixed');
        }

        $('.page-menu li.active').removeClass('active');
        $('.page-menu').find('li').each(function() {
            var curBlock = $($(this).find('a').attr('href'));
            if (curBlock.length > 0) {
                if ($(window).scrollTop() + $(window).height() / 2 > curBlock.offset().top) {
                    $('.page-menu li.active').removeClass('active');
                    $(this).addClass('active');
                }
            }
        });
        window.clearTimeout(pageMenuTimer);
        pageMenuTimer = null;
        pageMenuTimer = window.setTimeout(function() {
            if ($('.page-menu ul').hasClass('slick-slider')) {
                $('.page-menu ul').slick('slickGoTo', $('.page-menu ul li').index($('.page-menu ul li.active')));
            }
        }, 100);
    });

    if ($(window).scrollTop() > $(window).height()) {
        $('.main-up').addClass('visible');
    } else {
        $('.main-up').removeClass('visible');
    }

    if ($(window).width() < 1200) {
        if (!$('.page-menu ul').hasClass('slick-slider')) {
            var curWidth = 0;
            $('.page-menu ul li').each(function() {
                curWidth += $(this).width();
            });
            if (curWidth > $('.page-menu').width()) {
                $('.page-menu ul').slick({
                    dots: false,
                    infinite: false,
                    variableWidth: true,
                    centerMode: true,
                    prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 201.72 381.74"><path d="M26.14,191l172.4-172.4A10.8,10.8,0,0,0,183.26,3.28L3.18,183.36a10.77,10.77,0,0,0,0,15.28l180.08,180a10.85,10.85,0,0,0,7.6,3.2,10.55,10.55,0,0,0,7.6-3.2,10.77,10.77,0,0,0,0-15.28Zm0,0" transform="translate(0 -0.1)"/></svg></button>',
                    nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 201.72 381.74"><path d="M26.14,191l172.4-172.4A10.8,10.8,0,0,0,183.26,3.28L3.18,183.36a10.77,10.77,0,0,0,0,15.28l180.08,180a10.85,10.85,0,0,0,7.6,3.2,10.55,10.55,0,0,0,7.6-3.2,10.77,10.77,0,0,0,0-15.28Zm0,0" transform="translate(0 -0.1)"/></svg></button>'
                });
            }
        }
    } else {
        if ($('.page-menu ul').hasClass('slick-slider')) {
            $('.page-menu ul').slick('unslick');
        }
    }
});