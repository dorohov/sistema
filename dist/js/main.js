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

      $('.directions__menu ul li').on('click', function() {
        var thisId = $(this).data('id')
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

        }

        setPaddings()

        $(window).resize(function() {
            setPaddings()
        })

    })
})(jQuery);
ymaps.ready(init);

function init() {
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

            if($(document).scrollTop() > $('.navbar').innerHeight()) {
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

        $(".banner__right__carousel__items__block img").mousedown(function(){
            return false;
        });

        var images = $('.banner__right__carousel__items__block img'),
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
            // changeSlides()
        }, 6000)

        $('.banner__left__scroll').on('click', function() {
            changeSlides()
        })

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
      
      $('.zones__carousel__mouse').hover(function() {

      }, function() {

      })

      

    })
})(jQuery);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGlvbnMuanMiLCJsYXp5LmpzIiwibWFpbi5qcyIsIm1hcC5qcyIsIm5hdmJhci5qcyIsInNlbGVjdC5qcyIsInRhYmxlLmpzIiwiem9uZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIHNldFNsaWRlSW5mbyhzbGlkZUlkKSB7XHJcblxyXG4gICAgICAgIHZhciBjdXJyZW50U2xpZGUgPSAkKCcuZGlyZWN0aW9uc19fY2VudGVyX19jYXJvdXNlbF9faXRlbVtkYXRhLWlkPVwiJyArIHNsaWRlSWQgKyAnXCJdJylbMF0sXHJcbiAgICAgICAgY3VycmVudEluZm8gPSB7XHJcbiAgICAgICAgICBpZDogc2xpZGVJZCxcclxuICAgICAgICAgIHRpdGxlOiAkKGN1cnJlbnRTbGlkZSkuZGF0YSgndGl0bGUnKSxcclxuICAgICAgICAgIHRleHQ6ICQoY3VycmVudFNsaWRlKS5kYXRhKCd0ZXh0JyksXHJcbiAgICAgICAgICBsaW5rOiAkKGN1cnJlbnRTbGlkZSkuZGF0YSgnbGluaycpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCcuZGlyZWN0aW9uc19fcmlnaHRfX2hlYWRpbmcnKS5odG1sKGN1cnJlbnRJbmZvLnRpdGxlKVxyXG4gICAgICAgICQoJy5kaXJlY3Rpb25zX19yaWdodF9fdGV4dCcpLmh0bWwoY3VycmVudEluZm8udGV4dClcclxuICAgICAgICAkKCcuZGlyZWN0aW9uc19fcmlnaHRfX2J0biBhJykuYXR0cignaHJlZicsIGN1cnJlbnRJbmZvLmxpbmspXHJcblxyXG4gICAgICAgICQoJy5kaXJlY3Rpb25zX19tZW51IHVsIGxpJykucmVtb3ZlQ2xhc3MoJ2lzLS1hY3RpdmUnKVxyXG4gICAgICAgICQoJy5kaXJlY3Rpb25zX19tZW51IHVsIGxpW2RhdGEtaWQ9XCInICsgY3VycmVudEluZm8uaWQgKyAnXCJdJykuYWRkQ2xhc3MoJ2lzLS1hY3RpdmUnKVxyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gc2V0U2xpZGUoc2xpZGVJZCkge1xyXG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHNsaWRlSWQgKyAxKVxyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgc3dpcGVyID0gbmV3IFN3aXBlcignLmRpcmVjdGlvbnNfX2NlbnRlcl9faW5uZXInLCB7XHJcbiAgICAgICAgc3BhY2VCZXR3ZWVuOiAzMCxcclxuICAgICAgICBzbGlkZXNQZXJWaWV3OiAgMixcclxuICAgICAgICBlZmZlY3Q6ICdmYWRlJyxcclxuICAgICAgICBsb29wOiB0cnVlLFxyXG4gICAgICAgIHRvdWNoUmF0aW86IDAsXHJcbiAgICAgICAgb246IHtcclxuICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzZXRTbGlkZUluZm8oMClcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBzbGlkZUNoYW5nZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldFNsaWRlSW5mbyh0aGlzLnJlYWxJbmRleClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgJCgnLmRpcmVjdGlvbnNfX21lbnUgdWwgbGknKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgdGhpc0lkID0gJCh0aGlzKS5kYXRhKCdpZCcpXHJcbiAgICAgICAgc2V0U2xpZGUodGhpc0lkKVxyXG4gICAgICB9KVxyXG5cclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7IiwibGF6eUxvYWRJbWFnZXMoKTtcclxuXHJcbmZ1bmN0aW9uIGxhenlMb2FkSW1hZ2VzKCkge1xyXG4gICAgdmFyIGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5sYXp5Jyk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGltYWdlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGltYWdlc1tpXS5zcmMgPSBpbWFnZXNbaV0uZGF0YXNldC5zcmM7XHJcbiAgICAgICAgaW1hZ2VzW2ldLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1zcmMnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0UGFkZGluZ3MoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2xhc3NlcyA9IHtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiAnLmlzLS1jLXBsJyxcclxuICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogJy5pcy0tYy1wcicsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQxMDBQZXI6ICcuaXMtLWgxMDAnXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBwYWRkaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbmF2YmFyX19pbm5lcicpWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSAkKCcubmF2YmFyJykuaW5uZXJIZWlnaHQoKSArICQoJy5mb290ZXInKS5pbm5lckhlaWdodCgpXHJcblxyXG4gICAgICAgICAgICAkKGNsYXNzZXMucGFkZGluZ0xlZnQpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nTGVmdDogcGFkZGluZy5sZWZ0ICsgMzBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgJChjbGFzc2VzLnBhZGRpbmdSaWdodCkuY3NzKHtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogcGFkZGluZy5sZWZ0ICsgMzBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgJChjbGFzc2VzLmhlaWdodDEwMFBlcikuY3NzKHtcclxuICAgICAgICAgICAgICAgIG1pbkhlaWdodDogJ2NhbGMoMTAwdmggLSAnICsgaGVpZ2h0ICsgJ3B4KSdcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRQYWRkaW5ncygpXHJcblxyXG4gICAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldFBhZGRpbmdzKClcclxuICAgICAgICB9KVxyXG5cclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7IiwieW1hcHMucmVhZHkoaW5pdCk7XHJcblxyXG5mdW5jdGlvbiBpbml0KCkge1xyXG4gICAgdmFyIG15TWFwID0gbmV3IHltYXBzLk1hcChcIm1hcFwiLCB7XHJcbiAgICAgICAgICAgIGNlbnRlcjogWzUyLjk3MTIzMywgMzYuMDU0MTAwXSxcclxuICAgICAgICAgICAgem9vbTogMTcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xzOiBbXVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgc2VhcmNoQ29udHJvbFByb3ZpZGVyOiAneWFuZGV4I3NlYXJjaCdcclxuICAgICAgICB9KVxyXG5cclxuICAgIG15TWFwLmdlb09iamVjdHNcclxuICAgICAgICAuYWRkKG5ldyB5bWFwcy5QbGFjZW1hcmsoWzUyLjk3MTIzMywgMzYuMDU0MTAwXSwge1xyXG4gICAgICAgICAgICBiYWxsb29uQ29udGVudDogJ9Ck0LjRgtC90LXRgSDQmtC70YPQsSA8c3Ryb25nPtCh0LjRgdGC0LXQvNCwINCa0L7QvNC/0LvQtdC60YE8L3N0cm9uZz4nXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBwcmVzZXQ6ICdpc2xhbmRzI3JlZFNwb3J0SWNvbidcclxuICAgICAgICB9KSk7XHJcbn1cclxuIiwiKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXIgbWVudU9wZW4gPSBmYWxzZVxyXG4gICAgICAgIHZhciBpc05hdmJhclRyYW5zcGFyZW50ID0gJCgnLm5hdmJhci5pcy0tdHJhbnNwYXJlbnQnKVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXRCb2R5UGFkZGluZygpIHtcclxuICAgICAgICAgICAgdmFyIHB0ID0gJCgnLm5hdmJhcicpLmlubmVySGVpZ2h0KClcclxuICAgICAgICAgICAgJCgnYm9keS5pcy0tcHQnKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZ1RvcDogcHRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldEJvZHlQYWRkaW5nKClcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0Qm9keVBhZGRpbmcoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9wZW5NZW51KCkge1xyXG4gICAgICAgICAgICBvcGVuT3ZlcmxheSgpXHJcbiAgICAgICAgICAgICQoJy5uYXZiYXJfX2JhcicpLmZvY3VzKClcclxuICAgICAgICAgICAgVHdlZW5NYXgudG8oJy5uYXZiYXJfX2JhcicsIDEuNSwge1xyXG4gICAgICAgICAgICAgICAgZWFzZTogRWxhc3RpYy5lYXNlT3V0LmNvbmZpZygxLCAwLjc1KSxcclxuICAgICAgICAgICAgICAgIHg6IFwiMCVcIixcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgVHdlZW5NYXguc3RhZ2dlckZyb20oJy5uYXZiYXJfX2Jhcl9fbWVudSB1bCBsaScsIDEsIHtcclxuICAgICAgICAgICAgICAgIHg6IFwiLTEwMCVcIiwgXHJcbiAgICAgICAgICAgICAgICBhdXRvQWxwaGE6MCwgXHJcbiAgICAgICAgICAgICAgICByb3RhdGlvblk6XCIxODBcIiwgXHJcbiAgICAgICAgICAgICAgICBwZXJzcGVjdGl2ZTo2MDAsIFxyXG4gICAgICAgICAgICAgICAgZWFzZTogUG93ZXIyLmVhc2VPdXQsXHJcbiAgICAgICAgICAgICAgICBkZWxheTogMC4yXHJcbiAgICAgICAgICAgIH0sIC4xKVxyXG4gICAgICAgICAgICBUd2Vlbk1heC5zdGFnZ2VyRnJvbSgnLm5hdmJhcl9fYmFyX19zb2MgLnNvY2lhbCB1bCBsaScsIDAuNywge1xyXG4gICAgICAgICAgICAgICAgeTogMTAwLFxyXG4gICAgICAgICAgICAgICAgZWFzZTogRWxhc3RpYy5lYXNlT3V0LmNvbmZpZygxLCAwLjc1KSxcclxuICAgICAgICAgICAgICAgIGRlbGF5OiAuNSxcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgICAgICAgfSwgLjEsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbWVudU9wZW4gPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAkKCcubmF2YmFyX19iYXJfX2lubmVyJykuYWRkQ2xhc3MoJ2lzLS1jb21wJylcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNsb3NlTWVudSgpIHtcclxuICAgICAgICAgICAgaWYobWVudU9wZW4pIHtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTWF4LnRvKCcubmF2YmFyX19iYXInLCAxLjUsIHtcclxuICAgICAgICAgICAgICAgICAgICBlYXNlOiBFbGFzdGljLmVhc2VPdXQuY29uZmlnKDEsIDIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHg6IFwiLTEwMCVcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBjbG9zZU92ZXJsYXkoKVxyXG4gICAgICAgICAgICAgICAgJCgnLm5hdmJhcl9fYmFyX19pbm5lcicpLnJlbW92ZUNsYXNzKCdpcy0tY29tcCcpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWVudU9wZW4gPSBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb3Blbk92ZXJsYXkoKSB7XHJcbiAgICAgICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnaXMtLW92ZXJsYXknKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2xvc2VPdmVybGF5KCkge1xyXG4gICAgICAgICAgICBpZihtZW51T3Blbikge1xyXG4gICAgICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdpcy0tb3ZlcmxheScpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNsb3NlQWxsKCkge1xyXG4gICAgICAgICAgICBjbG9zZU1lbnUoKVxyXG4gICAgICAgICAgICBjbG9zZU92ZXJsYXkoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0RGFya05hdmJhcigpXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldERhcmtOYXZiYXIoKSB7XHJcblxyXG4gICAgICAgICAgICBpZigkKGRvY3VtZW50KS5zY3JvbGxUb3AoKSA+ICQoJy5uYXZiYXInKS5pbm5lckhlaWdodCgpKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcubmF2YmFyJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy0tdHJhbnNwYXJlbnQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLS1kZWZhdWx0JylcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYoaXNOYXZiYXJUcmFuc3BhcmVudC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLm5hdmJhcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtLWRlZmF1bHQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLS10cmFuc3BhcmVudCcpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldERhcmtOYXZiYXIoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJy5uYXZiYXJfX21lbnUgYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIG9wZW5NZW51KClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKCcubmF2YmFyX19iYXJfX3RvcF9fY2xvc2UgYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNsb3NlTWVudSgpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnI292ZXJsYXknKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY2xvc2VBbGwoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLmtleWRvd24oZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09IFwiRXNjYXBlXCIpIHtcclxuICAgICAgICAgICAgICAgIGNsb3NlTWVudSgpXHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIuYmFubmVyX19yaWdodF9fY2Fyb3VzZWxfX2l0ZW1zX19ibG9jayBpbWdcIikubW91c2Vkb3duKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIGltYWdlcyA9ICQoJy5iYW5uZXJfX3JpZ2h0X19jYXJvdXNlbF9faXRlbXNfX2Jsb2NrIGltZycpLFxyXG4gICAgICAgICAgICBjdXJyZW50U2xpZGUgPSAwLFxyXG4gICAgICAgICAgICBjb3VudFNsaWRlcyA9IGltYWdlcy5sZW5ndGgsXHJcbiAgICAgICAgICAgIHNsaWRlc0ludGVydmFsID0gNC41XHJcblxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBpbWFnZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoaSA+IDApIHtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTWF4LnRvKGltYWdlcywgc2xpZGVzSW50ZXJ2YWwsIHtcclxuICAgICAgICAgICAgICAgICAgICBlYXNlOiBFeHBvLmVhc2VPdXQsXHJcbiAgICAgICAgICAgICAgICAgICAgeDogXCIxMDAlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVHdlZW5NYXgudG8oaW1hZ2VzW2N1cnJlbnRTbGlkZV0sIHNsaWRlc0ludGVydmFsLCB7XHJcbiAgICAgICAgICAgIGVhc2U6IEV4cG8uZWFzZU91dCxcclxuICAgICAgICAgICAgeDogXCIwJVwiLFxyXG4gICAgICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgY3VycmVudFNsaWRlKytcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlU2xpZGVzKCkge1xyXG4gICAgICAgICAgICBUd2Vlbk1heC50byhpbWFnZXMsIHNsaWRlc0ludGVydmFsLCB7XHJcbiAgICAgICAgICAgICAgICBlYXNlOiBFeHBvLmVhc2VPdXQsXHJcbiAgICAgICAgICAgICAgICB4OiBcIjEwMCVcIixcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgVHdlZW5NYXgudG8oaW1hZ2VzW2N1cnJlbnRTbGlkZV0sIHNsaWRlc0ludGVydmFsLCB7XHJcbiAgICAgICAgICAgICAgICBlYXNlOiBFeHBvLmVhc2VPdXQsXHJcbiAgICAgICAgICAgICAgICB4OiBcIjAlXCIsXHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGN1cnJlbnRTbGlkZSsrO1xyXG4gICAgICAgICAgICBpZihjdXJyZW50U2xpZGUgPj0gY291bnRTbGlkZXMpIGN1cnJlbnRTbGlkZSA9IDBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBjaGFuZ2VTbGlkZXMoKVxyXG4gICAgICAgIH0sIDYwMDApXHJcblxyXG4gICAgICAgICQoJy5iYW5uZXJfX2xlZnRfX3Njcm9sbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjaGFuZ2VTbGlkZXMoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHZhciBfY2xhc3NlcyA9IHtcclxuICAgICAgICAgICAgb3BlbjogXCJpcy0tb3BlblwiXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvcGVuRHJvcGRvd24oY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgICQoY29udGFpbmVyKS5hZGRDbGFzcygnaXMtLW9wZW4nKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2xvc2VEcm9wZG93bigpIHtcclxuICAgICAgICAgICAgJCgnLnNlbGVjdCcpLnJlbW92ZUNsYXNzKF9jbGFzc2VzLm9wZW4pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB0b2dnbGVEcm9wZG93bihjb250YWluZXIpIHtcclxuICAgICAgICAgICAgaWYoJChjb250YWluZXIpLmhhc0NsYXNzKF9jbGFzc2VzLm9wZW4pKSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZURyb3Bkb3duKClcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3BlbkRyb3Bkb3duKGNvbnRhaW5lcilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0cyA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5zZWxlY3QnKVxyXG4gICAgICAgICAgICBpZih0YXJnZXRzLmxlbmd0aCA8PSAwKSBjbG9zZURyb3Bkb3duKClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZWxlY3RJdGVtKGl0ZW0pIHtcclxuICAgICAgICAgICAgYWxlcnQoJ9CS0Ysg0LLRi9Cx0YDQsNC70Lg6ICcgKyBpdGVtKVxyXG4gICAgICAgICAgICBjbG9zZURyb3Bkb3duKClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJy5zZWxlY3RfX2xhYmVsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGlzQ29udGFpbmVyID0gJCh0aGlzKS5wYXJlbnQoJy5zZWxlY3QnKVxyXG4gICAgICAgICAgICB0b2dnbGVEcm9wZG93bih0aGlzQ29udGFpbmVyKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJy5zZWxlY3RfX2Ryb3Bkb3duIHVsIGxpJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGlzVGV4dCA9ICQodGhpcykuaHRtbCgpXHJcbiAgICAgICAgICAgIHNlbGVjdEl0ZW0odGhpc1RleHQpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJCgnLnRhYmxlX19saXN0X19pdGVtcycpLnNsaWNrKHtcclxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA3LFxyXG4gICAgICAgICAgICBwcmV2QXJyb3c6ICcudGFibGVfX2NvbnRyb2xzIGJ1dHRvbi5pcy0tcHJldicsXHJcbiAgICAgICAgICAgIG5leHRBcnJvdzogJy50YWJsZV9fY29udHJvbHMgYnV0dG9uLmlzLS1uZXh0JyxcclxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDcsXHJcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxNjAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDZcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDE0NDAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiA1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogNVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTIwMCxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAzXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjgsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNDQwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KVxyXG5cclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgZnVuY3Rpb24gc2V0RGVza3RvcE5hdnNDb250YWluZXJXaWR0aCgpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdmFyIGl0ZW1XaWR0aCA9ICQoJy56b25lc19fY2Fyb3VzZWxfX2l0ZW0uc3dpcGVyLXNsaWRlJykuY3NzKCd3aWR0aCcpXHJcbiAgICAgICAgICAkKCcuem9uZXNfX2Nhcm91c2VsX19tb3VzZScpLmNzcyh7XHJcbiAgICAgICAgICAgIG1heFdpZHRoOiBpdGVtV2lkdGhcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSwgMTApXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZ1bmN0aW9uIHNldFNsaWRlSW5mbyhzbGlkZUlkKSB7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRTbGlkZSA9ICQoJy56b25lc19fY2Fyb3VzZWxfX2l0ZW1bZGF0YS1pZD1cIicgKyBzbGlkZUlkICsgJ1wiXScpWzBdLFxyXG4gICAgICAgICAgICBjdXJyZW50SW5mbyA9IHtcclxuICAgICAgICAgICAgICBpZDogc2xpZGVJZCxcclxuICAgICAgICAgICAgICB0aXRsZTogJChjdXJyZW50U2xpZGUpLmRhdGEoJ3RpdGxlJyksXHJcbiAgICAgICAgICAgICAgdGV4dDogJChjdXJyZW50U2xpZGUpLmRhdGEoJ3RleHQnKSxcclxuICAgICAgICAgICAgICBsaW5rOiAkKGN1cnJlbnRTbGlkZSkuZGF0YSgnbGluaycpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAkKCcuem9uZXNfX2xlZnRfX2hlYWRpbmcnKS5odG1sKGN1cnJlbnRJbmZvLnRpdGxlKVxyXG4gICAgICAgICQoJy56b25lc19fbGVmdF9fY29udGVudCcpLmh0bWwoY3VycmVudEluZm8udGV4dClcclxuICAgICAgICAkKCcuem9uZXNfX2xlZnRfX2J0biBhJykuYXR0cignaHJlZicsIGN1cnJlbnRJbmZvLmxpbmspXHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBzZXRTbGlkZXNUaXRsZSgpIHtcclxuICAgICAgICB2YXIgc2xpZGVzID0gJCgnLnpvbmVzX19jYXJvdXNlbF9faXRlbScpXHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgIHZhciB0aGlzVGl0bGUgPSAkKHNsaWRlc1tpXSkuZGF0YSgndGl0bGUnKVxyXG4gICAgICAgICAgdGhpc1RpdGxlID0gdGhpc1RpdGxlLnJlcGxhY2UoJyA8YnI+JywgJycpXHJcbiAgICAgICAgICB2YXIgdGhpc1RpdGxlQmxvY2sgPSAkKHNsaWRlc1tpXSkuY2hpbGRyZW4oJy56b25lc19fY2Fyb3VzZWxfX2l0ZW1fX3RpdGxlJylcclxuICAgICAgICAgIHRoaXNUaXRsZUJsb2NrLmh0bWwodGhpc1RpdGxlKVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldERlc2t0b3BOYXZzQ29udGFpbmVyV2lkdGgoKVxyXG5cclxuICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcclxuICAgICAgICBzZXREZXNrdG9wTmF2c0NvbnRhaW5lcldpZHRoKClcclxuICAgICAgfSlcclxuXHJcbiAgICAgIHZhciBzd2lwZXIgPSBuZXcgU3dpcGVyKCcuem9uZXNfX2Nhcm91c2VsX19pbm5lcicsIHtcclxuICAgICAgICBzbGlkZXNQZXJWaWV3OiAgMixcclxuICAgICAgICBzcGFjZUJldHdlZW46IDMwLFxyXG4gICAgICAgIHRvdWNoUmF0aW86IDAsXHJcbiAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgIDEyMDA6IHtcclxuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcclxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxyXG4gICAgICAgICAgICB0b3VjaFJhdGlvOiAyLFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb246IHtcclxuICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzZXRTbGlkZXNUaXRsZSgpXHJcbiAgICAgICAgICAgIHNldFNsaWRlSW5mbygwKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHNsaWRlQ2hhbmdlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0U2xpZGVJbmZvKHN3aXBlci5hY3RpdmVJbmRleClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgJCgnLnpvbmVzX19jYXJvdXNlbF9fbW91c2UgLmlzLS1sZWZ0LCAuem9uZXNfX2Nhcm91c2VsX19jb250cm9scyBidXR0b24uaXMtLXByZXYnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBzd2lwZXIuc2xpZGVQcmV2KCk7XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICAkKCcuem9uZXNfX2Nhcm91c2VsX19tb3VzZSAuaXMtLXJpZ2h0LCAuem9uZXNfX2Nhcm91c2VsX19jb250cm9scyBidXR0b24uaXMtLW5leHQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBzd2lwZXIuc2xpZGVOZXh0KCk7XHJcbiAgICAgIH0pXHJcbiAgICAgIFxyXG4gICAgICAkKCcuem9uZXNfX2Nhcm91c2VsX19tb3VzZScpLmhvdmVyKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgfSwgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICB9KVxyXG5cclxuICAgICAgXHJcblxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiXX0=
