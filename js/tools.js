$(document).ready(function() {

    $('.gallery').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 201.72 381.74"><path d="M26.14,191l172.4-172.4A10.8,10.8,0,0,0,183.26,3.28L3.18,183.36a10.77,10.77,0,0,0,0,15.28l180.08,180a10.85,10.85,0,0,0,7.6,3.2,10.55,10.55,0,0,0,7.6-3.2,10.77,10.77,0,0,0,0-15.28Zm0,0" transform="translate(0 -0.1)"/></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 201.72 381.74"><path d="M26.14,191l172.4-172.4A10.8,10.8,0,0,0,183.26,3.28L3.18,183.36a10.77,10.77,0,0,0,0,15.28l180.08,180a10.85,10.85,0,0,0,7.6,3.2,10.55,10.55,0,0,0,7.6-3.2,10.77,10.77,0,0,0,0-15.28Zm0,0" transform="translate(0 -0.1)"/></svg></button>',
        dots: false,
    });

    $('.nav-add-link').click(function() {
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
            $('html, body').animate({'scrollTop': curBlock.offset().top - 50});
        }
        e.preventDefault();
    });

    $('.main-events-list').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
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
        windowOpen(curLink.attr('href'));
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

    $('.nav-add-item-title').each(function() {
        $(this).prepend('<svg xmlns="http://www.w3.org/2000/svg" width="6" height="14" viewBox="0 0 49.68 92.8"><path d="M5.6,91.92a3.21,3.21,0,0,1-2.32,1,3.2,3.2,0,0,1-2.32-1,3.28,3.28,0,0,1,0-4.64l40.8-40.8L1,5.68A3.28,3.28,0,0,1,5.6,1L48.72,44.16a3.28,3.28,0,0,1,0,4.64Zm0,0"/></svg>');
    });

    $('.nav-add-item-list li').each(function() {
        var curLi = $(this);
        if (curLi.find('ul').length > 0) {
            curLi.addClass('mobile-with-submenu');
            curLi.find('> a').eq(0).append('<svg xmlns="http://www.w3.org/2000/svg" width="5" height="11" viewBox="0 0 49.68 92.8"><path d="M5.6,91.92a3.21,3.21,0,0,1-2.32,1,3.2,3.2,0,0,1-2.32-1,3.28,3.28,0,0,1,0-4.64l40.8-40.8L1,5.68A3.28,3.28,0,0,1,5.6,1L48.72,44.16a3.28,3.28,0,0,1,0,4.64Zm0,0" transform="translate(0 -0.08)"/></svg>');
        }
    });

    $('.nav-add-item-list li a').click(function(e) {
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
        }
    });

    $('.services-item-title a').click(function(e) {
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

var dateFormat = 'dd.mm.yy';

function initForm(curForm) {
    curForm.find('input.phoneRU').mask('+7 (000) 000-00-00');

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

    curForm.find('.form-input-date input').datepicker({
        dateFormat: dateFormat
    });

    curForm.find('.form-input-date-range input').datepicker({
        dateFormat: dateFormat,
        range: 'period',
        onSelect: function(dateText, inst, extensionRange) {
            inst.input.val(extensionRange.startDateText + ' - ' + extensionRange.endDateText);
        }
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
            form.submit();
        }
    });
}

function windowOpen(linkWindow, dataWindow, callbackWindow) {
    if ($('.window').length > 0) {
        windowClose();
    }

    var curPadding = $('.wrapper').width();
    $('html').addClass('window-open');
    curPadding = $('.wrapper').width() - curPadding;
    $('body').css({'margin-right': curPadding + 'px'});

    $('body').append('<div class="window"><div class="window-loading"></div></div>')

    $.ajax({
        type: 'POST',
        url: linkWindow,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window').length > 0) {
            $('.window').remove();
        }
        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        $('.window').append('<div class="window-container window-container-load"><div class="window-content">' + html + '<a href="#" class="window-close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.2 11.2"><path d="M11.2,1.12,10.08,0,5.6,4.48,1.12,0,0,1.12,4.48,5.6,0,10.08,1.12,11.2,5.6,6.72l4.48,4.48,1.12-1.12L6.72,5.6Zm0,0"/></svg></a></div></div>')

        if ($('.window-container img').length > 0) {
            $('.window-container img').each(function() {
                $(this).attr('src', $(this).attr('src'));
            });
            $('.window-container').data('curImg', 0);
            $('.window-container img').one('load', function() {
                var curImg = $('.window-container').data('curImg');
                curImg++;
                $('.window-container').data('curImg', curImg);
                if ($('.window-container img').length == curImg) {
                    $('.window-container').removeClass('window-container-load');
                    windowPosition();
                }
            });
        } else {
            $('.window-container').removeClass('window-container-load');
            windowPosition();
        }

        if (typeof (callbackWindow) != 'undefined') {
            callbackWindow.call();
        }

        $('.window form').each(function() {
            initForm($(this));
        });
    });
}

function windowPosition() {
    if ($('.window').length > 0) {
        $('.window-container').css({'left': '50%', 'margin-left': -$('.window-container').width() / 2});

        $('.window-container').css({'top': '50%', 'margin-top': -$('.window-container').height() / 2, 'padding-bottom': 0});
        if ($('.window-container').height() > $('.window').height() - 60) {
            $('.window-container').css({'top': '30px', 'margin-top': 0, 'padding-bottom': 30});
        }
    }
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window').remove();
        $('html').removeClass('window-open');
        $('body').css({'margin-right': 0});
    }
}

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
                if ($(window).scrollTop() + $(window).height() / 3 > curBlock.offset().top) {
                    $('.page-menu li.active').removeClass('active');
                    $(this).addClass('active');
                }
            }
        });
        if ($('.page-menu ul').hasClass('slick-slider')) {
            $('.page-menu ul').slick('slickGoTo', $('.page-menu ul li').index($('.page-menu ul li.active')));
        }
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