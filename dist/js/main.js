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
                paddingRight: '.is--c-pr'
            }

            var padding = document.getElementsByClassName('navbar__inner')[0].getBoundingClientRect()

            $(classes.paddingLeft).css({
                paddingLeft: padding.left + 30
            })
            $(classes.paddingRight).css({
                paddingRight: padding.left + 30
            })

        }

        setPaddings()

        $(window).resize(function() {
            setPaddings()
        })

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGlvbnMuanMiLCJsYXp5LmpzIiwibWFpbi5qcyIsIm5hdmJhci5qcyIsInNlbGVjdC5qcyIsInRhYmxlLmpzIiwiem9uZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgZnVuY3Rpb24gc2V0U2xpZGVJbmZvKHNsaWRlSWQpIHtcclxuXHJcbiAgICAgICAgdmFyIGN1cnJlbnRTbGlkZSA9ICQoJy5kaXJlY3Rpb25zX19jZW50ZXJfX2Nhcm91c2VsX19pdGVtW2RhdGEtaWQ9XCInICsgc2xpZGVJZCArICdcIl0nKVswXSxcclxuICAgICAgICBjdXJyZW50SW5mbyA9IHtcclxuICAgICAgICAgIGlkOiBzbGlkZUlkLFxyXG4gICAgICAgICAgdGl0bGU6ICQoY3VycmVudFNsaWRlKS5kYXRhKCd0aXRsZScpLFxyXG4gICAgICAgICAgdGV4dDogJChjdXJyZW50U2xpZGUpLmRhdGEoJ3RleHQnKSxcclxuICAgICAgICAgIGxpbms6ICQoY3VycmVudFNsaWRlKS5kYXRhKCdsaW5rJylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJy5kaXJlY3Rpb25zX19yaWdodF9faGVhZGluZycpLmh0bWwoY3VycmVudEluZm8udGl0bGUpXHJcbiAgICAgICAgJCgnLmRpcmVjdGlvbnNfX3JpZ2h0X190ZXh0JykuaHRtbChjdXJyZW50SW5mby50ZXh0KVxyXG4gICAgICAgICQoJy5kaXJlY3Rpb25zX19yaWdodF9fYnRuIGEnKS5hdHRyKCdocmVmJywgY3VycmVudEluZm8ubGluaylcclxuXHJcbiAgICAgICAgJCgnLmRpcmVjdGlvbnNfX21lbnUgdWwgbGknKS5yZW1vdmVDbGFzcygnaXMtLWFjdGl2ZScpXHJcbiAgICAgICAgJCgnLmRpcmVjdGlvbnNfX21lbnUgdWwgbGlbZGF0YS1pZD1cIicgKyBjdXJyZW50SW5mby5pZCArICdcIl0nKS5hZGRDbGFzcygnaXMtLWFjdGl2ZScpXHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBzZXRTbGlkZShzbGlkZUlkKSB7XHJcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oc2xpZGVJZCArIDEpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBzd2lwZXIgPSBuZXcgU3dpcGVyKCcuZGlyZWN0aW9uc19fY2VudGVyX19pbm5lcicsIHtcclxuICAgICAgICBzcGFjZUJldHdlZW46IDMwLFxyXG4gICAgICAgIHNsaWRlc1BlclZpZXc6ICAyLFxyXG4gICAgICAgIGVmZmVjdDogJ2ZhZGUnLFxyXG4gICAgICAgIGxvb3A6IHRydWUsXHJcbiAgICAgICAgdG91Y2hSYXRpbzogMCxcclxuICAgICAgICBvbjoge1xyXG4gICAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldFNsaWRlSW5mbygwKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHNsaWRlQ2hhbmdlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0U2xpZGVJbmZvKHRoaXMucmVhbEluZGV4KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICAkKCcuZGlyZWN0aW9uc19fbWVudSB1bCBsaScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciB0aGlzSWQgPSAkKHRoaXMpLmRhdGEoJ2lkJylcclxuICAgICAgICBzZXRTbGlkZSh0aGlzSWQpXHJcbiAgICAgIH0pXHJcblxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiLCJsYXp5TG9hZEltYWdlcygpO1xyXG5cclxuZnVuY3Rpb24gbGF6eUxvYWRJbWFnZXMoKSB7XHJcbiAgICB2YXIgaW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxhenknKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgaW1hZ2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaW1hZ2VzW2ldLnNyYyA9IGltYWdlc1tpXS5kYXRhc2V0LnNyYztcclxuICAgICAgICBpbWFnZXNbaV0ucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXNyYycpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59IiwiKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXRQYWRkaW5ncygpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBjbGFzc2VzID0ge1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZ0xlZnQ6ICcuaXMtLWMtcGwnLFxyXG4gICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiAnLmlzLS1jLXByJ1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgcGFkZGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ25hdmJhcl9faW5uZXInKVswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxyXG5cclxuICAgICAgICAgICAgJChjbGFzc2VzLnBhZGRpbmdMZWZ0KS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZ0xlZnQ6IHBhZGRpbmcubGVmdCArIDMwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICQoY2xhc3Nlcy5wYWRkaW5nUmlnaHQpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6IHBhZGRpbmcubGVmdCArIDMwXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0UGFkZGluZ3MoKVxyXG5cclxuICAgICAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzZXRQYWRkaW5ncygpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgdmFyIG1lbnVPcGVuID0gZmFsc2VcclxuICAgICAgICB2YXIgaXNOYXZiYXJUcmFuc3BhcmVudCA9ICQoJy5uYXZiYXIuaXMtLXRyYW5zcGFyZW50JylcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0Qm9keVBhZGRpbmcoKSB7XHJcbiAgICAgICAgICAgIHZhciBwdCA9ICQoJy5uYXZiYXInKS5pbm5lckhlaWdodCgpXHJcbiAgICAgICAgICAgICQoJ2JvZHkuaXMtLXB0JykuY3NzKHtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmdUb3A6IHB0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRCb2R5UGFkZGluZygpXHJcblxyXG4gICAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldEJvZHlQYWRkaW5nKClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvcGVuTWVudSgpIHtcclxuICAgICAgICAgICAgb3Blbk92ZXJsYXkoKVxyXG4gICAgICAgICAgICAkKCcubmF2YmFyX19iYXInKS5mb2N1cygpXHJcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKCcubmF2YmFyX19iYXInLCAxLjUsIHtcclxuICAgICAgICAgICAgICAgIGVhc2U6IEVsYXN0aWMuZWFzZU91dC5jb25maWcoMSwgMC43NSksXHJcbiAgICAgICAgICAgICAgICB4OiBcIjAlXCIsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIFR3ZWVuTWF4LnN0YWdnZXJGcm9tKCcubmF2YmFyX19iYXJfX21lbnUgdWwgbGknLCAxLCB7XHJcbiAgICAgICAgICAgICAgICB4OiBcIi0xMDAlXCIsIFxyXG4gICAgICAgICAgICAgICAgYXV0b0FscGhhOjAsIFxyXG4gICAgICAgICAgICAgICAgcm90YXRpb25ZOlwiMTgwXCIsIFxyXG4gICAgICAgICAgICAgICAgcGVyc3BlY3RpdmU6NjAwLCBcclxuICAgICAgICAgICAgICAgIGVhc2U6IFBvd2VyMi5lYXNlT3V0LFxyXG4gICAgICAgICAgICAgICAgZGVsYXk6IDAuMlxyXG4gICAgICAgICAgICB9LCAuMSlcclxuICAgICAgICAgICAgVHdlZW5NYXguc3RhZ2dlckZyb20oJy5uYXZiYXJfX2Jhcl9fc29jIC5zb2NpYWwgdWwgbGknLCAwLjcsIHtcclxuICAgICAgICAgICAgICAgIHk6IDEwMCxcclxuICAgICAgICAgICAgICAgIGVhc2U6IEVsYXN0aWMuZWFzZU91dC5jb25maWcoMSwgMC43NSksXHJcbiAgICAgICAgICAgICAgICBkZWxheTogLjUsXHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgICAgICAgIH0sIC4xLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIG1lbnVPcGVuID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgJCgnLm5hdmJhcl9fYmFyX19pbm5lcicpLmFkZENsYXNzKCdpcy0tY29tcCcpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjbG9zZU1lbnUoKSB7XHJcbiAgICAgICAgICAgIGlmKG1lbnVPcGVuKSB7XHJcbiAgICAgICAgICAgICAgICBUd2Vlbk1heC50bygnLm5hdmJhcl9fYmFyJywgMS41LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWFzZTogRWxhc3RpYy5lYXNlT3V0LmNvbmZpZygxLCAyKSxcclxuICAgICAgICAgICAgICAgICAgICB4OiBcIi0xMDAlXCIsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgY2xvc2VPdmVybGF5KClcclxuICAgICAgICAgICAgICAgICQoJy5uYXZiYXJfX2Jhcl9faW5uZXInKS5yZW1vdmVDbGFzcygnaXMtLWNvbXAnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1lbnVPcGVuID0gZmFsc2VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9wZW5PdmVybGF5KCkge1xyXG4gICAgICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2lzLS1vdmVybGF5JylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNsb3NlT3ZlcmxheSgpIHtcclxuICAgICAgICAgICAgaWYobWVudU9wZW4pIHtcclxuICAgICAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaXMtLW92ZXJsYXknKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjbG9zZUFsbCgpIHtcclxuICAgICAgICAgICAgY2xvc2VNZW51KClcclxuICAgICAgICAgICAgY2xvc2VPdmVybGF5KClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldERhcmtOYXZiYXIoKVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXREYXJrTmF2YmFyKCkge1xyXG5cclxuICAgICAgICAgICAgaWYoJChkb2N1bWVudCkuc2Nyb2xsVG9wKCkgPiAkKCcubmF2YmFyJykuaW5uZXJIZWlnaHQoKSkge1xyXG4gICAgICAgICAgICAgICAgJCgnLm5hdmJhcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtLXRyYW5zcGFyZW50JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy0tZGVmYXVsdCcpXHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmKGlzTmF2YmFyVHJhbnNwYXJlbnQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5uYXZiYXInKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2lzLS1kZWZhdWx0JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdpcy0tdHJhbnNwYXJlbnQnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzZXREYXJrTmF2YmFyKClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKCcubmF2YmFyX19tZW51IGJ1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBvcGVuTWVudSgpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnLm5hdmJhcl9fYmFyX190b3BfX2Nsb3NlIGJ1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjbG9zZU1lbnUoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJyNvdmVybGF5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNsb3NlQWxsKClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5rZXlkb3duKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUua2V5ID09PSBcIkVzY2FwZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZU1lbnUoKVxyXG4gICAgICAgICAgIH1cclxuICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLmJhbm5lcl9fcmlnaHRfX2Nhcm91c2VsX19pdGVtc19fYmxvY2sgaW1nXCIpLm1vdXNlZG93bihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhciBpbWFnZXMgPSAkKCcuYmFubmVyX19yaWdodF9fY2Fyb3VzZWxfX2l0ZW1zX19ibG9jayBpbWcnKSxcclxuICAgICAgICAgICAgY3VycmVudFNsaWRlID0gMCxcclxuICAgICAgICAgICAgY291bnRTbGlkZXMgPSBpbWFnZXMubGVuZ3RoLFxyXG4gICAgICAgICAgICBzbGlkZXNJbnRlcnZhbCA9IDQuNVxyXG5cclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgaW1hZ2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKGkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBUd2Vlbk1heC50byhpbWFnZXMsIHNsaWRlc0ludGVydmFsLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWFzZTogRXhwby5lYXNlT3V0LFxyXG4gICAgICAgICAgICAgICAgICAgIHg6IFwiMTAwJVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFR3ZWVuTWF4LnRvKGltYWdlc1tjdXJyZW50U2xpZGVdLCBzbGlkZXNJbnRlcnZhbCwge1xyXG4gICAgICAgICAgICBlYXNlOiBFeHBvLmVhc2VPdXQsXHJcbiAgICAgICAgICAgIHg6IFwiMCVcIixcclxuICAgICAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGN1cnJlbnRTbGlkZSsrXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNoYW5nZVNsaWRlcygpIHtcclxuICAgICAgICAgICAgVHdlZW5NYXgudG8oaW1hZ2VzLCBzbGlkZXNJbnRlcnZhbCwge1xyXG4gICAgICAgICAgICAgICAgZWFzZTogRXhwby5lYXNlT3V0LFxyXG4gICAgICAgICAgICAgICAgeDogXCIxMDAlXCIsXHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKGltYWdlc1tjdXJyZW50U2xpZGVdLCBzbGlkZXNJbnRlcnZhbCwge1xyXG4gICAgICAgICAgICAgICAgZWFzZTogRXhwby5lYXNlT3V0LFxyXG4gICAgICAgICAgICAgICAgeDogXCIwJVwiLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjdXJyZW50U2xpZGUrKztcclxuICAgICAgICAgICAgaWYoY3VycmVudFNsaWRlID49IGNvdW50U2xpZGVzKSBjdXJyZW50U2xpZGUgPSAwXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gY2hhbmdlU2xpZGVzKClcclxuICAgICAgICB9LCA2MDAwKVxyXG5cclxuICAgICAgICAkKCcuYmFubmVyX19sZWZ0X19zY3JvbGwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY2hhbmdlU2xpZGVzKClcclxuICAgICAgICB9KVxyXG5cclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXIgX2NsYXNzZXMgPSB7XHJcbiAgICAgICAgICAgIG9wZW46IFwiaXMtLW9wZW5cIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb3BlbkRyb3Bkb3duKGNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICAkKGNvbnRhaW5lcikuYWRkQ2xhc3MoJ2lzLS1vcGVuJylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNsb3NlRHJvcGRvd24oKSB7XHJcbiAgICAgICAgICAgICQoJy5zZWxlY3QnKS5yZW1vdmVDbGFzcyhfY2xhc3Nlcy5vcGVuKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdG9nZ2xlRHJvcGRvd24oY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIGlmKCQoY29udGFpbmVyKS5oYXNDbGFzcyhfY2xhc3Nlcy5vcGVuKSkge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VEcm9wZG93bigpXHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIG9wZW5Ecm9wZG93bihjb250YWluZXIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldHMgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCcuc2VsZWN0JylcclxuICAgICAgICAgICAgaWYodGFyZ2V0cy5sZW5ndGggPD0gMCkgY2xvc2VEcm9wZG93bigpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2VsZWN0SXRlbShpdGVtKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCfQktGLINCy0YvQsdGA0LDQu9C4OiAnICsgaXRlbSlcclxuICAgICAgICAgICAgY2xvc2VEcm9wZG93bigpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCcuc2VsZWN0X19sYWJlbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhpc0NvbnRhaW5lciA9ICQodGhpcykucGFyZW50KCcuc2VsZWN0JylcclxuICAgICAgICAgICAgdG9nZ2xlRHJvcGRvd24odGhpc0NvbnRhaW5lcilcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKCcuc2VsZWN0X19kcm9wZG93biB1bCBsaScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhpc1RleHQgPSAkKHRoaXMpLmh0bWwoKVxyXG4gICAgICAgICAgICBzZWxlY3RJdGVtKHRoaXNUZXh0KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICQoJy50YWJsZV9fbGlzdF9faXRlbXMnKS5zbGljayh7XHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNyxcclxuICAgICAgICAgICAgcHJldkFycm93OiAnLnRhYmxlX19jb250cm9scyBidXR0b24uaXMtLXByZXYnLFxyXG4gICAgICAgICAgICBuZXh0QXJyb3c6ICcudGFibGVfX2NvbnRyb2xzIGJ1dHRvbi5pcy0tbmV4dCcsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiA3LFxyXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTYwMCxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiA2XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxNDQwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogNSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDEyMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogM1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY4LFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDQ0MCxcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIHNldERlc2t0b3BOYXZzQ29udGFpbmVyV2lkdGgoKSB7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBpdGVtV2lkdGggPSAkKCcuem9uZXNfX2Nhcm91c2VsX19pdGVtLnN3aXBlci1zbGlkZScpLmNzcygnd2lkdGgnKVxyXG4gICAgICAgICAgJCgnLnpvbmVzX19jYXJvdXNlbF9fbW91c2UnKS5jc3Moe1xyXG4gICAgICAgICAgICBtYXhXaWR0aDogaXRlbVdpZHRoXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sIDEwKVxyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBzZXRTbGlkZUluZm8oc2xpZGVJZCkge1xyXG4gICAgICAgIHZhciBjdXJyZW50U2xpZGUgPSAkKCcuem9uZXNfX2Nhcm91c2VsX19pdGVtW2RhdGEtaWQ9XCInICsgc2xpZGVJZCArICdcIl0nKVswXSxcclxuICAgICAgICAgICAgY3VycmVudEluZm8gPSB7XHJcbiAgICAgICAgICAgICAgaWQ6IHNsaWRlSWQsXHJcbiAgICAgICAgICAgICAgdGl0bGU6ICQoY3VycmVudFNsaWRlKS5kYXRhKCd0aXRsZScpLFxyXG4gICAgICAgICAgICAgIHRleHQ6ICQoY3VycmVudFNsaWRlKS5kYXRhKCd0ZXh0JyksXHJcbiAgICAgICAgICAgICAgbGluazogJChjdXJyZW50U2xpZGUpLmRhdGEoJ2xpbmsnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgJCgnLnpvbmVzX19sZWZ0X19oZWFkaW5nJykuaHRtbChjdXJyZW50SW5mby50aXRsZSlcclxuICAgICAgICAkKCcuem9uZXNfX2xlZnRfX2NvbnRlbnQnKS5odG1sKGN1cnJlbnRJbmZvLnRleHQpXHJcbiAgICAgICAgJCgnLnpvbmVzX19sZWZ0X19idG4gYScpLmF0dHIoJ2hyZWYnLCBjdXJyZW50SW5mby5saW5rKVxyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gc2V0U2xpZGVzVGl0bGUoKSB7XHJcbiAgICAgICAgdmFyIHNsaWRlcyA9ICQoJy56b25lc19fY2Fyb3VzZWxfX2l0ZW0nKVxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICB2YXIgdGhpc1RpdGxlID0gJChzbGlkZXNbaV0pLmRhdGEoJ3RpdGxlJylcclxuICAgICAgICAgIHRoaXNUaXRsZSA9IHRoaXNUaXRsZS5yZXBsYWNlKCcgPGJyPicsICcnKVxyXG4gICAgICAgICAgdmFyIHRoaXNUaXRsZUJsb2NrID0gJChzbGlkZXNbaV0pLmNoaWxkcmVuKCcuem9uZXNfX2Nhcm91c2VsX19pdGVtX190aXRsZScpXHJcbiAgICAgICAgICB0aGlzVGl0bGVCbG9jay5odG1sKHRoaXNUaXRsZSlcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXREZXNrdG9wTmF2c0NvbnRhaW5lcldpZHRoKClcclxuXHJcbiAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc2V0RGVza3RvcE5hdnNDb250YWluZXJXaWR0aCgpXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICB2YXIgc3dpcGVyID0gbmV3IFN3aXBlcignLnpvbmVzX19jYXJvdXNlbF9faW5uZXInLCB7XHJcbiAgICAgICAgc2xpZGVzUGVyVmlldzogIDIsXHJcbiAgICAgICAgc3BhY2VCZXR3ZWVuOiAzMCxcclxuICAgICAgICB0b3VjaFJhdGlvOiAwLFxyXG4gICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAxMjAwOiB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMCxcclxuICAgICAgICAgICAgdG91Y2hSYXRpbzogMixcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uOiB7XHJcbiAgICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0U2xpZGVzVGl0bGUoKVxyXG4gICAgICAgICAgICBzZXRTbGlkZUluZm8oMClcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBzbGlkZUNoYW5nZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldFNsaWRlSW5mbyhzd2lwZXIuYWN0aXZlSW5kZXgpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgICQoJy56b25lc19fY2Fyb3VzZWxfX21vdXNlIC5pcy0tbGVmdCwgLnpvbmVzX19jYXJvdXNlbF9fY29udHJvbHMgYnV0dG9uLmlzLS1wcmV2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc3dpcGVyLnNsaWRlUHJldigpO1xyXG4gICAgICB9KVxyXG5cclxuICAgICAgJCgnLnpvbmVzX19jYXJvdXNlbF9fbW91c2UgLmlzLS1yaWdodCwgLnpvbmVzX19jYXJvdXNlbF9fY29udHJvbHMgYnV0dG9uLmlzLS1uZXh0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc3dpcGVyLnNsaWRlTmV4dCgpO1xyXG4gICAgICB9KVxyXG4gICAgICBcclxuICAgICAgJCgnLnpvbmVzX19jYXJvdXNlbF9fbW91c2UnKS5ob3ZlcihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIH0sIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgfSlcclxuXHJcbiAgICAgIFxyXG5cclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7Il19
