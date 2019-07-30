(function($) {
    "use strict"
    $(function() {

        var swiper = new Swiper('.zones__carousel__inner', {
            slidesPerView:  2,
            // centeredSlides: true,
            spaceBetween: 30,
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
          });

    })
})(jQuery);