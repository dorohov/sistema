(function($) {
    "use strict"
    $(function() {

        var swiper = new Swiper('.directions__center__inner', {
            spaceBetween: 30,
            slidesPerView:  2,
            effect: 'fade',
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          });

    })
})(jQuery);