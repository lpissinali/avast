$(document).ready(function () {

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };


    //open modal when parameter
    if (window.location.search.indexOf('program') > -1) {
        var program = getUrlParameter('program');
        var prod = $('div[data-id = ' + program + ']');
        var prodPrice = prod.attr('data-price');
        var prodDisc = prod.attr('data-disc');
        var pacEndpoints = $('.js-endpoint-count span').text();
        var pacYears = $('.js-years-count span').text();

        $('.modal').addClass('opened');
        prod.addClass('selected');
        prod.find('.item-check span').addClass('selected');


        $('.js-pac-val').text('$' + prodPrice);
        $('.js-pac-disc').text('$' + prodDisc);
        updateTotal();
    }

    $('.js-close-modal').click(function (e) {
        e.preventDefault();
        $('.modal').removeClass('opened');
    });


    // package change
    $('.js-prod-check').on('click', function() {
       $('.js-prod-check span').removeClass('selected');
        $(this).find('span').addClass('selected');

        $('.col-product').removeClass('selected');
        $(this).parent().addClass('selected');

        prod = $(this).parent().attr('data-id');
        prodPrice = $(this).parent().attr('data-price');
        prodDisc = $(this).parent().attr('data-disc');
        updateTotal();
    });

    //package price calculation
    $('.js-endpoint-plus').on('click', function () {
        if (pacEndpoints < 10) {
            pacEndpoints++;
            $('.js-endpoint-count span').text(pacEndpoints);
            updateTotal();
        }
    });

    $('.js-endpoint-minus').on('click', function () {
        if (pacEndpoints > 1) {
            pacEndpoints--;
            $('.js-endpoint-count span').text(pacEndpoints);
            updateTotal();
        }
    });

    $('.js-year-plus').on('click', function () {
        if (pacYears < 5) {
            pacYears++;
            $('.js-years-count span').text(pacYears);
            updateTotal();
        }
    });

    $('.js-year-minus').on('click', function () {
        if (pacYears > 1) {
            pacYears--;
            $('.js-years-count span').text(pacYears);
            updateTotal();
        }
    });


    function updateTotal() {
        var tot = prodPrice * pacYears * pacEndpoints;
        var disc = prodDisc * pacYears * pacEndpoints;

        $('.js-pac-val').text('$' + prodPrice)
        $('.js-pac-tot').text('$' + tot.toFixed(2));
        $('.js-pac-disc').text('$' + disc.toFixed(2));
    }


    //side menu
    $('.js-menu').on('click', function () {
        $('.menu-hide').addClass('show');
    });
    $('.js-menu-close').on('click', function () {
        $('.menu-hide').removeClass('show');
    });


    //scrool to section
    $(".js-scroll-down").on('click', function (e) {
        $('html, body').animate({
            scrollTop: $("#main").offset().top
        }, 500);
    });

    //toggle div
    $('.js-toggle-handle').click(function (event) {
        event.stopPropagation();
        $(".js-toggle-group").slideToggle("fast");
        $(this).toggleClass('open');
    });


    //calculate packages
    var pcs = $('.js-plan-current').find('span');
    var plans = 1;
    var price, disc;

    $('.js-plan-plus').on('click', function () {
        if (plans < 10) {
            plans++;
            pcs.text(plans);

            $(".js-val").each(function (i) {
                price = $(this).attr('data-val');
                price = price * plans;

                $(this).text(price);
            });

            $(".js-disc").each(function (i) {
                disc = $(this).attr('data-val');
                disc = disc * plans;

                $(this).text('$' + disc.toFixed(2));
            });
        }
    });

    $('.js-plan-minus').on('click', function () {
        if (plans > 1) {
            plans--;
            pcs.text(plans);

            $(".js-val").each(function (i) {
                price = $(this).attr('data-val');
                price = price * plans;

                $(this).text(price);
            });

            $(".js-disc").each(function (i) {
                disc = $(this).attr('data-val');
                disc = disc * plans;

                $(this).text('$' + disc.toFixed(2));
            });
        }
    })
});