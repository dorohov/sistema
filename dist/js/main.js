(function($) {
    "use strict"
    $(function() {

        $('.art__carousel__list').slick({
            prevArrow: '.art__carousel__controls button.is--prev',
            nextArrow: '.art__carousel__controls button.is--next'
        })
        
    })
})(jQuery);
(function($) {
    "use strict"
    $(function() {

      function setSlideInfo(slideId) {

        var currentSlide = $('.directions__center__carousel__item[data-id="' + slideId + '"]')[0],
        currentInfo = {
          id: slideId,
          title: $(currentSlide).data('title'),
          text: $(currentSlide).data('text'),
          link: $(currentSlide).data('link')
        }

        $('.directions__right__heading').html(currentInfo.title)
        $('.directions__right__text').html(currentInfo.text)
        $('.directions__right__btn a').attr('href', currentInfo.link)

        $('.directions__menu ul li').removeClass('is--active')
        $('.directions__menu ul li[data-id="' + currentInfo.id + '"]').addClass('is--active')

      }

      function setSlide(slideId) {
        swiper.slideTo(slideId + 1)
      }

      var swiper = new Swiper('.directions__center__inner', {
        spaceBetween: 30,
        slidesPerView:  2,
        effect: 'fade',
        loop: true,
        touchRatio: 0,
        on: {
          init: function() {
            setSlideInfo(0)
          },
          slideChange: function() {
            setSlideInfo(this.realIndex)
          }
        }
      });

      $('.directions__menu ul li span').on('click touchend', function() {
        var thisId = $(this).parent('li').data('id')
        setSlide(thisId)
      })

    })
})(jQuery);
lazyLoadImages();

function lazyLoadImages() {
    var images = document.querySelectorAll('.lazy');
    window.addEventListener('load', function() {
    for(var i = 0; i < images.length; i++) {
        images[i].src = images[i].dataset.src;
        images[i].removeAttribute('data-src');
        }
    });
}
(function($) {
    "use strict"
    $(function() {

        svg4everybody()

        function setPaddings() {

            var classes = {
                paddingLeft: '.is--c-pl',
                paddingRight: '.is--c-pr',
                height100Per: '.is--h100'
            }

            var padding = document.getElementsByClassName('navbar__inner')[0].getBoundingClientRect()
            var height = $('.navbar').innerHeight() + $('.footer').innerHeight()

            $(classes.paddingLeft).css({
                paddingLeft: padding.left + 30
            })
            $(classes.paddingRight).css({
                paddingRight: padding.left + 30
            })
            $(classes.height100Per).css({
                minHeight: 'calc(100vh - ' + height + 'px)'
            })
            $('main').css({
                minHeight: 'calc(100vh - ' + height + 'px)'
            })

        }

        setPaddings()

        $(window).resize(function() {
            setPaddings()
        })

        $('form').parsley()

        var phoneInputs = document.getElementsByClassName('input-phone');

        if(phoneInputs.length) {
            for(var i = 0; i < phoneInputs.length; i++) {
                new IMask(
                    phoneInputs[i], {
                    mask: '+{7}(900)000-00-00'
                });
            }
        }

        $('.body-map__right__inner').sticky({
            topSpacing: 100,
            responsiveWidth: true,
            bottomSpacing: $('.footer').innerHeight() + 100
        });

        $('.anchor').on('click', function(e) {
            e.preventDefault();
            var _this = $(this)
            var aid = _this.attr("href");
            if(!aid) {
                aid = _this.data('target')
            }
            $('html,body').animate({scrollTop: $(aid).offset().top - $('.navbar').innerHeight()},'slow');
        })

    })
})(jQuery);
ymaps.ready(init);

function init() {
    if($('#map').length > 0) {
        var myMap = new ymaps.Map("map", {
            center: [52.971233, 36.054100],
            zoom: 17,
            controls: []
        }, {
            searchControlProvider: 'yandex#search'
        })

        myMap.geoObjects
            .add(new ymaps.Placemark([52.971233, 36.054100], {
                balloonContent: 'Фитнес Клуб <strong>Система Комплекс</strong>'
            }, {
                preset: 'islands#redSportIcon'
            }));
    }
}

function openModal(modalID) {
    $(modalID).modal({
        fadeDuration: 100,
        showClose: false,
    })
}

(function($) {
    "use strict"
    $(function() {

        $.modal.fadeDuration = 100
        $.modal.showClose = false

        $('a.modal-open').on('click', function(e) {
            e.preventDefault()
            var thisModalId = $(this).attr('href')
            openModal(thisModalId)
            return false;
        })

        // openModal('#modal_ice')
        // openModal('#modal_form')
        // openModal('#modal_success')
        // openModal('#modal_table')
        // openModal('#modal_trainer')
        // openModal('#modal_card')
        // openModal('#modal_apparatus')

    })
})(jQuery);
(function($) {
    "use strict"
    $(function() {

        var menuOpen = false
        var isNavbarTransparent = $('.navbar.is--transparent')

        function setBodyPadding() {
            var pt = $('.navbar').innerHeight()
            $('body.is--pt').css({
                paddingTop: pt
            })
        }

        setBodyPadding()

        $(window).resize(function() {
            setBodyPadding()
        })

        function openMenu() {
            openOverlay()
            $('.navbar__bar').focus()
            TweenMax.to('.navbar__bar', 1.5, {
                ease: Elastic.easeOut.config(1, 0.75),
                x: "0%",
            })
            TweenMax.staggerFrom('.navbar__bar__menu ul li', 1, {
                x: "-100%", 
                autoAlpha:0, 
                rotationY:"180", 
                perspective:600, 
                ease: Power2.easeOut,
                delay: 0.2
            }, .1)
            TweenMax.staggerFrom('.navbar__bar__soc .social ul li', 0.7, {
                y: 100,
                ease: Elastic.easeOut.config(1, 0.75),
                delay: .5,
                opacity: 0
            }, .1, function() {
                menuOpen = true
                $('.navbar__bar__inner').addClass('is--comp')
            })
        }

        function closeMenu() {
            if(menuOpen) {
                TweenMax.to('.navbar__bar', 1.5, {
                    ease: Elastic.easeOut.config(1, 2),
                    x: "-100%",
                })
                closeOverlay()
                $('.navbar__bar__inner').removeClass('is--comp')
            }
            menuOpen = false
        }

        function openOverlay() {
            $('body').addClass('is--overlay')
        }

        function closeOverlay() {
            if(menuOpen) {
                $('body').removeClass('is--overlay')
            }
        }

        function closeAll() {
            closeMenu()
            closeOverlay()
        }

        setDarkNavbar()

        function setDarkNavbar() {

            if($(document).scrollTop() > 50) {
                $('.navbar')
                        .removeClass('is--transparent')
                        .addClass('is--default')
            }else {
                if(isNavbarTransparent.length > 0) {
                    $('.navbar')
                        .removeClass('is--default')
                        .addClass('is--transparent')
                }
            }
        }

        $(window).scroll(function() {
            setDarkNavbar()
        })

        $('.navbar__menu button').on('click', function() {
            openMenu()
        })

        $('.navbar__bar__top__close button').on('click', function() {
            closeMenu()
        })

        $('#overlay').on('click', function() {
            closeAll()
        })

        $(document).keydown(function(e) {
            if (e.key === "Escape") {
                closeMenu()
           }
       });

        $(".banner__carousel__item img").mousedown(function(){
            return false;
        });

        $(".body-map__right__persons__list img").mousedown(function(){
            return false;
        });

        var images = $('.banner__carousel__item'),
            currentSlide = 0,
            countSlides = images.length,
            slidesInterval = 4.5

        for(var i = 0; i < images.length; i++) {
            if(i > 0) {
                TweenMax.to(images, slidesInterval, {
                    ease: Expo.easeOut,
                    x: "100%",
                    opacity: 0
                })
            }
        }

        TweenMax.to(images[currentSlide], slidesInterval, {
            ease: Expo.easeOut,
            x: "0%",
            opacity: 1
        })

        currentSlide++

        function changeSlides() {
            TweenMax.to(images, slidesInterval, {
                ease: Expo.easeOut,
                x: "100%",
                opacity: 0
            })
            TweenMax.to(images[currentSlide], slidesInterval, {
                ease: Expo.easeOut,
                x: "0%",
                opacity: 1
            })
            currentSlide++;
            if(currentSlide >= countSlides) currentSlide = 0
        }

        setInterval(function() {
            changeSlides()
        }, 6000)

        $('.banner__left__scroll').on('click', function() {
            changeSlides()
        })

    })
})(jQuery);
(function($) {
    "use strict"
    $(function() {

        var currentSex = $($('.person')[0]).data('sex'),
            currentPos = 'front'
        
        setPos(currentPos)

        function setPos(pos) {
            
            $('.person').css({
                display: "none"
            })

            $('.person[data-pos="' + pos + '"]').css({
                display: "block"
            })

            currentPos = pos

        }

        $('.body-map__right__controls button').on('click', function() {
        
            if(currentPos == 'front') currentPos = 'back'
            else if(currentPos == 'back') currentPos = 'front'

            setPos(currentPos)

        })

        $('#bminput').editableSelect({
            effects: 'default',
            duration: 0
        });

        setTimeout(function() {
            var plc = $('#bminput').data('placeholder')
            $('#bminput').attr('placeholder', plc)
        }, 1000)

    })
})(jQuery);
document.addEventListener("DOMContentLoaded", function(){
    setTimeout(function() {
        document.getElementById('preloader').classList.add('is--finished');
        document.body.className = document.body.className.replace("is--preloader","");
    }, 1000)
});
        var _classes = {
            open: "is--open"
        }

        function openDropdown(container) {
            $(container).addClass('is--open')
        }

        function closeDropdown() {
            $('.select').removeClass(_classes.open)
        }

        function toggleDropdown(container) {
            if($(container).hasClass(_classes.open)) {
                closeDropdown()
            }else {
                openDropdown(container)
            }
        }

        $(document).on('click', function(e) {
            var targets = $(e.target).closest('.select')
            if(targets.length <= 0) closeDropdown()
        })

        function selectItem(item) {
            closeDropdown()
        }

        $('.select__label').on('click', function() {
            var thisContainer = $(this).parent('.select')
            toggleDropdown(thisContainer)
        });

        $('.select__dropdown ul li').on('click', function() {
            var thisText = $(this).html()
            var thisValue = $(this).data('val')

            $(this).parent().parent().siblings('input').val(thisValue)
            $(this).parent().parent().siblings('.select__label').html(thisText)
            selectItem(thisText)
        });
(function($) {
    "use strict"
    $(function() {

        $('.table__list__items').slick({
            slidesToShow: 7,
            prevArrow: '.table__controls button.is--prev',
            nextArrow: '.table__controls button.is--next',
            slidesToScroll: 7,
            responsive: [
                {
                    breakpoint: 1600,
                    settings: {
                        slidesToShow: 6,
                        slidesToScroll: 6
                    }
                },
                {
                    breakpoint: 1440,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 5
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 440,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        })
    })
})(jQuery);
(function($) {
    "use strict"
    $(function() {

      function setDesktopNavsContainerWidth() {
        setTimeout(function() {
          var itemWidth = $('.zones__carousel__item.swiper-slide').css('width')
          $('.zones__carousel__mouse').css({
            maxWidth: itemWidth
          })
        }, 150)
      }

      window.onload = function() {
        setDesktopNavsContainerWidth()
      };

      function setSlideInfo(slideId) {
        var currentSlide = $('.zones__carousel__item[data-id="' + slideId + '"]')[0],
            currentInfo = {
              id: slideId,
              title: $(currentSlide).data('title'),
              text: $(currentSlide).data('text'),
              link: $(currentSlide).data('link')
            }
        
        $('.zones__left__heading').html(currentInfo.title)
        $('.zones__left__content').html(currentInfo.text)
        $('.zones__left__btn a').attr('href', currentInfo.link)

      }

      function setSlidesTitle() {
        var slides = $('.zones__carousel__item')
        for(var i = 0; i < slides.length - 1; i++) {
          var thisTitle = $(slides[i]).data('title')
          thisTitle = thisTitle.replace(' <br>', '')
          var thisTitleBlock = $(slides[i]).children('.zones__carousel__item__title')
          thisTitleBlock.html(thisTitle)

        }
      }


      $(window).resize(function() {
        setDesktopNavsContainerWidth()
      })

      var swiper = new Swiper('.zones__carousel__inner', {
        slidesPerView:  2,
        spaceBetween: 30,
        touchRatio: 0,
        breakpoints: {
          1200: {
            slidesPerView: 1,
            spaceBetween: 0,
            touchRatio: 2,
          }
        },
        on: {
          init: function() {
            setSlidesTitle()
            setSlideInfo($($('.zones__carousel__item')[0]).data('id'))
            setDesktopNavsContainerWidth()
          },
          slideChange: function() {
            setSlideInfo($(swiper.slides[swiper.realIndex]).data('id'))
          }
        }
      });

      $('.zones__carousel__mouse .is--left, .zones__carousel__controls button.is--prev').on('click', function() {
        swiper.slidePrev();
      })

      $('.zones__carousel__mouse .is--right, .zones__carousel__controls button.is--next').on('click', function() {
        swiper.slideNext();
      })

      $('#cz_target')
      .mousemove(function() {
        $('#zonescursor').addClass('is--visible')
      })
      .mouseleave(function() {
        $('#zonescursor').removeClass('is--visible')
      })

      $('.zones__carousel__mouse span.is--left').hover(function() {
        $('#zonescursor').addClass('is--left')
      }, function() {
        $('#zonescursor').removeClass('is--left')
      })

      document.addEventListener('mousemove', function(ev){
        if($('#zonescursor').length > 0) {
          document.getElementById('zonescursor').style.left = ev.clientX-42 + 'px';
          document.getElementById('zonescursor').style.top = ev.clientY-42 + 'px';       
        }
      },false);  

      $(window).scroll(function(e) {
        $('#zonescursor').removeClass('is--visible')
      })

    })
})(jQuery);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2cuanMiLCJkaXJlY3Rpb25zLmpzIiwibGF6eS5qcyIsIm1haW4uanMiLCJtYXAuanMiLCJtb2RhbHMuanMiLCJuYXZiYXIuanMiLCJwZXJzb25zLmpzIiwicHJlbG9hZGVyLmpzIiwic2VsZWN0LmpzIiwidGFibGUuanMiLCJ6b25lcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJCgnLmFydF9fY2Fyb3VzZWxfX2xpc3QnKS5zbGljayh7XHJcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5hcnRfX2Nhcm91c2VsX19jb250cm9scyBidXR0b24uaXMtLXByZXYnLFxyXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuYXJ0X19jYXJvdXNlbF9fY29udHJvbHMgYnV0dG9uLmlzLS1uZXh0J1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIHNldFNsaWRlSW5mbyhzbGlkZUlkKSB7XHJcblxyXG4gICAgICAgIHZhciBjdXJyZW50U2xpZGUgPSAkKCcuZGlyZWN0aW9uc19fY2VudGVyX19jYXJvdXNlbF9faXRlbVtkYXRhLWlkPVwiJyArIHNsaWRlSWQgKyAnXCJdJylbMF0sXHJcbiAgICAgICAgY3VycmVudEluZm8gPSB7XHJcbiAgICAgICAgICBpZDogc2xpZGVJZCxcclxuICAgICAgICAgIHRpdGxlOiAkKGN1cnJlbnRTbGlkZSkuZGF0YSgndGl0bGUnKSxcclxuICAgICAgICAgIHRleHQ6ICQoY3VycmVudFNsaWRlKS5kYXRhKCd0ZXh0JyksXHJcbiAgICAgICAgICBsaW5rOiAkKGN1cnJlbnRTbGlkZSkuZGF0YSgnbGluaycpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCcuZGlyZWN0aW9uc19fcmlnaHRfX2hlYWRpbmcnKS5odG1sKGN1cnJlbnRJbmZvLnRpdGxlKVxyXG4gICAgICAgICQoJy5kaXJlY3Rpb25zX19yaWdodF9fdGV4dCcpLmh0bWwoY3VycmVudEluZm8udGV4dClcclxuICAgICAgICAkKCcuZGlyZWN0aW9uc19fcmlnaHRfX2J0biBhJykuYXR0cignaHJlZicsIGN1cnJlbnRJbmZvLmxpbmspXHJcblxyXG4gICAgICAgICQoJy5kaXJlY3Rpb25zX19tZW51IHVsIGxpJykucmVtb3ZlQ2xhc3MoJ2lzLS1hY3RpdmUnKVxyXG4gICAgICAgICQoJy5kaXJlY3Rpb25zX19tZW51IHVsIGxpW2RhdGEtaWQ9XCInICsgY3VycmVudEluZm8uaWQgKyAnXCJdJykuYWRkQ2xhc3MoJ2lzLS1hY3RpdmUnKVxyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gc2V0U2xpZGUoc2xpZGVJZCkge1xyXG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHNsaWRlSWQgKyAxKVxyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgc3dpcGVyID0gbmV3IFN3aXBlcignLmRpcmVjdGlvbnNfX2NlbnRlcl9faW5uZXInLCB7XHJcbiAgICAgICAgc3BhY2VCZXR3ZWVuOiAzMCxcclxuICAgICAgICBzbGlkZXNQZXJWaWV3OiAgMixcclxuICAgICAgICBlZmZlY3Q6ICdmYWRlJyxcclxuICAgICAgICBsb29wOiB0cnVlLFxyXG4gICAgICAgIHRvdWNoUmF0aW86IDAsXHJcbiAgICAgICAgb246IHtcclxuICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzZXRTbGlkZUluZm8oMClcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBzbGlkZUNoYW5nZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldFNsaWRlSW5mbyh0aGlzLnJlYWxJbmRleClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgJCgnLmRpcmVjdGlvbnNfX21lbnUgdWwgbGkgc3BhbicpLm9uKCdjbGljayB0b3VjaGVuZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciB0aGlzSWQgPSAkKHRoaXMpLnBhcmVudCgnbGknKS5kYXRhKCdpZCcpXHJcbiAgICAgICAgc2V0U2xpZGUodGhpc0lkKVxyXG4gICAgICB9KVxyXG5cclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7IiwibGF6eUxvYWRJbWFnZXMoKTtcclxuXHJcbmZ1bmN0aW9uIGxhenlMb2FkSW1hZ2VzKCkge1xyXG4gICAgdmFyIGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5sYXp5Jyk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGltYWdlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGltYWdlc1tpXS5zcmMgPSBpbWFnZXNbaV0uZGF0YXNldC5zcmM7XHJcbiAgICAgICAgaW1hZ2VzW2ldLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1zcmMnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgc3ZnNGV2ZXJ5Ym9keSgpXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldFBhZGRpbmdzKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSB7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nTGVmdDogJy5pcy0tYy1wbCcsXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6ICcuaXMtLWMtcHInLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0MTAwUGVyOiAnLmlzLS1oMTAwJ1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgcGFkZGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ25hdmJhcl9faW5uZXInKVswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxyXG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gJCgnLm5hdmJhcicpLmlubmVySGVpZ2h0KCkgKyAkKCcuZm9vdGVyJykuaW5uZXJIZWlnaHQoKVxyXG5cclxuICAgICAgICAgICAgJChjbGFzc2VzLnBhZGRpbmdMZWZ0KS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZ0xlZnQ6IHBhZGRpbmcubGVmdCArIDMwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICQoY2xhc3Nlcy5wYWRkaW5nUmlnaHQpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHBhZGRpbmcubGVmdCArIDMwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICQoY2xhc3Nlcy5oZWlnaHQxMDBQZXIpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBtaW5IZWlnaHQ6ICdjYWxjKDEwMHZoIC0gJyArIGhlaWdodCArICdweCknXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICQoJ21haW4nKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgbWluSGVpZ2h0OiAnY2FsYygxMDB2aCAtICcgKyBoZWlnaHQgKyAncHgpJ1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFBhZGRpbmdzKClcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0UGFkZGluZ3MoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJ2Zvcm0nKS5wYXJzbGV5KClcclxuXHJcbiAgICAgICAgdmFyIHBob25lSW5wdXRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW5wdXQtcGhvbmUnKTtcclxuXHJcbiAgICAgICAgaWYocGhvbmVJbnB1dHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBwaG9uZUlucHV0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbmV3IElNYXNrKFxyXG4gICAgICAgICAgICAgICAgICAgIHBob25lSW5wdXRzW2ldLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJyt7N30oOTAwKTAwMC0wMC0wMCdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCcuYm9keS1tYXBfX3JpZ2h0X19pbm5lcicpLnN0aWNreSh7XHJcbiAgICAgICAgICAgIHRvcFNwYWNpbmc6IDEwMCxcclxuICAgICAgICAgICAgcmVzcG9uc2l2ZVdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICBib3R0b21TcGFjaW5nOiAkKCcuZm9vdGVyJykuaW5uZXJIZWlnaHQoKSArIDEwMFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcuYW5jaG9yJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9ICQodGhpcylcclxuICAgICAgICAgICAgdmFyIGFpZCA9IF90aGlzLmF0dHIoXCJocmVmXCIpO1xyXG4gICAgICAgICAgICBpZighYWlkKSB7XHJcbiAgICAgICAgICAgICAgICBhaWQgPSBfdGhpcy5kYXRhKCd0YXJnZXQnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoJ2h0bWwsYm9keScpLmFuaW1hdGUoe3Njcm9sbFRvcDogJChhaWQpLm9mZnNldCgpLnRvcCAtICQoJy5uYXZiYXInKS5pbm5lckhlaWdodCgpfSwnc2xvdycpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiLCJ5bWFwcy5yZWFkeShpbml0KTtcclxuXHJcbmZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICBpZigkKCcjbWFwJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHZhciBteU1hcCA9IG5ldyB5bWFwcy5NYXAoXCJtYXBcIiwge1xyXG4gICAgICAgICAgICBjZW50ZXI6IFs1Mi45NzEyMzMsIDM2LjA1NDEwMF0sXHJcbiAgICAgICAgICAgIHpvb206IDE3LFxyXG4gICAgICAgICAgICBjb250cm9sczogW11cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIHNlYXJjaENvbnRyb2xQcm92aWRlcjogJ3lhbmRleCNzZWFyY2gnXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgbXlNYXAuZ2VvT2JqZWN0c1xyXG4gICAgICAgICAgICAuYWRkKG5ldyB5bWFwcy5QbGFjZW1hcmsoWzUyLjk3MTIzMywgMzYuMDU0MTAwXSwge1xyXG4gICAgICAgICAgICAgICAgYmFsbG9vbkNvbnRlbnQ6ICfQpNC40YLQvdC10YEg0JrQu9GD0LEgPHN0cm9uZz7QodC40YHRgtC10LzQsCDQmtC+0LzQv9C70LXQutGBPC9zdHJvbmc+J1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBwcmVzZXQ6ICdpc2xhbmRzI3JlZFNwb3J0SWNvbidcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgfVxyXG59XHJcbiIsImZ1bmN0aW9uIG9wZW5Nb2RhbChtb2RhbElEKSB7XHJcbiAgICAkKG1vZGFsSUQpLm1vZGFsKHtcclxuICAgICAgICBmYWRlRHVyYXRpb246IDEwMCxcclxuICAgICAgICBzaG93Q2xvc2U6IGZhbHNlLFxyXG4gICAgfSlcclxufVxyXG5cclxuKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAkLm1vZGFsLmZhZGVEdXJhdGlvbiA9IDEwMFxyXG4gICAgICAgICQubW9kYWwuc2hvd0Nsb3NlID0gZmFsc2VcclxuXHJcbiAgICAgICAgJCgnYS5tb2RhbC1vcGVuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgdmFyIHRoaXNNb2RhbElkID0gJCh0aGlzKS5hdHRyKCdocmVmJylcclxuICAgICAgICAgICAgb3Blbk1vZGFsKHRoaXNNb2RhbElkKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8gb3Blbk1vZGFsKCcjbW9kYWxfaWNlJylcclxuICAgICAgICAvLyBvcGVuTW9kYWwoJyNtb2RhbF9mb3JtJylcclxuICAgICAgICAvLyBvcGVuTW9kYWwoJyNtb2RhbF9zdWNjZXNzJylcclxuICAgICAgICAvLyBvcGVuTW9kYWwoJyNtb2RhbF90YWJsZScpXHJcbiAgICAgICAgLy8gb3Blbk1vZGFsKCcjbW9kYWxfdHJhaW5lcicpXHJcbiAgICAgICAgLy8gb3Blbk1vZGFsKCcjbW9kYWxfY2FyZCcpXHJcbiAgICAgICAgLy8gb3Blbk1vZGFsKCcjbW9kYWxfYXBwYXJhdHVzJylcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdmFyIG1lbnVPcGVuID0gZmFsc2VcclxuICAgICAgICB2YXIgaXNOYXZiYXJUcmFuc3BhcmVudCA9ICQoJy5uYXZiYXIuaXMtLXRyYW5zcGFyZW50JylcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0Qm9keVBhZGRpbmcoKSB7XHJcbiAgICAgICAgICAgIHZhciBwdCA9ICQoJy5uYXZiYXInKS5pbm5lckhlaWdodCgpXHJcbiAgICAgICAgICAgICQoJ2JvZHkuaXMtLXB0JykuY3NzKHtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmdUb3A6IHB0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRCb2R5UGFkZGluZygpXHJcblxyXG4gICAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldEJvZHlQYWRkaW5nKClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvcGVuTWVudSgpIHtcclxuICAgICAgICAgICAgb3Blbk92ZXJsYXkoKVxyXG4gICAgICAgICAgICAkKCcubmF2YmFyX19iYXInKS5mb2N1cygpXHJcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKCcubmF2YmFyX19iYXInLCAxLjUsIHtcclxuICAgICAgICAgICAgICAgIGVhc2U6IEVsYXN0aWMuZWFzZU91dC5jb25maWcoMSwgMC43NSksXHJcbiAgICAgICAgICAgICAgICB4OiBcIjAlXCIsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIFR3ZWVuTWF4LnN0YWdnZXJGcm9tKCcubmF2YmFyX19iYXJfX21lbnUgdWwgbGknLCAxLCB7XHJcbiAgICAgICAgICAgICAgICB4OiBcIi0xMDAlXCIsIFxyXG4gICAgICAgICAgICAgICAgYXV0b0FscGhhOjAsIFxyXG4gICAgICAgICAgICAgICAgcm90YXRpb25ZOlwiMTgwXCIsIFxyXG4gICAgICAgICAgICAgICAgcGVyc3BlY3RpdmU6NjAwLCBcclxuICAgICAgICAgICAgICAgIGVhc2U6IFBvd2VyMi5lYXNlT3V0LFxyXG4gICAgICAgICAgICAgICAgZGVsYXk6IDAuMlxyXG4gICAgICAgICAgICB9LCAuMSlcclxuICAgICAgICAgICAgVHdlZW5NYXguc3RhZ2dlckZyb20oJy5uYXZiYXJfX2Jhcl9fc29jIC5zb2NpYWwgdWwgbGknLCAwLjcsIHtcclxuICAgICAgICAgICAgICAgIHk6IDEwMCxcclxuICAgICAgICAgICAgICAgIGVhc2U6IEVsYXN0aWMuZWFzZU91dC5jb25maWcoMSwgMC43NSksXHJcbiAgICAgICAgICAgICAgICBkZWxheTogLjUsXHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgICAgICAgIH0sIC4xLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIG1lbnVPcGVuID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgJCgnLm5hdmJhcl9fYmFyX19pbm5lcicpLmFkZENsYXNzKCdpcy0tY29tcCcpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjbG9zZU1lbnUoKSB7XHJcbiAgICAgICAgICAgIGlmKG1lbnVPcGVuKSB7XHJcbiAgICAgICAgICAgICAgICBUd2Vlbk1heC50bygnLm5hdmJhcl9fYmFyJywgMS41LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWFzZTogRWxhc3RpYy5lYXNlT3V0LmNvbmZpZygxLCAyKSxcclxuICAgICAgICAgICAgICAgICAgICB4OiBcIi0xMDAlXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgY2xvc2VPdmVybGF5KClcclxuICAgICAgICAgICAgICAgICQoJy5uYXZiYXJfX2Jhcl9faW5uZXInKS5yZW1vdmVDbGFzcygnaXMtLWNvbXAnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1lbnVPcGVuID0gZmFsc2VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9wZW5PdmVybGF5KCkge1xyXG4gICAgICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2lzLS1vdmVybGF5JylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNsb3NlT3ZlcmxheSgpIHtcclxuICAgICAgICAgICAgaWYobWVudU9wZW4pIHtcclxuICAgICAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaXMtLW92ZXJsYXknKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjbG9zZUFsbCgpIHtcclxuICAgICAgICAgICAgY2xvc2VNZW51KClcclxuICAgICAgICAgICAgY2xvc2VPdmVybGF5KClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldERhcmtOYXZiYXIoKVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXREYXJrTmF2YmFyKCkge1xyXG5cclxuICAgICAgICAgICAgaWYoJChkb2N1bWVudCkuc2Nyb2xsVG9wKCkgPiA1MCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLm5hdmJhcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtLXRyYW5zcGFyZW50JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy0tZGVmYXVsdCcpXHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmKGlzTmF2YmFyVHJhbnNwYXJlbnQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5uYXZiYXInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLS1kZWZhdWx0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy0tdHJhbnNwYXJlbnQnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzZXREYXJrTmF2YmFyKClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKCcubmF2YmFyX19tZW51IGJ1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBvcGVuTWVudSgpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnLm5hdmJhcl9fYmFyX190b3BfX2Nsb3NlIGJ1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjbG9zZU1lbnUoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJyNvdmVybGF5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNsb3NlQWxsKClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5rZXlkb3duKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUua2V5ID09PSBcIkVzY2FwZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZU1lbnUoKVxyXG4gICAgICAgICAgIH1cclxuICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLmJhbm5lcl9fY2Fyb3VzZWxfX2l0ZW0gaW1nXCIpLm1vdXNlZG93bihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIuYm9keS1tYXBfX3JpZ2h0X19wZXJzb25zX19saXN0IGltZ1wiKS5tb3VzZWRvd24oZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2YXIgaW1hZ2VzID0gJCgnLmJhbm5lcl9fY2Fyb3VzZWxfX2l0ZW0nKSxcclxuICAgICAgICAgICAgY3VycmVudFNsaWRlID0gMCxcclxuICAgICAgICAgICAgY291bnRTbGlkZXMgPSBpbWFnZXMubGVuZ3RoLFxyXG4gICAgICAgICAgICBzbGlkZXNJbnRlcnZhbCA9IDQuNVxyXG5cclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgaW1hZ2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKGkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBUd2Vlbk1heC50byhpbWFnZXMsIHNsaWRlc0ludGVydmFsLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWFzZTogRXhwby5lYXNlT3V0LFxyXG4gICAgICAgICAgICAgICAgICAgIHg6IFwiMTAwJVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFR3ZWVuTWF4LnRvKGltYWdlc1tjdXJyZW50U2xpZGVdLCBzbGlkZXNJbnRlcnZhbCwge1xyXG4gICAgICAgICAgICBlYXNlOiBFeHBvLmVhc2VPdXQsXHJcbiAgICAgICAgICAgIHg6IFwiMCVcIixcclxuICAgICAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGN1cnJlbnRTbGlkZSsrXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNoYW5nZVNsaWRlcygpIHtcclxuICAgICAgICAgICAgVHdlZW5NYXgudG8oaW1hZ2VzLCBzbGlkZXNJbnRlcnZhbCwge1xyXG4gICAgICAgICAgICAgICAgZWFzZTogRXhwby5lYXNlT3V0LFxyXG4gICAgICAgICAgICAgICAgeDogXCIxMDAlXCIsXHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKGltYWdlc1tjdXJyZW50U2xpZGVdLCBzbGlkZXNJbnRlcnZhbCwge1xyXG4gICAgICAgICAgICAgICAgZWFzZTogRXhwby5lYXNlT3V0LFxyXG4gICAgICAgICAgICAgICAgeDogXCIwJVwiLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjdXJyZW50U2xpZGUrKztcclxuICAgICAgICAgICAgaWYoY3VycmVudFNsaWRlID49IGNvdW50U2xpZGVzKSBjdXJyZW50U2xpZGUgPSAwXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY2hhbmdlU2xpZGVzKClcclxuICAgICAgICB9LCA2MDAwKVxyXG5cclxuICAgICAgICAkKCcuYmFubmVyX19sZWZ0X19zY3JvbGwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY2hhbmdlU2xpZGVzKClcclxuICAgICAgICB9KVxyXG5cclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXIgY3VycmVudFNleCA9ICQoJCgnLnBlcnNvbicpWzBdKS5kYXRhKCdzZXgnKSxcclxuICAgICAgICAgICAgY3VycmVudFBvcyA9ICdmcm9udCdcclxuICAgICAgICBcclxuICAgICAgICBzZXRQb3MoY3VycmVudFBvcylcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0UG9zKHBvcykge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJCgnLnBlcnNvbicpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBcIm5vbmVcIlxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgJCgnLnBlcnNvbltkYXRhLXBvcz1cIicgKyBwb3MgKyAnXCJdJykuY3NzKHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiYmxvY2tcIlxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgY3VycmVudFBvcyA9IHBvc1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJy5ib2R5LW1hcF9fcmlnaHRfX2NvbnRyb2xzIGJ1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBpZihjdXJyZW50UG9zID09ICdmcm9udCcpIGN1cnJlbnRQb3MgPSAnYmFjaydcclxuICAgICAgICAgICAgZWxzZSBpZihjdXJyZW50UG9zID09ICdiYWNrJykgY3VycmVudFBvcyA9ICdmcm9udCdcclxuXHJcbiAgICAgICAgICAgIHNldFBvcyhjdXJyZW50UG9zKVxyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKCcjYm1pbnB1dCcpLmVkaXRhYmxlU2VsZWN0KHtcclxuICAgICAgICAgICAgZWZmZWN0czogJ2RlZmF1bHQnLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgcGxjID0gJCgnI2JtaW5wdXQnKS5kYXRhKCdwbGFjZWhvbGRlcicpXHJcbiAgICAgICAgICAgICQoJyNibWlucHV0JykuYXR0cigncGxhY2Vob2xkZXInLCBwbGMpXHJcbiAgICAgICAgfSwgMTAwMClcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmVsb2FkZXInKS5jbGFzc0xpc3QuYWRkKCdpcy0tZmluaXNoZWQnKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZSA9IGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lLnJlcGxhY2UoXCJpcy0tcHJlbG9hZGVyXCIsXCJcIik7XHJcbiAgICB9LCAxMDAwKVxyXG59KTsiLCIgICAgICAgIHZhciBfY2xhc3NlcyA9IHtcclxuICAgICAgICAgICAgb3BlbjogXCJpcy0tb3BlblwiXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvcGVuRHJvcGRvd24oY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgICQoY29udGFpbmVyKS5hZGRDbGFzcygnaXMtLW9wZW4nKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2xvc2VEcm9wZG93bigpIHtcclxuICAgICAgICAgICAgJCgnLnNlbGVjdCcpLnJlbW92ZUNsYXNzKF9jbGFzc2VzLm9wZW4pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB0b2dnbGVEcm9wZG93bihjb250YWluZXIpIHtcclxuICAgICAgICAgICAgaWYoJChjb250YWluZXIpLmhhc0NsYXNzKF9jbGFzc2VzLm9wZW4pKSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZURyb3Bkb3duKClcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3BlbkRyb3Bkb3duKGNvbnRhaW5lcilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0cyA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5zZWxlY3QnKVxyXG4gICAgICAgICAgICBpZih0YXJnZXRzLmxlbmd0aCA8PSAwKSBjbG9zZURyb3Bkb3duKClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZWxlY3RJdGVtKGl0ZW0pIHtcclxuICAgICAgICAgICAgY2xvc2VEcm9wZG93bigpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCcuc2VsZWN0X19sYWJlbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhpc0NvbnRhaW5lciA9ICQodGhpcykucGFyZW50KCcuc2VsZWN0JylcclxuICAgICAgICAgICAgdG9nZ2xlRHJvcGRvd24odGhpc0NvbnRhaW5lcilcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnLnNlbGVjdF9fZHJvcGRvd24gdWwgbGknKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHRoaXNUZXh0ID0gJCh0aGlzKS5odG1sKClcclxuICAgICAgICAgICAgdmFyIHRoaXNWYWx1ZSA9ICQodGhpcykuZGF0YSgndmFsJylcclxuXHJcbiAgICAgICAgICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkuc2libGluZ3MoJ2lucHV0JykudmFsKHRoaXNWYWx1ZSlcclxuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5zaWJsaW5ncygnLnNlbGVjdF9fbGFiZWwnKS5odG1sKHRoaXNUZXh0KVxyXG4gICAgICAgICAgICBzZWxlY3RJdGVtKHRoaXNUZXh0KVxyXG4gICAgICAgIH0pOyIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJCgnLnRhYmxlX19saXN0X19pdGVtcycpLnNsaWNrKHtcclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA3LFxyXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcudGFibGVfX2NvbnRyb2xzIGJ1dHRvbi5pcy0tcHJldicsXHJcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy50YWJsZV9fY29udHJvbHMgYnV0dG9uLmlzLS1uZXh0JyxcclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDcsXHJcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxNjAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDZcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDE0NDAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogNVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTIwMCxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAzXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjgsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDQwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICBmdW5jdGlvbiBzZXREZXNrdG9wTmF2c0NvbnRhaW5lcldpZHRoKCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgaXRlbVdpZHRoID0gJCgnLnpvbmVzX19jYXJvdXNlbF9faXRlbS5zd2lwZXItc2xpZGUnKS5jc3MoJ3dpZHRoJylcclxuICAgICAgICAgICQoJy56b25lc19fY2Fyb3VzZWxfX21vdXNlJykuY3NzKHtcclxuICAgICAgICAgICAgbWF4V2lkdGg6IGl0ZW1XaWR0aFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LCAxNTApXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBzZXREZXNrdG9wTmF2c0NvbnRhaW5lcldpZHRoKClcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIHNldFNsaWRlSW5mbyhzbGlkZUlkKSB7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRTbGlkZSA9ICQoJy56b25lc19fY2Fyb3VzZWxfX2l0ZW1bZGF0YS1pZD1cIicgKyBzbGlkZUlkICsgJ1wiXScpWzBdLFxyXG4gICAgICAgICAgICBjdXJyZW50SW5mbyA9IHtcclxuICAgICAgICAgICAgICBpZDogc2xpZGVJZCxcclxuICAgICAgICAgICAgICB0aXRsZTogJChjdXJyZW50U2xpZGUpLmRhdGEoJ3RpdGxlJyksXHJcbiAgICAgICAgICAgICAgdGV4dDogJChjdXJyZW50U2xpZGUpLmRhdGEoJ3RleHQnKSxcclxuICAgICAgICAgICAgICBsaW5rOiAkKGN1cnJlbnRTbGlkZSkuZGF0YSgnbGluaycpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAkKCcuem9uZXNfX2xlZnRfX2hlYWRpbmcnKS5odG1sKGN1cnJlbnRJbmZvLnRpdGxlKVxyXG4gICAgICAgICQoJy56b25lc19fbGVmdF9fY29udGVudCcpLmh0bWwoY3VycmVudEluZm8udGV4dClcclxuICAgICAgICAkKCcuem9uZXNfX2xlZnRfX2J0biBhJykuYXR0cignaHJlZicsIGN1cnJlbnRJbmZvLmxpbmspXHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBzZXRTbGlkZXNUaXRsZSgpIHtcclxuICAgICAgICB2YXIgc2xpZGVzID0gJCgnLnpvbmVzX19jYXJvdXNlbF9faXRlbScpXHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgIHZhciB0aGlzVGl0bGUgPSAkKHNsaWRlc1tpXSkuZGF0YSgndGl0bGUnKVxyXG4gICAgICAgICAgdGhpc1RpdGxlID0gdGhpc1RpdGxlLnJlcGxhY2UoJyA8YnI+JywgJycpXHJcbiAgICAgICAgICB2YXIgdGhpc1RpdGxlQmxvY2sgPSAkKHNsaWRlc1tpXSkuY2hpbGRyZW4oJy56b25lc19fY2Fyb3VzZWxfX2l0ZW1fX3RpdGxlJylcclxuICAgICAgICAgIHRoaXNUaXRsZUJsb2NrLmh0bWwodGhpc1RpdGxlKVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNldERlc2t0b3BOYXZzQ29udGFpbmVyV2lkdGgoKVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgdmFyIHN3aXBlciA9IG5ldyBTd2lwZXIoJy56b25lc19fY2Fyb3VzZWxfX2lubmVyJywge1xyXG4gICAgICAgIHNsaWRlc1BlclZpZXc6ICAyLFxyXG4gICAgICAgIHNwYWNlQmV0d2VlbjogMzAsXHJcbiAgICAgICAgdG91Y2hSYXRpbzogMCxcclxuICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgMTIwMDoge1xyXG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxyXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDAsXHJcbiAgICAgICAgICAgIHRvdWNoUmF0aW86IDIsXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbjoge1xyXG4gICAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldFNsaWRlc1RpdGxlKClcclxuICAgICAgICAgICAgc2V0U2xpZGVJbmZvKCQoJCgnLnpvbmVzX19jYXJvdXNlbF9faXRlbScpWzBdKS5kYXRhKCdpZCcpKVxyXG4gICAgICAgICAgICBzZXREZXNrdG9wTmF2c0NvbnRhaW5lcldpZHRoKClcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBzbGlkZUNoYW5nZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldFNsaWRlSW5mbygkKHN3aXBlci5zbGlkZXNbc3dpcGVyLnJlYWxJbmRleF0pLmRhdGEoJ2lkJykpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgICQoJy56b25lc19fY2Fyb3VzZWxfX21vdXNlIC5pcy0tbGVmdCwgLnpvbmVzX19jYXJvdXNlbF9fY29udHJvbHMgYnV0dG9uLmlzLS1wcmV2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc3dpcGVyLnNsaWRlUHJldigpO1xyXG4gICAgICB9KVxyXG5cclxuICAgICAgJCgnLnpvbmVzX19jYXJvdXNlbF9fbW91c2UgLmlzLS1yaWdodCwgLnpvbmVzX19jYXJvdXNlbF9fY29udHJvbHMgYnV0dG9uLmlzLS1uZXh0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc3dpcGVyLnNsaWRlTmV4dCgpO1xyXG4gICAgICB9KVxyXG5cclxuICAgICAgJCgnI2N6X3RhcmdldCcpXHJcbiAgICAgIC5tb3VzZW1vdmUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnI3pvbmVzY3Vyc29yJykuYWRkQ2xhc3MoJ2lzLS12aXNpYmxlJylcclxuICAgICAgfSlcclxuICAgICAgLm1vdXNlbGVhdmUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnI3pvbmVzY3Vyc29yJykucmVtb3ZlQ2xhc3MoJ2lzLS12aXNpYmxlJylcclxuICAgICAgfSlcclxuXHJcbiAgICAgICQoJy56b25lc19fY2Fyb3VzZWxfX21vdXNlIHNwYW4uaXMtLWxlZnQnKS5ob3ZlcihmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcjem9uZXNjdXJzb3InKS5hZGRDbGFzcygnaXMtLWxlZnQnKVxyXG4gICAgICB9LCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcjem9uZXNjdXJzb3InKS5yZW1vdmVDbGFzcygnaXMtLWxlZnQnKVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZnVuY3Rpb24oZXYpe1xyXG4gICAgICAgIGlmKCQoJyN6b25lc2N1cnNvcicpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd6b25lc2N1cnNvcicpLnN0eWxlLmxlZnQgPSBldi5jbGllbnRYLTQyICsgJ3B4JztcclxuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd6b25lc2N1cnNvcicpLnN0eWxlLnRvcCA9IGV2LmNsaWVudFktNDIgKyAncHgnOyAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgIH0sZmFsc2UpOyAgXHJcblxyXG4gICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAkKCcjem9uZXNjdXJzb3InKS5yZW1vdmVDbGFzcygnaXMtLXZpc2libGUnKVxyXG4gICAgICB9KVxyXG5cclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7Il19
