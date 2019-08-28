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
        }, 150)
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2cuanMiLCJkaXJlY3Rpb25zLmpzIiwibGF6eS5qcyIsIm1haW4uanMiLCJtYXAuanMiLCJtb2RhbHMuanMiLCJuYXZiYXIuanMiLCJwZXJzb25zLmpzIiwic2VsZWN0LmpzIiwidGFibGUuanMiLCJ6b25lcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAkKCcuYXJ0X19jYXJvdXNlbF9fbGlzdCcpLnNsaWNrKHtcclxuICAgICAgICAgICAgcHJldkFycm93OiAnLmFydF9fY2Fyb3VzZWxfX2NvbnRyb2xzIGJ1dHRvbi5pcy0tcHJldicsXHJcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy5hcnRfX2Nhcm91c2VsX19jb250cm9scyBidXR0b24uaXMtLW5leHQnXHJcbiAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgZnVuY3Rpb24gc2V0U2xpZGVJbmZvKHNsaWRlSWQpIHtcclxuXHJcbiAgICAgICAgdmFyIGN1cnJlbnRTbGlkZSA9ICQoJy5kaXJlY3Rpb25zX19jZW50ZXJfX2Nhcm91c2VsX19pdGVtW2RhdGEtaWQ9XCInICsgc2xpZGVJZCArICdcIl0nKVswXSxcclxuICAgICAgICBjdXJyZW50SW5mbyA9IHtcclxuICAgICAgICAgIGlkOiBzbGlkZUlkLFxyXG4gICAgICAgICAgdGl0bGU6ICQoY3VycmVudFNsaWRlKS5kYXRhKCd0aXRsZScpLFxyXG4gICAgICAgICAgdGV4dDogJChjdXJyZW50U2xpZGUpLmRhdGEoJ3RleHQnKSxcclxuICAgICAgICAgIGxpbms6ICQoY3VycmVudFNsaWRlKS5kYXRhKCdsaW5rJylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJy5kaXJlY3Rpb25zX19yaWdodF9faGVhZGluZycpLmh0bWwoY3VycmVudEluZm8udGl0bGUpXHJcbiAgICAgICAgJCgnLmRpcmVjdGlvbnNfX3JpZ2h0X190ZXh0JykuaHRtbChjdXJyZW50SW5mby50ZXh0KVxyXG4gICAgICAgICQoJy5kaXJlY3Rpb25zX19yaWdodF9fYnRuIGEnKS5hdHRyKCdocmVmJywgY3VycmVudEluZm8ubGluaylcclxuXHJcbiAgICAgICAgJCgnLmRpcmVjdGlvbnNfX21lbnUgdWwgbGknKS5yZW1vdmVDbGFzcygnaXMtLWFjdGl2ZScpXHJcbiAgICAgICAgJCgnLmRpcmVjdGlvbnNfX21lbnUgdWwgbGlbZGF0YS1pZD1cIicgKyBjdXJyZW50SW5mby5pZCArICdcIl0nKS5hZGRDbGFzcygnaXMtLWFjdGl2ZScpXHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBzZXRTbGlkZShzbGlkZUlkKSB7XHJcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oc2xpZGVJZCArIDEpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBzd2lwZXIgPSBuZXcgU3dpcGVyKCcuZGlyZWN0aW9uc19fY2VudGVyX19pbm5lcicsIHtcclxuICAgICAgICBzcGFjZUJldHdlZW46IDMwLFxyXG4gICAgICAgIHNsaWRlc1BlclZpZXc6ICAyLFxyXG4gICAgICAgIGVmZmVjdDogJ2ZhZGUnLFxyXG4gICAgICAgIGxvb3A6IHRydWUsXHJcbiAgICAgICAgdG91Y2hSYXRpbzogMCxcclxuICAgICAgICBvbjoge1xyXG4gICAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldFNsaWRlSW5mbygwKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHNsaWRlQ2hhbmdlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0U2xpZGVJbmZvKHRoaXMucmVhbEluZGV4KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICAkKCcuZGlyZWN0aW9uc19fbWVudSB1bCBsaSBzcGFuJykub24oJ2NsaWNrIHRvdWNoZW5kJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHRoaXNJZCA9ICQodGhpcykucGFyZW50KCdsaScpLmRhdGEoJ2lkJylcclxuICAgICAgICBzZXRTbGlkZSh0aGlzSWQpXHJcbiAgICAgIH0pXHJcblxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiLCJsYXp5TG9hZEltYWdlcygpO1xyXG5cclxuZnVuY3Rpb24gbGF6eUxvYWRJbWFnZXMoKSB7XHJcbiAgICB2YXIgaW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxhenknKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgaW1hZ2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaW1hZ2VzW2ldLnNyYyA9IGltYWdlc1tpXS5kYXRhc2V0LnNyYztcclxuICAgICAgICBpbWFnZXNbaV0ucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXNyYycpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59IiwiKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBzdmc0ZXZlcnlib2R5KClcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0UGFkZGluZ3MoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2xhc3NlcyA9IHtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiAnLmlzLS1jLXBsJyxcclxuICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogJy5pcy0tYy1wcicsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQxMDBQZXI6ICcuaXMtLWgxMDAnXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBwYWRkaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbmF2YmFyX19pbm5lcicpWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSAkKCcubmF2YmFyJykuaW5uZXJIZWlnaHQoKSArICQoJy5mb290ZXInKS5pbm5lckhlaWdodCgpXHJcblxyXG4gICAgICAgICAgICAkKGNsYXNzZXMucGFkZGluZ0xlZnQpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nTGVmdDogcGFkZGluZy5sZWZ0ICsgMzBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgJChjbGFzc2VzLnBhZGRpbmdSaWdodCkuY3NzKHtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogcGFkZGluZy5sZWZ0ICsgMzBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgJChjbGFzc2VzLmhlaWdodDEwMFBlcikuY3NzKHtcclxuICAgICAgICAgICAgICAgIG1pbkhlaWdodDogJ2NhbGMoMTAwdmggLSAnICsgaGVpZ2h0ICsgJ3B4KSdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgJCgnbWFpbicpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBtaW5IZWlnaHQ6ICdjYWxjKDEwMHZoIC0gJyArIGhlaWdodCArICdweCknXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0UGFkZGluZ3MoKVxyXG5cclxuICAgICAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzZXRQYWRkaW5ncygpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnZm9ybScpLnBhcnNsZXkoKVxyXG5cclxuICAgICAgICB2YXIgcGhvbmVJbnB1dHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbnB1dC1waG9uZScpO1xyXG5cclxuICAgICAgICBpZihwaG9uZUlucHV0cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHBob25lSW5wdXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBuZXcgSU1hc2soXHJcbiAgICAgICAgICAgICAgICAgICAgcGhvbmVJbnB1dHNbaV0sIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrOiAnK3s3fSg5MDApMDAwLTAwLTAwJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJy5ib2R5LW1hcF9fcmlnaHRfX2lubmVyJykuc3RpY2t5KHtcclxuICAgICAgICAgICAgdG9wU3BhY2luZzogMTAwLFxyXG4gICAgICAgICAgICByZXNwb25zaXZlV2lkdGg6IHRydWUsXHJcbiAgICAgICAgICAgIGJvdHRvbVNwYWNpbmc6ICQoJy5mb290ZXInKS5pbm5lckhlaWdodCgpICsgMTAwXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJy5hbmNob3InKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gJCh0aGlzKVxyXG4gICAgICAgICAgICB2YXIgYWlkID0gX3RoaXMuYXR0cihcImhyZWZcIik7XHJcbiAgICAgICAgICAgIGlmKCFhaWQpIHtcclxuICAgICAgICAgICAgICAgIGFpZCA9IF90aGlzLmRhdGEoJ3RhcmdldCcpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJCgnaHRtbCxib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAkKGFpZCkub2Zmc2V0KCkudG9wIC0gJCgnLm5hdmJhcicpLmlubmVySGVpZ2h0KCl9LCdzbG93Jyk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsInltYXBzLnJlYWR5KGluaXQpO1xyXG5cclxuZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIGlmKCQoJyNtYXAnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdmFyIG15TWFwID0gbmV3IHltYXBzLk1hcChcIm1hcFwiLCB7XHJcbiAgICAgICAgICAgIGNlbnRlcjogWzUyLjk3MTIzMywgMzYuMDU0MTAwXSxcclxuICAgICAgICAgICAgem9vbTogMTcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xzOiBbXVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgc2VhcmNoQ29udHJvbFByb3ZpZGVyOiAneWFuZGV4I3NlYXJjaCdcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBteU1hcC5nZW9PYmplY3RzXHJcbiAgICAgICAgICAgIC5hZGQobmV3IHltYXBzLlBsYWNlbWFyayhbNTIuOTcxMjMzLCAzNi4wNTQxMDBdLCB7XHJcbiAgICAgICAgICAgICAgICBiYWxsb29uQ29udGVudDogJ9Ck0LjRgtC90LXRgSDQmtC70YPQsSA8c3Ryb25nPtCh0LjRgdGC0LXQvNCwINCa0L7QvNC/0LvQtdC60YE8L3N0cm9uZz4nXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHByZXNldDogJ2lzbGFuZHMjcmVkU3BvcnRJY29uJ1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICB9XHJcbn1cclxuIiwiZnVuY3Rpb24gb3Blbk1vZGFsKG1vZGFsSUQpIHtcclxuICAgICQobW9kYWxJRCkubW9kYWwoe1xyXG4gICAgICAgIGZhZGVEdXJhdGlvbjogMTAwLFxyXG4gICAgICAgIHNob3dDbG9zZTogZmFsc2UsXHJcbiAgICB9KVxyXG59XHJcblxyXG4oZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICQubW9kYWwuZmFkZUR1cmF0aW9uID0gMTAwXHJcbiAgICAgICAgJC5tb2RhbC5zaG93Q2xvc2UgPSBmYWxzZVxyXG5cclxuICAgICAgICAkKCdhLm1vZGFsLW9wZW4nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICB2YXIgdGhpc01vZGFsSWQgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKVxyXG4gICAgICAgICAgICBvcGVuTW9kYWwodGhpc01vZGFsSWQpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyBvcGVuTW9kYWwoJyNtb2RhbF9pY2UnKVxyXG4gICAgICAgIC8vIG9wZW5Nb2RhbCgnI21vZGFsX2Zvcm0nKVxyXG4gICAgICAgIC8vIG9wZW5Nb2RhbCgnI21vZGFsX3N1Y2Nlc3MnKVxyXG4gICAgICAgIC8vIG9wZW5Nb2RhbCgnI21vZGFsX3RhYmxlJylcclxuICAgICAgICAvLyBvcGVuTW9kYWwoJyNtb2RhbF90cmFpbmVyJylcclxuICAgICAgICAvLyBvcGVuTW9kYWwoJyNtb2RhbF9jYXJkJylcclxuICAgICAgICAvLyBvcGVuTW9kYWwoJyNtb2RhbF9hcHBhcmF0dXMnKVxyXG5cclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXIgbWVudU9wZW4gPSBmYWxzZVxyXG4gICAgICAgIHZhciBpc05hdmJhclRyYW5zcGFyZW50ID0gJCgnLm5hdmJhci5pcy0tdHJhbnNwYXJlbnQnKVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXRCb2R5UGFkZGluZygpIHtcclxuICAgICAgICAgICAgdmFyIHB0ID0gJCgnLm5hdmJhcicpLmlubmVySGVpZ2h0KClcclxuICAgICAgICAgICAgJCgnYm9keS5pcy0tcHQnKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZ1RvcDogcHRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldEJvZHlQYWRkaW5nKClcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0Qm9keVBhZGRpbmcoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9wZW5NZW51KCkge1xyXG4gICAgICAgICAgICBvcGVuT3ZlcmxheSgpXHJcbiAgICAgICAgICAgICQoJy5uYXZiYXJfX2JhcicpLmZvY3VzKClcclxuICAgICAgICAgICAgVHdlZW5NYXgudG8oJy5uYXZiYXJfX2JhcicsIDEuNSwge1xyXG4gICAgICAgICAgICAgICAgZWFzZTogRWxhc3RpYy5lYXNlT3V0LmNvbmZpZygxLCAwLjc1KSxcclxuICAgICAgICAgICAgICAgIHg6IFwiMCVcIixcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgVHdlZW5NYXguc3RhZ2dlckZyb20oJy5uYXZiYXJfX2Jhcl9fbWVudSB1bCBsaScsIDEsIHtcclxuICAgICAgICAgICAgICAgIHg6IFwiLTEwMCVcIiwgXHJcbiAgICAgICAgICAgICAgICBhdXRvQWxwaGE6MCwgXHJcbiAgICAgICAgICAgICAgICByb3RhdGlvblk6XCIxODBcIiwgXHJcbiAgICAgICAgICAgICAgICBwZXJzcGVjdGl2ZTo2MDAsIFxyXG4gICAgICAgICAgICAgICAgZWFzZTogUG93ZXIyLmVhc2VPdXQsXHJcbiAgICAgICAgICAgICAgICBkZWxheTogMC4yXHJcbiAgICAgICAgICAgIH0sIC4xKVxyXG4gICAgICAgICAgICBUd2Vlbk1heC5zdGFnZ2VyRnJvbSgnLm5hdmJhcl9fYmFyX19zb2MgLnNvY2lhbCB1bCBsaScsIDAuNywge1xyXG4gICAgICAgICAgICAgICAgeTogMTAwLFxyXG4gICAgICAgICAgICAgICAgZWFzZTogRWxhc3RpYy5lYXNlT3V0LmNvbmZpZygxLCAwLjc1KSxcclxuICAgICAgICAgICAgICAgIGRlbGF5OiAuNSxcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgICAgICAgfSwgLjEsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbWVudU9wZW4gPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAkKCcubmF2YmFyX19iYXJfX2lubmVyJykuYWRkQ2xhc3MoJ2lzLS1jb21wJylcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNsb3NlTWVudSgpIHtcclxuICAgICAgICAgICAgaWYobWVudU9wZW4pIHtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTWF4LnRvKCcubmF2YmFyX19iYXInLCAxLjUsIHtcclxuICAgICAgICAgICAgICAgICAgICBlYXNlOiBFbGFzdGljLmVhc2VPdXQuY29uZmlnKDEsIDIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHg6IFwiLTEwMCVcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBjbG9zZU92ZXJsYXkoKVxyXG4gICAgICAgICAgICAgICAgJCgnLm5hdmJhcl9fYmFyX19pbm5lcicpLnJlbW92ZUNsYXNzKCdpcy0tY29tcCcpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWVudU9wZW4gPSBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb3Blbk92ZXJsYXkoKSB7XHJcbiAgICAgICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnaXMtLW92ZXJsYXknKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2xvc2VPdmVybGF5KCkge1xyXG4gICAgICAgICAgICBpZihtZW51T3Blbikge1xyXG4gICAgICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdpcy0tb3ZlcmxheScpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNsb3NlQWxsKCkge1xyXG4gICAgICAgICAgICBjbG9zZU1lbnUoKVxyXG4gICAgICAgICAgICBjbG9zZU92ZXJsYXkoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0RGFya05hdmJhcigpXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldERhcmtOYXZiYXIoKSB7XHJcblxyXG4gICAgICAgICAgICBpZigkKGRvY3VtZW50KS5zY3JvbGxUb3AoKSA+IDUwKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcubmF2YmFyJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy0tdHJhbnNwYXJlbnQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLS1kZWZhdWx0JylcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYoaXNOYXZiYXJUcmFuc3BhcmVudC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLm5hdmJhcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtLWRlZmF1bHQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLS10cmFuc3BhcmVudCcpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldERhcmtOYXZiYXIoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJy5uYXZiYXJfX21lbnUgYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIG9wZW5NZW51KClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKCcubmF2YmFyX19iYXJfX3RvcF9fY2xvc2UgYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNsb3NlTWVudSgpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnI292ZXJsYXknKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY2xvc2VBbGwoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLmtleWRvd24oZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09IFwiRXNjYXBlXCIpIHtcclxuICAgICAgICAgICAgICAgIGNsb3NlTWVudSgpXHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIuYmFubmVyX19jYXJvdXNlbF9faXRlbSBpbWdcIikubW91c2Vkb3duKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIi5ib2R5LW1hcF9fcmlnaHRfX3BlcnNvbnNfX2xpc3QgaW1nXCIpLm1vdXNlZG93bihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhciBpbWFnZXMgPSAkKCcuYmFubmVyX19jYXJvdXNlbF9faXRlbScpLFxyXG4gICAgICAgICAgICBjdXJyZW50U2xpZGUgPSAwLFxyXG4gICAgICAgICAgICBjb3VudFNsaWRlcyA9IGltYWdlcy5sZW5ndGgsXHJcbiAgICAgICAgICAgIHNsaWRlc0ludGVydmFsID0gNC41XHJcblxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBpbWFnZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoaSA+IDApIHtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTWF4LnRvKGltYWdlcywgc2xpZGVzSW50ZXJ2YWwsIHtcclxuICAgICAgICAgICAgICAgICAgICBlYXNlOiBFeHBvLmVhc2VPdXQsXHJcbiAgICAgICAgICAgICAgICAgICAgeDogXCIxMDAlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVHdlZW5NYXgudG8oaW1hZ2VzW2N1cnJlbnRTbGlkZV0sIHNsaWRlc0ludGVydmFsLCB7XHJcbiAgICAgICAgICAgIGVhc2U6IEV4cG8uZWFzZU91dCxcclxuICAgICAgICAgICAgeDogXCIwJVwiLFxyXG4gICAgICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgY3VycmVudFNsaWRlKytcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlU2xpZGVzKCkge1xyXG4gICAgICAgICAgICBUd2Vlbk1heC50byhpbWFnZXMsIHNsaWRlc0ludGVydmFsLCB7XHJcbiAgICAgICAgICAgICAgICBlYXNlOiBFeHBvLmVhc2VPdXQsXHJcbiAgICAgICAgICAgICAgICB4OiBcIjEwMCVcIixcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgVHdlZW5NYXgudG8oaW1hZ2VzW2N1cnJlbnRTbGlkZV0sIHNsaWRlc0ludGVydmFsLCB7XHJcbiAgICAgICAgICAgICAgICBlYXNlOiBFeHBvLmVhc2VPdXQsXHJcbiAgICAgICAgICAgICAgICB4OiBcIjAlXCIsXHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGN1cnJlbnRTbGlkZSsrO1xyXG4gICAgICAgICAgICBpZihjdXJyZW50U2xpZGUgPj0gY291bnRTbGlkZXMpIGN1cnJlbnRTbGlkZSA9IDBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjaGFuZ2VTbGlkZXMoKVxyXG4gICAgICAgIH0sIDYwMDApXHJcblxyXG4gICAgICAgICQoJy5iYW5uZXJfX2xlZnRfX3Njcm9sbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjaGFuZ2VTbGlkZXMoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHZhciBjdXJyZW50U2V4ID0gJCgkKCcucGVyc29uJylbMF0pLmRhdGEoJ3NleCcpLFxyXG4gICAgICAgICAgICBjdXJyZW50UG9zID0gJ2Zyb250J1xyXG4gICAgICAgIFxyXG4gICAgICAgIHNldFBvcyhjdXJyZW50UG9zKVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXRQb3MocG9zKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkKCcucGVyc29uJykuY3NzKHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwibm9uZVwiXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAkKCcucGVyc29uW2RhdGEtcG9zPVwiJyArIHBvcyArICdcIl0nKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogXCJibG9ja1wiXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBjdXJyZW50UG9zID0gcG9zXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCgnLmJvZHktbWFwX19yaWdodF9fY29udHJvbHMgYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnRQb3MgPT0gJ2Zyb250JykgY3VycmVudFBvcyA9ICdiYWNrJ1xyXG4gICAgICAgICAgICBlbHNlIGlmKGN1cnJlbnRQb3MgPT0gJ2JhY2snKSBjdXJyZW50UG9zID0gJ2Zyb250J1xyXG5cclxuICAgICAgICAgICAgc2V0UG9zKGN1cnJlbnRQb3MpXHJcblxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJyNibWlucHV0JykuZWRpdGFibGVTZWxlY3Qoe1xyXG4gICAgICAgICAgICBlZmZlY3RzOiAnZGVmYXVsdCcsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAwXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGMgPSAkKCcjYm1pbnB1dCcpLmRhdGEoJ3BsYWNlaG9sZGVyJylcclxuICAgICAgICAgICAgJCgnI2JtaW5wdXQnKS5hdHRyKCdwbGFjZWhvbGRlcicsIHBsYylcclxuICAgICAgICB9LCAxMDAwKVxyXG5cclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXIgX2NsYXNzZXMgPSB7XHJcbiAgICAgICAgICAgIG9wZW46IFwiaXMtLW9wZW5cIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb3BlbkRyb3Bkb3duKGNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICAkKGNvbnRhaW5lcikuYWRkQ2xhc3MoJ2lzLS1vcGVuJylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNsb3NlRHJvcGRvd24oKSB7XHJcbiAgICAgICAgICAgICQoJy5zZWxlY3QnKS5yZW1vdmVDbGFzcyhfY2xhc3Nlcy5vcGVuKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdG9nZ2xlRHJvcGRvd24oY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIGlmKCQoY29udGFpbmVyKS5oYXNDbGFzcyhfY2xhc3Nlcy5vcGVuKSkge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VEcm9wZG93bigpXHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIG9wZW5Ecm9wZG93bihjb250YWluZXIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldHMgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCcuc2VsZWN0JylcclxuICAgICAgICAgICAgaWYodGFyZ2V0cy5sZW5ndGggPD0gMCkgY2xvc2VEcm9wZG93bigpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2VsZWN0SXRlbShpdGVtKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCfQktGLINCy0YvQsdGA0LDQu9C4OiAnICsgaXRlbSlcclxuICAgICAgICAgICAgY2xvc2VEcm9wZG93bigpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCcuc2VsZWN0X19sYWJlbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhpc0NvbnRhaW5lciA9ICQodGhpcykucGFyZW50KCcuc2VsZWN0JylcclxuICAgICAgICAgICAgdG9nZ2xlRHJvcGRvd24odGhpc0NvbnRhaW5lcilcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKCcuc2VsZWN0X19kcm9wZG93biB1bCBsaScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhpc1RleHQgPSAkKHRoaXMpLmh0bWwoKVxyXG4gICAgICAgICAgICBzZWxlY3RJdGVtKHRoaXNUZXh0KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICQoJy50YWJsZV9fbGlzdF9faXRlbXMnKS5zbGljayh7XHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNyxcclxuICAgICAgICAgICAgcHJldkFycm93OiAnLnRhYmxlX19jb250cm9scyBidXR0b24uaXMtLXByZXYnLFxyXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcudGFibGVfX2NvbnRyb2xzIGJ1dHRvbi5pcy0tbmV4dCcsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiA3LFxyXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTYwMCxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiA2XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxNDQwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEyMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogM1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY4LFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ0MCxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIHNldERlc2t0b3BOYXZzQ29udGFpbmVyV2lkdGgoKSB7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBpdGVtV2lkdGggPSAkKCcuem9uZXNfX2Nhcm91c2VsX19pdGVtLnN3aXBlci1zbGlkZScpLmNzcygnd2lkdGgnKVxyXG4gICAgICAgICAgJCgnLnpvbmVzX19jYXJvdXNlbF9fbW91c2UnKS5jc3Moe1xyXG4gICAgICAgICAgICBtYXhXaWR0aDogaXRlbVdpZHRoXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sIDE1MClcclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gc2V0U2xpZGVJbmZvKHNsaWRlSWQpIHtcclxuICAgICAgICB2YXIgY3VycmVudFNsaWRlID0gJCgnLnpvbmVzX19jYXJvdXNlbF9faXRlbVtkYXRhLWlkPVwiJyArIHNsaWRlSWQgKyAnXCJdJylbMF0sXHJcbiAgICAgICAgICAgIGN1cnJlbnRJbmZvID0ge1xyXG4gICAgICAgICAgICAgIGlkOiBzbGlkZUlkLFxyXG4gICAgICAgICAgICAgIHRpdGxlOiAkKGN1cnJlbnRTbGlkZSkuZGF0YSgndGl0bGUnKSxcclxuICAgICAgICAgICAgICB0ZXh0OiAkKGN1cnJlbnRTbGlkZSkuZGF0YSgndGV4dCcpLFxyXG4gICAgICAgICAgICAgIGxpbms6ICQoY3VycmVudFNsaWRlKS5kYXRhKCdsaW5rJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICQoJy56b25lc19fbGVmdF9faGVhZGluZycpLmh0bWwoY3VycmVudEluZm8udGl0bGUpXHJcbiAgICAgICAgJCgnLnpvbmVzX19sZWZ0X19jb250ZW50JykuaHRtbChjdXJyZW50SW5mby50ZXh0KVxyXG4gICAgICAgICQoJy56b25lc19fbGVmdF9fYnRuIGEnKS5hdHRyKCdocmVmJywgY3VycmVudEluZm8ubGluaylcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZ1bmN0aW9uIHNldFNsaWRlc1RpdGxlKCkge1xyXG4gICAgICAgIHZhciBzbGlkZXMgPSAkKCcuem9uZXNfX2Nhcm91c2VsX19pdGVtJylcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgICAgdmFyIHRoaXNUaXRsZSA9ICQoc2xpZGVzW2ldKS5kYXRhKCd0aXRsZScpXHJcbiAgICAgICAgICB0aGlzVGl0bGUgPSB0aGlzVGl0bGUucmVwbGFjZSgnIDxicj4nLCAnJylcclxuICAgICAgICAgIHZhciB0aGlzVGl0bGVCbG9jayA9ICQoc2xpZGVzW2ldKS5jaGlsZHJlbignLnpvbmVzX19jYXJvdXNlbF9faXRlbV9fdGl0bGUnKVxyXG4gICAgICAgICAgdGhpc1RpdGxlQmxvY2suaHRtbCh0aGlzVGl0bGUpXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc2V0RGVza3RvcE5hdnNDb250YWluZXJXaWR0aCgpXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICB2YXIgc3dpcGVyID0gbmV3IFN3aXBlcignLnpvbmVzX19jYXJvdXNlbF9faW5uZXInLCB7XHJcbiAgICAgICAgc2xpZGVzUGVyVmlldzogIDIsXHJcbiAgICAgICAgc3BhY2VCZXR3ZWVuOiAzMCxcclxuICAgICAgICB0b3VjaFJhdGlvOiAwLFxyXG4gICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAxMjAwOiB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMCxcclxuICAgICAgICAgICAgdG91Y2hSYXRpbzogMixcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uOiB7XHJcbiAgICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0U2xpZGVzVGl0bGUoKVxyXG4gICAgICAgICAgICBzZXRTbGlkZUluZm8oMClcclxuICAgICAgICAgICAgc2V0RGVza3RvcE5hdnNDb250YWluZXJXaWR0aCgpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgc2xpZGVDaGFuZ2U6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzZXRTbGlkZUluZm8oJChzd2lwZXIuc2xpZGVzW3N3aXBlci5yZWFsSW5kZXhdKS5kYXRhKCdpZCcpKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICAkKCcuem9uZXNfX2Nhcm91c2VsX19tb3VzZSAuaXMtLWxlZnQsIC56b25lc19fY2Fyb3VzZWxfX2NvbnRyb2xzIGJ1dHRvbi5pcy0tcHJldicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHN3aXBlci5zbGlkZVByZXYoKTtcclxuICAgICAgfSlcclxuXHJcbiAgICAgICQoJy56b25lc19fY2Fyb3VzZWxfX21vdXNlIC5pcy0tcmlnaHQsIC56b25lc19fY2Fyb3VzZWxfX2NvbnRyb2xzIGJ1dHRvbi5pcy0tbmV4dCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHN3aXBlci5zbGlkZU5leHQoKTtcclxuICAgICAgfSlcclxuXHJcbiAgICAgICQoJyNjel90YXJnZXQnKVxyXG4gICAgICAubW91c2Vtb3ZlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJyN6b25lc2N1cnNvcicpLmFkZENsYXNzKCdpcy0tdmlzaWJsZScpXHJcbiAgICAgIH0pXHJcbiAgICAgIC5tb3VzZWxlYXZlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJyN6b25lc2N1cnNvcicpLnJlbW92ZUNsYXNzKCdpcy0tdmlzaWJsZScpXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICAkKCcuem9uZXNfX2Nhcm91c2VsX19tb3VzZSBzcGFuLmlzLS1sZWZ0JykuaG92ZXIoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnI3pvbmVzY3Vyc29yJykuYWRkQ2xhc3MoJ2lzLS1sZWZ0JylcclxuICAgICAgfSwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnI3pvbmVzY3Vyc29yJykucmVtb3ZlQ2xhc3MoJ2lzLS1sZWZ0JylcclxuICAgICAgfSlcclxuXHJcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGV2KXtcclxuICAgICAgICBpZigkKCcjem9uZXNjdXJzb3InKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnem9uZXNjdXJzb3InKS5zdHlsZS5sZWZ0ID0gZXYuY2xpZW50WC00MiArICdweCc7XHJcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnem9uZXNjdXJzb3InKS5zdHlsZS50b3AgPSBldi5jbGllbnRZLTQyICsgJ3B4JzsgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICB9LGZhbHNlKTsgIFxyXG5cclxuICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgJCgnI3pvbmVzY3Vyc29yJykucmVtb3ZlQ2xhc3MoJ2lzLS12aXNpYmxlJylcclxuICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyJdfQ==
