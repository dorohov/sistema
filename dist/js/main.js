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
(function($) {
    "use strict"
    $(function() {

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
            alert('Вы выбрали: ' + item)
            closeDropdown()
        }

        $('.select__label').on('click', function() {
            var thisContainer = $(this).parent('.select')
            toggleDropdown(thisContainer)
        })

        $('.select__dropdown ul li').on('click', function() {
            var thisText = $(this).html()
            selectItem(thisText)
        })

    })
})(jQuery);
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
        }, 10)
      }

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

      setDesktopNavsContainerWidth()

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
            setSlideInfo(0)
          },
          slideChange: function() {
            setSlideInfo(swiper.activeIndex)
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2cuanMiLCJkaXJlY3Rpb25zLmpzIiwibGF6eS5qcyIsIm1haW4uanMiLCJtYXAuanMiLCJtb2RhbHMuanMiLCJuYXZiYXIuanMiLCJwZXJzb25zLmpzIiwic2VsZWN0LmpzIiwidGFibGUuanMiLCJ6b25lcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJCgnLmFydF9fY2Fyb3VzZWxfX2xpc3QnKS5zbGljayh7XHJcbiAgICAgICAgICAgIHByZXZBcnJvdzogJy5hcnRfX2Nhcm91c2VsX19jb250cm9scyBidXR0b24uaXMtLXByZXYnLFxyXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcuYXJ0X19jYXJvdXNlbF9fY29udHJvbHMgYnV0dG9uLmlzLS1uZXh0J1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIHNldFNsaWRlSW5mbyhzbGlkZUlkKSB7XHJcblxyXG4gICAgICAgIHZhciBjdXJyZW50U2xpZGUgPSAkKCcuZGlyZWN0aW9uc19fY2VudGVyX19jYXJvdXNlbF9faXRlbVtkYXRhLWlkPVwiJyArIHNsaWRlSWQgKyAnXCJdJylbMF0sXHJcbiAgICAgICAgY3VycmVudEluZm8gPSB7XHJcbiAgICAgICAgICBpZDogc2xpZGVJZCxcclxuICAgICAgICAgIHRpdGxlOiAkKGN1cnJlbnRTbGlkZSkuZGF0YSgndGl0bGUnKSxcclxuICAgICAgICAgIHRleHQ6ICQoY3VycmVudFNsaWRlKS5kYXRhKCd0ZXh0JyksXHJcbiAgICAgICAgICBsaW5rOiAkKGN1cnJlbnRTbGlkZSkuZGF0YSgnbGluaycpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCcuZGlyZWN0aW9uc19fcmlnaHRfX2hlYWRpbmcnKS5odG1sKGN1cnJlbnRJbmZvLnRpdGxlKVxyXG4gICAgICAgICQoJy5kaXJlY3Rpb25zX19yaWdodF9fdGV4dCcpLmh0bWwoY3VycmVudEluZm8udGV4dClcclxuICAgICAgICAkKCcuZGlyZWN0aW9uc19fcmlnaHRfX2J0biBhJykuYXR0cignaHJlZicsIGN1cnJlbnRJbmZvLmxpbmspXHJcblxyXG4gICAgICAgICQoJy5kaXJlY3Rpb25zX19tZW51IHVsIGxpJykucmVtb3ZlQ2xhc3MoJ2lzLS1hY3RpdmUnKVxyXG4gICAgICAgICQoJy5kaXJlY3Rpb25zX19tZW51IHVsIGxpW2RhdGEtaWQ9XCInICsgY3VycmVudEluZm8uaWQgKyAnXCJdJykuYWRkQ2xhc3MoJ2lzLS1hY3RpdmUnKVxyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gc2V0U2xpZGUoc2xpZGVJZCkge1xyXG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHNsaWRlSWQgKyAxKVxyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgc3dpcGVyID0gbmV3IFN3aXBlcignLmRpcmVjdGlvbnNfX2NlbnRlcl9faW5uZXInLCB7XHJcbiAgICAgICAgc3BhY2VCZXR3ZWVuOiAzMCxcclxuICAgICAgICBzbGlkZXNQZXJWaWV3OiAgMixcclxuICAgICAgICBlZmZlY3Q6ICdmYWRlJyxcclxuICAgICAgICBsb29wOiB0cnVlLFxyXG4gICAgICAgIHRvdWNoUmF0aW86IDAsXHJcbiAgICAgICAgb246IHtcclxuICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzZXRTbGlkZUluZm8oMClcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBzbGlkZUNoYW5nZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldFNsaWRlSW5mbyh0aGlzLnJlYWxJbmRleClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgJCgnLmRpcmVjdGlvbnNfX21lbnUgdWwgbGkgc3BhbicpLm9uKCdjbGljayB0b3VjaGVuZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciB0aGlzSWQgPSAkKHRoaXMpLnBhcmVudCgnbGknKS5kYXRhKCdpZCcpXHJcbiAgICAgICAgc2V0U2xpZGUodGhpc0lkKVxyXG4gICAgICB9KVxyXG5cclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7IiwibGF6eUxvYWRJbWFnZXMoKTtcclxuXHJcbmZ1bmN0aW9uIGxhenlMb2FkSW1hZ2VzKCkge1xyXG4gICAgdmFyIGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5sYXp5Jyk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGltYWdlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGltYWdlc1tpXS5zcmMgPSBpbWFnZXNbaV0uZGF0YXNldC5zcmM7XHJcbiAgICAgICAgaW1hZ2VzW2ldLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1zcmMnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgc3ZnNGV2ZXJ5Ym9keSgpXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldFBhZGRpbmdzKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSB7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nTGVmdDogJy5pcy0tYy1wbCcsXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6ICcuaXMtLWMtcHInLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0MTAwUGVyOiAnLmlzLS1oMTAwJ1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgcGFkZGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ25hdmJhcl9faW5uZXInKVswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxyXG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gJCgnLm5hdmJhcicpLmlubmVySGVpZ2h0KCkgKyAkKCcuZm9vdGVyJykuaW5uZXJIZWlnaHQoKVxyXG5cclxuICAgICAgICAgICAgJChjbGFzc2VzLnBhZGRpbmdMZWZ0KS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZ0xlZnQ6IHBhZGRpbmcubGVmdCArIDMwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICQoY2xhc3Nlcy5wYWRkaW5nUmlnaHQpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHBhZGRpbmcubGVmdCArIDMwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICQoY2xhc3Nlcy5oZWlnaHQxMDBQZXIpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBtaW5IZWlnaHQ6ICdjYWxjKDEwMHZoIC0gJyArIGhlaWdodCArICdweCknXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICQoJ21haW4nKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgbWluSGVpZ2h0OiAnY2FsYygxMDB2aCAtICcgKyBoZWlnaHQgKyAncHgpJ1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFBhZGRpbmdzKClcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0UGFkZGluZ3MoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJ2Zvcm0nKS5wYXJzbGV5KClcclxuXHJcbiAgICAgICAgdmFyIHBob25lSW5wdXRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW5wdXQtcGhvbmUnKTtcclxuXHJcbiAgICAgICAgaWYocGhvbmVJbnB1dHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBwaG9uZUlucHV0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbmV3IElNYXNrKFxyXG4gICAgICAgICAgICAgICAgICAgIHBob25lSW5wdXRzW2ldLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFzazogJyt7N30oOTAwKTAwMC0wMC0wMCdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCcuYm9keS1tYXBfX3JpZ2h0X19pbm5lcicpLnN0aWNreSh7XHJcbiAgICAgICAgICAgIHRvcFNwYWNpbmc6IDEwMCxcclxuICAgICAgICAgICAgcmVzcG9uc2l2ZVdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICBib3R0b21TcGFjaW5nOiAkKCcuZm9vdGVyJykuaW5uZXJIZWlnaHQoKSArIDEwMFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7IiwieW1hcHMucmVhZHkoaW5pdCk7XHJcblxyXG5mdW5jdGlvbiBpbml0KCkge1xyXG4gICAgaWYoJCgnI21hcCcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB2YXIgbXlNYXAgPSBuZXcgeW1hcHMuTWFwKFwibWFwXCIsIHtcclxuICAgICAgICAgICAgY2VudGVyOiBbNTIuOTcxMjMzLCAzNi4wNTQxMDBdLFxyXG4gICAgICAgICAgICB6b29tOiAxNyxcclxuICAgICAgICAgICAgY29udHJvbHM6IFtdXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBzZWFyY2hDb250cm9sUHJvdmlkZXI6ICd5YW5kZXgjc2VhcmNoJ1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIG15TWFwLmdlb09iamVjdHNcclxuICAgICAgICAgICAgLmFkZChuZXcgeW1hcHMuUGxhY2VtYXJrKFs1Mi45NzEyMzMsIDM2LjA1NDEwMF0sIHtcclxuICAgICAgICAgICAgICAgIGJhbGxvb25Db250ZW50OiAn0KTQuNGC0L3QtdGBINCa0LvRg9CxIDxzdHJvbmc+0KHQuNGB0YLQtdC80LAg0JrQvtC80L/Qu9C10LrRgTwvc3Ryb25nPidcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgcHJlc2V0OiAnaXNsYW5kcyNyZWRTcG9ydEljb24nXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgIH1cclxufVxyXG4iLCJmdW5jdGlvbiBvcGVuTW9kYWwobW9kYWxJRCkge1xyXG4gICAgJChtb2RhbElEKS5tb2RhbCh7XHJcbiAgICAgICAgZmFkZUR1cmF0aW9uOiAxMDAsXHJcbiAgICAgICAgc2hvd0Nsb3NlOiBmYWxzZSxcclxuICAgIH0pXHJcbn1cclxuXHJcbihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJC5tb2RhbC5mYWRlRHVyYXRpb24gPSAxMDBcclxuICAgICAgICAkLm1vZGFsLnNob3dDbG9zZSA9IGZhbHNlXHJcblxyXG4gICAgICAgICQoJ2EubW9kYWwtb3BlbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgIHZhciB0aGlzTW9kYWxJZCA9ICQodGhpcykuYXR0cignaHJlZicpXHJcbiAgICAgICAgICAgIG9wZW5Nb2RhbCh0aGlzTW9kYWxJZClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vIG9wZW5Nb2RhbCgnI21vZGFsX2ljZScpXHJcbiAgICAgICAgLy8gb3Blbk1vZGFsKCcjbW9kYWxfZm9ybScpXHJcbiAgICAgICAgLy8gb3Blbk1vZGFsKCcjbW9kYWxfc3VjY2VzcycpXHJcbiAgICAgICAgLy8gb3Blbk1vZGFsKCcjbW9kYWxfdGFibGUnKVxyXG4gICAgICAgIC8vIG9wZW5Nb2RhbCgnI21vZGFsX3RyYWluZXInKVxyXG4gICAgICAgIC8vIG9wZW5Nb2RhbCgnI21vZGFsX2NhcmQnKVxyXG4gICAgICAgIC8vIG9wZW5Nb2RhbCgnI21vZGFsX2FwcGFyYXR1cycpXHJcblxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHZhciBtZW51T3BlbiA9IGZhbHNlXHJcbiAgICAgICAgdmFyIGlzTmF2YmFyVHJhbnNwYXJlbnQgPSAkKCcubmF2YmFyLmlzLS10cmFuc3BhcmVudCcpXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldEJvZHlQYWRkaW5nKCkge1xyXG4gICAgICAgICAgICB2YXIgcHQgPSAkKCcubmF2YmFyJykuaW5uZXJIZWlnaHQoKVxyXG4gICAgICAgICAgICAkKCdib2R5LmlzLS1wdCcpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nVG9wOiBwdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0Qm9keVBhZGRpbmcoKVxyXG5cclxuICAgICAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzZXRCb2R5UGFkZGluZygpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb3Blbk1lbnUoKSB7XHJcbiAgICAgICAgICAgIG9wZW5PdmVybGF5KClcclxuICAgICAgICAgICAgJCgnLm5hdmJhcl9fYmFyJykuZm9jdXMoKVxyXG4gICAgICAgICAgICBUd2Vlbk1heC50bygnLm5hdmJhcl9fYmFyJywgMS41LCB7XHJcbiAgICAgICAgICAgICAgICBlYXNlOiBFbGFzdGljLmVhc2VPdXQuY29uZmlnKDEsIDAuNzUpLFxyXG4gICAgICAgICAgICAgICAgeDogXCIwJVwiLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBUd2Vlbk1heC5zdGFnZ2VyRnJvbSgnLm5hdmJhcl9fYmFyX19tZW51IHVsIGxpJywgMSwge1xyXG4gICAgICAgICAgICAgICAgeDogXCItMTAwJVwiLCBcclxuICAgICAgICAgICAgICAgIGF1dG9BbHBoYTowLCBcclxuICAgICAgICAgICAgICAgIHJvdGF0aW9uWTpcIjE4MFwiLCBcclxuICAgICAgICAgICAgICAgIHBlcnNwZWN0aXZlOjYwMCwgXHJcbiAgICAgICAgICAgICAgICBlYXNlOiBQb3dlcjIuZWFzZU91dCxcclxuICAgICAgICAgICAgICAgIGRlbGF5OiAwLjJcclxuICAgICAgICAgICAgfSwgLjEpXHJcbiAgICAgICAgICAgIFR3ZWVuTWF4LnN0YWdnZXJGcm9tKCcubmF2YmFyX19iYXJfX3NvYyAuc29jaWFsIHVsIGxpJywgMC43LCB7XHJcbiAgICAgICAgICAgICAgICB5OiAxMDAsXHJcbiAgICAgICAgICAgICAgICBlYXNlOiBFbGFzdGljLmVhc2VPdXQuY29uZmlnKDEsIDAuNzUpLFxyXG4gICAgICAgICAgICAgICAgZGVsYXk6IC41LFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMFxyXG4gICAgICAgICAgICB9LCAuMSwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBtZW51T3BlbiA9IHRydWVcclxuICAgICAgICAgICAgICAgICQoJy5uYXZiYXJfX2Jhcl9faW5uZXInKS5hZGRDbGFzcygnaXMtLWNvbXAnKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2xvc2VNZW51KCkge1xyXG4gICAgICAgICAgICBpZihtZW51T3Blbikge1xyXG4gICAgICAgICAgICAgICAgVHdlZW5NYXgudG8oJy5uYXZiYXJfX2JhcicsIDEuNSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGVhc2U6IEVsYXN0aWMuZWFzZU91dC5jb25maWcoMSwgMiksXHJcbiAgICAgICAgICAgICAgICAgICAgeDogXCItMTAwJVwiLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGNsb3NlT3ZlcmxheSgpXHJcbiAgICAgICAgICAgICAgICAkKCcubmF2YmFyX19iYXJfX2lubmVyJykucmVtb3ZlQ2xhc3MoJ2lzLS1jb21wJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtZW51T3BlbiA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvcGVuT3ZlcmxheSgpIHtcclxuICAgICAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdpcy0tb3ZlcmxheScpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjbG9zZU92ZXJsYXkoKSB7XHJcbiAgICAgICAgICAgIGlmKG1lbnVPcGVuKSB7XHJcbiAgICAgICAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2lzLS1vdmVybGF5JylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2xvc2VBbGwoKSB7XHJcbiAgICAgICAgICAgIGNsb3NlTWVudSgpXHJcbiAgICAgICAgICAgIGNsb3NlT3ZlcmxheSgpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXREYXJrTmF2YmFyKClcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0RGFya05hdmJhcigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmKCQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpID4gNTApIHtcclxuICAgICAgICAgICAgICAgICQoJy5uYXZiYXInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLS10cmFuc3BhcmVudCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtLWRlZmF1bHQnKVxyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZihpc05hdmJhclRyYW5zcGFyZW50Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcubmF2YmFyJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy0tZGVmYXVsdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnaXMtLXRyYW5zcGFyZW50JylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0RGFya05hdmJhcigpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnLm5hdmJhcl9fbWVudSBidXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgb3Blbk1lbnUoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJy5uYXZiYXJfX2Jhcl9fdG9wX19jbG9zZSBidXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY2xvc2VNZW51KClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKCcjb3ZlcmxheScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjbG9zZUFsbCgpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkua2V5ZG93bihmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gXCJFc2NhcGVcIikge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VNZW51KClcclxuICAgICAgICAgICB9XHJcbiAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIi5iYW5uZXJfX2Nhcm91c2VsX19pdGVtIGltZ1wiKS5tb3VzZWRvd24oZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLmJvZHktbWFwX19yaWdodF9fcGVyc29uc19fbGlzdCBpbWdcIikubW91c2Vkb3duKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIGltYWdlcyA9ICQoJy5iYW5uZXJfX2Nhcm91c2VsX19pdGVtJyksXHJcbiAgICAgICAgICAgIGN1cnJlbnRTbGlkZSA9IDAsXHJcbiAgICAgICAgICAgIGNvdW50U2xpZGVzID0gaW1hZ2VzLmxlbmd0aCxcclxuICAgICAgICAgICAgc2xpZGVzSW50ZXJ2YWwgPSA0LjVcclxuXHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGltYWdlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZihpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgVHdlZW5NYXgudG8oaW1hZ2VzLCBzbGlkZXNJbnRlcnZhbCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGVhc2U6IEV4cG8uZWFzZU91dCxcclxuICAgICAgICAgICAgICAgICAgICB4OiBcIjEwMCVcIixcclxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUd2Vlbk1heC50byhpbWFnZXNbY3VycmVudFNsaWRlXSwgc2xpZGVzSW50ZXJ2YWwsIHtcclxuICAgICAgICAgICAgZWFzZTogRXhwby5lYXNlT3V0LFxyXG4gICAgICAgICAgICB4OiBcIjAlXCIsXHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDFcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBjdXJyZW50U2xpZGUrK1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjaGFuZ2VTbGlkZXMoKSB7XHJcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKGltYWdlcywgc2xpZGVzSW50ZXJ2YWwsIHtcclxuICAgICAgICAgICAgICAgIGVhc2U6IEV4cG8uZWFzZU91dCxcclxuICAgICAgICAgICAgICAgIHg6IFwiMTAwJVwiLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBUd2Vlbk1heC50byhpbWFnZXNbY3VycmVudFNsaWRlXSwgc2xpZGVzSW50ZXJ2YWwsIHtcclxuICAgICAgICAgICAgICAgIGVhc2U6IEV4cG8uZWFzZU91dCxcclxuICAgICAgICAgICAgICAgIHg6IFwiMCVcIixcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY3VycmVudFNsaWRlKys7XHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnRTbGlkZSA+PSBjb3VudFNsaWRlcykgY3VycmVudFNsaWRlID0gMFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNoYW5nZVNsaWRlcygpXHJcbiAgICAgICAgfSwgNjAwMClcclxuXHJcbiAgICAgICAgJCgnLmJhbm5lcl9fbGVmdF9fc2Nyb2xsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNoYW5nZVNsaWRlcygpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdmFyIGN1cnJlbnRTZXggPSAkKCQoJy5wZXJzb24nKVswXSkuZGF0YSgnc2V4JyksXHJcbiAgICAgICAgICAgIGN1cnJlbnRQb3MgPSAnZnJvbnQnXHJcbiAgICAgICAgXHJcbiAgICAgICAgc2V0UG9zKGN1cnJlbnRQb3MpXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldFBvcyhwb3MpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICQoJy5wZXJzb24nKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogXCJub25lXCJcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICQoJy5wZXJzb25bZGF0YS1wb3M9XCInICsgcG9zICsgJ1wiXScpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImJsb2NrXCJcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGN1cnJlbnRQb3MgPSBwb3NcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCcuYm9keS1tYXBfX3JpZ2h0X19jb250cm9scyBidXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBcclxuICAgICAgICAgICAgaWYoY3VycmVudFBvcyA9PSAnZnJvbnQnKSBjdXJyZW50UG9zID0gJ2JhY2snXHJcbiAgICAgICAgICAgIGVsc2UgaWYoY3VycmVudFBvcyA9PSAnYmFjaycpIGN1cnJlbnRQb3MgPSAnZnJvbnQnXHJcblxyXG4gICAgICAgICAgICBzZXRQb3MoY3VycmVudFBvcylcclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnI2JtaW5wdXQnKS5lZGl0YWJsZVNlbGVjdCh7XHJcbiAgICAgICAgICAgIGVmZmVjdHM6ICdkZWZhdWx0JyxcclxuICAgICAgICAgICAgZHVyYXRpb246IDBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHBsYyA9ICQoJyNibWlucHV0JykuZGF0YSgncGxhY2Vob2xkZXInKVxyXG4gICAgICAgICAgICAkKCcjYm1pbnB1dCcpLmF0dHIoJ3BsYWNlaG9sZGVyJywgcGxjKVxyXG4gICAgICAgIH0sIDEwMDApXHJcblxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHZhciBfY2xhc3NlcyA9IHtcclxuICAgICAgICAgICAgb3BlbjogXCJpcy0tb3BlblwiXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvcGVuRHJvcGRvd24oY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgICQoY29udGFpbmVyKS5hZGRDbGFzcygnaXMtLW9wZW4nKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2xvc2VEcm9wZG93bigpIHtcclxuICAgICAgICAgICAgJCgnLnNlbGVjdCcpLnJlbW92ZUNsYXNzKF9jbGFzc2VzLm9wZW4pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB0b2dnbGVEcm9wZG93bihjb250YWluZXIpIHtcclxuICAgICAgICAgICAgaWYoJChjb250YWluZXIpLmhhc0NsYXNzKF9jbGFzc2VzLm9wZW4pKSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZURyb3Bkb3duKClcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3BlbkRyb3Bkb3duKGNvbnRhaW5lcilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0cyA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5zZWxlY3QnKVxyXG4gICAgICAgICAgICBpZih0YXJnZXRzLmxlbmd0aCA8PSAwKSBjbG9zZURyb3Bkb3duKClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZWxlY3RJdGVtKGl0ZW0pIHtcclxuICAgICAgICAgICAgYWxlcnQoJ9CS0Ysg0LLRi9Cx0YDQsNC70Lg6ICcgKyBpdGVtKVxyXG4gICAgICAgICAgICBjbG9zZURyb3Bkb3duKClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJy5zZWxlY3RfX2xhYmVsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGlzQ29udGFpbmVyID0gJCh0aGlzKS5wYXJlbnQoJy5zZWxlY3QnKVxyXG4gICAgICAgICAgICB0b2dnbGVEcm9wZG93bih0aGlzQ29udGFpbmVyKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJy5zZWxlY3RfX2Ryb3Bkb3duIHVsIGxpJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGlzVGV4dCA9ICQodGhpcykuaHRtbCgpXHJcbiAgICAgICAgICAgIHNlbGVjdEl0ZW0odGhpc1RleHQpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJCgnLnRhYmxlX19saXN0X19pdGVtcycpLnNsaWNrKHtcclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA3LFxyXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcudGFibGVfX2NvbnRyb2xzIGJ1dHRvbi5pcy0tcHJldicsXHJcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy50YWJsZV9fY29udHJvbHMgYnV0dG9uLmlzLS1uZXh0JyxcclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDcsXHJcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxNjAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDZcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDE0NDAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogNVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTIwMCxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAzXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjgsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDQwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KVxyXG5cclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgZnVuY3Rpb24gc2V0RGVza3RvcE5hdnNDb250YWluZXJXaWR0aCgpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdmFyIGl0ZW1XaWR0aCA9ICQoJy56b25lc19fY2Fyb3VzZWxfX2l0ZW0uc3dpcGVyLXNsaWRlJykuY3NzKCd3aWR0aCcpXHJcbiAgICAgICAgICAkKCcuem9uZXNfX2Nhcm91c2VsX19tb3VzZScpLmNzcyh7XHJcbiAgICAgICAgICAgIG1heFdpZHRoOiBpdGVtV2lkdGhcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSwgMTApXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZ1bmN0aW9uIHNldFNsaWRlSW5mbyhzbGlkZUlkKSB7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRTbGlkZSA9ICQoJy56b25lc19fY2Fyb3VzZWxfX2l0ZW1bZGF0YS1pZD1cIicgKyBzbGlkZUlkICsgJ1wiXScpWzBdLFxyXG4gICAgICAgICAgICBjdXJyZW50SW5mbyA9IHtcclxuICAgICAgICAgICAgICBpZDogc2xpZGVJZCxcclxuICAgICAgICAgICAgICB0aXRsZTogJChjdXJyZW50U2xpZGUpLmRhdGEoJ3RpdGxlJyksXHJcbiAgICAgICAgICAgICAgdGV4dDogJChjdXJyZW50U2xpZGUpLmRhdGEoJ3RleHQnKSxcclxuICAgICAgICAgICAgICBsaW5rOiAkKGN1cnJlbnRTbGlkZSkuZGF0YSgnbGluaycpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAkKCcuem9uZXNfX2xlZnRfX2hlYWRpbmcnKS5odG1sKGN1cnJlbnRJbmZvLnRpdGxlKVxyXG4gICAgICAgICQoJy56b25lc19fbGVmdF9fY29udGVudCcpLmh0bWwoY3VycmVudEluZm8udGV4dClcclxuICAgICAgICAkKCcuem9uZXNfX2xlZnRfX2J0biBhJykuYXR0cignaHJlZicsIGN1cnJlbnRJbmZvLmxpbmspXHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBzZXRTbGlkZXNUaXRsZSgpIHtcclxuICAgICAgICB2YXIgc2xpZGVzID0gJCgnLnpvbmVzX19jYXJvdXNlbF9faXRlbScpXHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgIHZhciB0aGlzVGl0bGUgPSAkKHNsaWRlc1tpXSkuZGF0YSgndGl0bGUnKVxyXG4gICAgICAgICAgdGhpc1RpdGxlID0gdGhpc1RpdGxlLnJlcGxhY2UoJyA8YnI+JywgJycpXHJcbiAgICAgICAgICB2YXIgdGhpc1RpdGxlQmxvY2sgPSAkKHNsaWRlc1tpXSkuY2hpbGRyZW4oJy56b25lc19fY2Fyb3VzZWxfX2l0ZW1fX3RpdGxlJylcclxuICAgICAgICAgIHRoaXNUaXRsZUJsb2NrLmh0bWwodGhpc1RpdGxlKVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldERlc2t0b3BOYXZzQ29udGFpbmVyV2lkdGgoKVxyXG5cclxuICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcclxuICAgICAgICBzZXREZXNrdG9wTmF2c0NvbnRhaW5lcldpZHRoKClcclxuICAgICAgfSlcclxuXHJcbiAgICAgIHZhciBzd2lwZXIgPSBuZXcgU3dpcGVyKCcuem9uZXNfX2Nhcm91c2VsX19pbm5lcicsIHtcclxuICAgICAgICBzbGlkZXNQZXJWaWV3OiAgMixcclxuICAgICAgICBzcGFjZUJldHdlZW46IDMwLFxyXG4gICAgICAgIHRvdWNoUmF0aW86IDAsXHJcbiAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgIDEyMDA6IHtcclxuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcclxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxyXG4gICAgICAgICAgICB0b3VjaFJhdGlvOiAyLFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb246IHtcclxuICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzZXRTbGlkZXNUaXRsZSgpXHJcbiAgICAgICAgICAgIHNldFNsaWRlSW5mbygwKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHNsaWRlQ2hhbmdlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0U2xpZGVJbmZvKHN3aXBlci5hY3RpdmVJbmRleClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgJCgnLnpvbmVzX19jYXJvdXNlbF9fbW91c2UgLmlzLS1sZWZ0LCAuem9uZXNfX2Nhcm91c2VsX19jb250cm9scyBidXR0b24uaXMtLXByZXYnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBzd2lwZXIuc2xpZGVQcmV2KCk7XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICAkKCcuem9uZXNfX2Nhcm91c2VsX19tb3VzZSAuaXMtLXJpZ2h0LCAuem9uZXNfX2Nhcm91c2VsX19jb250cm9scyBidXR0b24uaXMtLW5leHQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBzd2lwZXIuc2xpZGVOZXh0KCk7XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICAkKCcjY3pfdGFyZ2V0JylcclxuICAgICAgLm1vdXNlbW92ZShmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcjem9uZXNjdXJzb3InKS5hZGRDbGFzcygnaXMtLXZpc2libGUnKVxyXG4gICAgICB9KVxyXG4gICAgICAubW91c2VsZWF2ZShmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcjem9uZXNjdXJzb3InKS5yZW1vdmVDbGFzcygnaXMtLXZpc2libGUnKVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgJCgnLnpvbmVzX19jYXJvdXNlbF9fbW91c2Ugc3Bhbi5pcy0tbGVmdCcpLmhvdmVyKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJyN6b25lc2N1cnNvcicpLmFkZENsYXNzKCdpcy0tbGVmdCcpXHJcbiAgICAgIH0sIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJyN6b25lc2N1cnNvcicpLnJlbW92ZUNsYXNzKCdpcy0tbGVmdCcpXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihldil7XHJcbiAgICAgICAgaWYoJCgnI3pvbmVzY3Vyc29yJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3pvbmVzY3Vyc29yJykuc3R5bGUubGVmdCA9IGV2LmNsaWVudFgtNDIgKyAncHgnO1xyXG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3pvbmVzY3Vyc29yJykuc3R5bGUudG9wID0gZXYuY2xpZW50WS00MiArICdweCc7ICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgfSxmYWxzZSk7ICBcclxuXHJcbiAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICQoJyN6b25lc2N1cnNvcicpLnJlbW92ZUNsYXNzKCdpcy0tdmlzaWJsZScpXHJcbiAgICAgIH0pXHJcblxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiXX0=
