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

        $('.select__label').on('click', function() {
            var thisContainer = $(this).parent('.select')
            toggleDropdown(thisContainer)
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGlvbnMuanMiLCJsYXp5LmpzIiwibWFpbi5qcyIsIm5hdmJhci5qcyIsInNlbGVjdC5qcyIsInpvbmVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICBmdW5jdGlvbiBzZXRTbGlkZUluZm8oc2xpZGVJZCkge1xyXG5cclxuICAgICAgICB2YXIgY3VycmVudFNsaWRlID0gJCgnLmRpcmVjdGlvbnNfX2NlbnRlcl9fY2Fyb3VzZWxfX2l0ZW1bZGF0YS1pZD1cIicgKyBzbGlkZUlkICsgJ1wiXScpWzBdLFxyXG4gICAgICAgIGN1cnJlbnRJbmZvID0ge1xyXG4gICAgICAgICAgaWQ6IHNsaWRlSWQsXHJcbiAgICAgICAgICB0aXRsZTogJChjdXJyZW50U2xpZGUpLmRhdGEoJ3RpdGxlJyksXHJcbiAgICAgICAgICB0ZXh0OiAkKGN1cnJlbnRTbGlkZSkuZGF0YSgndGV4dCcpLFxyXG4gICAgICAgICAgbGluazogJChjdXJyZW50U2xpZGUpLmRhdGEoJ2xpbmsnKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCgnLmRpcmVjdGlvbnNfX3JpZ2h0X19oZWFkaW5nJykuaHRtbChjdXJyZW50SW5mby50aXRsZSlcclxuICAgICAgICAkKCcuZGlyZWN0aW9uc19fcmlnaHRfX3RleHQnKS5odG1sKGN1cnJlbnRJbmZvLnRleHQpXHJcbiAgICAgICAgJCgnLmRpcmVjdGlvbnNfX3JpZ2h0X19idG4gYScpLmF0dHIoJ2hyZWYnLCBjdXJyZW50SW5mby5saW5rKVxyXG5cclxuICAgICAgICAkKCcuZGlyZWN0aW9uc19fbWVudSB1bCBsaScpLnJlbW92ZUNsYXNzKCdpcy0tYWN0aXZlJylcclxuICAgICAgICAkKCcuZGlyZWN0aW9uc19fbWVudSB1bCBsaVtkYXRhLWlkPVwiJyArIGN1cnJlbnRJbmZvLmlkICsgJ1wiXScpLmFkZENsYXNzKCdpcy0tYWN0aXZlJylcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZ1bmN0aW9uIHNldFNsaWRlKHNsaWRlSWQpIHtcclxuICAgICAgICBzd2lwZXIuc2xpZGVUbyhzbGlkZUlkICsgMSlcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIHN3aXBlciA9IG5ldyBTd2lwZXIoJy5kaXJlY3Rpb25zX19jZW50ZXJfX2lubmVyJywge1xyXG4gICAgICAgIHNwYWNlQmV0d2VlbjogMzAsXHJcbiAgICAgICAgc2xpZGVzUGVyVmlldzogIDIsXHJcbiAgICAgICAgZWZmZWN0OiAnZmFkZScsXHJcbiAgICAgICAgbG9vcDogdHJ1ZSxcclxuICAgICAgICB0b3VjaFJhdGlvOiAwLFxyXG4gICAgICAgIG9uOiB7XHJcbiAgICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0U2xpZGVJbmZvKDApXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgc2xpZGVDaGFuZ2U6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzZXRTbGlkZUluZm8odGhpcy5yZWFsSW5kZXgpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgICQoJy5kaXJlY3Rpb25zX19tZW51IHVsIGxpJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHRoaXNJZCA9ICQodGhpcykuZGF0YSgnaWQnKVxyXG4gICAgICAgIHNldFNsaWRlKHRoaXNJZClcclxuICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsImxhenlMb2FkSW1hZ2VzKCk7XHJcblxyXG5mdW5jdGlvbiBsYXp5TG9hZEltYWdlcygpIHtcclxuICAgIHZhciBpbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGF6eScpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBpbWFnZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpbWFnZXNbaV0uc3JjID0gaW1hZ2VzW2ldLmRhdGFzZXQuc3JjO1xyXG4gICAgICAgIGltYWdlc1tpXS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtc3JjJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0iLCIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldFBhZGRpbmdzKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSB7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nTGVmdDogJy5pcy0tYy1wbCcsXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6ICcuaXMtLWMtcHInXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBwYWRkaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbmF2YmFyX19pbm5lcicpWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcblxyXG4gICAgICAgICAgICAkKGNsYXNzZXMucGFkZGluZ0xlZnQpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nTGVmdDogcGFkZGluZy5sZWZ0ICsgMzBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgJChjbGFzc2VzLnBhZGRpbmdSaWdodCkuY3NzKHtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogcGFkZGluZy5sZWZ0ICsgMzBcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRQYWRkaW5ncygpXHJcblxyXG4gICAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldFBhZGRpbmdzKClcclxuICAgICAgICB9KVxyXG5cclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXIgbWVudU9wZW4gPSBmYWxzZVxyXG4gICAgICAgIHZhciBpc05hdmJhclRyYW5zcGFyZW50ID0gJCgnLm5hdmJhci5pcy0tdHJhbnNwYXJlbnQnKVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXRCb2R5UGFkZGluZygpIHtcclxuICAgICAgICAgICAgdmFyIHB0ID0gJCgnLm5hdmJhcicpLmlubmVySGVpZ2h0KClcclxuICAgICAgICAgICAgJCgnYm9keS5pcy0tcHQnKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZ1RvcDogcHRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldEJvZHlQYWRkaW5nKClcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0Qm9keVBhZGRpbmcoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9wZW5NZW51KCkge1xyXG4gICAgICAgICAgICBvcGVuT3ZlcmxheSgpXHJcbiAgICAgICAgICAgICQoJy5uYXZiYXJfX2JhcicpLmZvY3VzKClcclxuICAgICAgICAgICAgVHdlZW5NYXgudG8oJy5uYXZiYXJfX2JhcicsIDEuNSwge1xyXG4gICAgICAgICAgICAgICAgZWFzZTogRWxhc3RpYy5lYXNlT3V0LmNvbmZpZygxLCAwLjc1KSxcclxuICAgICAgICAgICAgICAgIHg6IFwiMCVcIixcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgVHdlZW5NYXguc3RhZ2dlckZyb20oJy5uYXZiYXJfX2Jhcl9fbWVudSB1bCBsaScsIDEsIHtcclxuICAgICAgICAgICAgICAgIHg6IFwiLTEwMCVcIiwgXHJcbiAgICAgICAgICAgICAgICBhdXRvQWxwaGE6MCwgXHJcbiAgICAgICAgICAgICAgICByb3RhdGlvblk6XCIxODBcIiwgXHJcbiAgICAgICAgICAgICAgICBwZXJzcGVjdGl2ZTo2MDAsIFxyXG4gICAgICAgICAgICAgICAgZWFzZTogUG93ZXIyLmVhc2VPdXQsXHJcbiAgICAgICAgICAgICAgICBkZWxheTogMC4yXHJcbiAgICAgICAgICAgIH0sIC4xKVxyXG4gICAgICAgICAgICBUd2Vlbk1heC5zdGFnZ2VyRnJvbSgnLm5hdmJhcl9fYmFyX19zb2MgLnNvY2lhbCB1bCBsaScsIDAuNywge1xyXG4gICAgICAgICAgICAgICAgeTogMTAwLFxyXG4gICAgICAgICAgICAgICAgZWFzZTogRWxhc3RpYy5lYXNlT3V0LmNvbmZpZygxLCAwLjc1KSxcclxuICAgICAgICAgICAgICAgIGRlbGF5OiAuNSxcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgICAgICAgfSwgLjEsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbWVudU9wZW4gPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAkKCcubmF2YmFyX19iYXJfX2lubmVyJykuYWRkQ2xhc3MoJ2lzLS1jb21wJylcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNsb3NlTWVudSgpIHtcclxuICAgICAgICAgICAgaWYobWVudU9wZW4pIHtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTWF4LnRvKCcubmF2YmFyX19iYXInLCAxLjUsIHtcclxuICAgICAgICAgICAgICAgICAgICBlYXNlOiBFbGFzdGljLmVhc2VPdXQuY29uZmlnKDEsIDIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHg6IFwiLTEwMCVcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBjbG9zZU92ZXJsYXkoKVxyXG4gICAgICAgICAgICAgICAgJCgnLm5hdmJhcl9fYmFyX19pbm5lcicpLnJlbW92ZUNsYXNzKCdpcy0tY29tcCcpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWVudU9wZW4gPSBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb3Blbk92ZXJsYXkoKSB7XHJcbiAgICAgICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnaXMtLW92ZXJsYXknKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2xvc2VPdmVybGF5KCkge1xyXG4gICAgICAgICAgICBpZihtZW51T3Blbikge1xyXG4gICAgICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdpcy0tb3ZlcmxheScpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNsb3NlQWxsKCkge1xyXG4gICAgICAgICAgICBjbG9zZU1lbnUoKVxyXG4gICAgICAgICAgICBjbG9zZU92ZXJsYXkoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0RGFya05hdmJhcigpXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldERhcmtOYXZiYXIoKSB7XHJcblxyXG4gICAgICAgICAgICBpZigkKGRvY3VtZW50KS5zY3JvbGxUb3AoKSA+ICQoJy5uYXZiYXInKS5pbm5lckhlaWdodCgpKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcubmF2YmFyJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy0tdHJhbnNwYXJlbnQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLS1kZWZhdWx0JylcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYoaXNOYXZiYXJUcmFuc3BhcmVudC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLm5hdmJhcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtLWRlZmF1bHQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLS10cmFuc3BhcmVudCcpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldERhcmtOYXZiYXIoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJy5uYXZiYXJfX21lbnUgYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIG9wZW5NZW51KClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKCcubmF2YmFyX19iYXJfX3RvcF9fY2xvc2UgYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNsb3NlTWVudSgpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnI292ZXJsYXknKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY2xvc2VBbGwoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLmtleWRvd24oZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09IFwiRXNjYXBlXCIpIHtcclxuICAgICAgICAgICAgICAgIGNsb3NlTWVudSgpXHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIuYmFubmVyX19yaWdodF9fY2Fyb3VzZWxfX2l0ZW1zX19ibG9jayBpbWdcIikubW91c2Vkb3duKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIGltYWdlcyA9ICQoJy5iYW5uZXJfX3JpZ2h0X19jYXJvdXNlbF9faXRlbXNfX2Jsb2NrIGltZycpLFxyXG4gICAgICAgICAgICBjdXJyZW50U2xpZGUgPSAwLFxyXG4gICAgICAgICAgICBjb3VudFNsaWRlcyA9IGltYWdlcy5sZW5ndGgsXHJcbiAgICAgICAgICAgIHNsaWRlc0ludGVydmFsID0gNC41XHJcblxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBpbWFnZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoaSA+IDApIHtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTWF4LnRvKGltYWdlcywgc2xpZGVzSW50ZXJ2YWwsIHtcclxuICAgICAgICAgICAgICAgICAgICBlYXNlOiBFeHBvLmVhc2VPdXQsXHJcbiAgICAgICAgICAgICAgICAgICAgeDogXCIxMDAlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVHdlZW5NYXgudG8oaW1hZ2VzW2N1cnJlbnRTbGlkZV0sIHNsaWRlc0ludGVydmFsLCB7XHJcbiAgICAgICAgICAgIGVhc2U6IEV4cG8uZWFzZU91dCxcclxuICAgICAgICAgICAgeDogXCIwJVwiLFxyXG4gICAgICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgY3VycmVudFNsaWRlKytcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlU2xpZGVzKCkge1xyXG4gICAgICAgICAgICBUd2Vlbk1heC50byhpbWFnZXMsIHNsaWRlc0ludGVydmFsLCB7XHJcbiAgICAgICAgICAgICAgICBlYXNlOiBFeHBvLmVhc2VPdXQsXHJcbiAgICAgICAgICAgICAgICB4OiBcIjEwMCVcIixcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgVHdlZW5NYXgudG8oaW1hZ2VzW2N1cnJlbnRTbGlkZV0sIHNsaWRlc0ludGVydmFsLCB7XHJcbiAgICAgICAgICAgICAgICBlYXNlOiBFeHBvLmVhc2VPdXQsXHJcbiAgICAgICAgICAgICAgICB4OiBcIjAlXCIsXHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGN1cnJlbnRTbGlkZSsrO1xyXG4gICAgICAgICAgICBpZihjdXJyZW50U2xpZGUgPj0gY291bnRTbGlkZXMpIGN1cnJlbnRTbGlkZSA9IDBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBjaGFuZ2VTbGlkZXMoKVxyXG4gICAgICAgIH0sIDYwMDApXHJcblxyXG4gICAgICAgICQoJy5iYW5uZXJfX2xlZnRfX3Njcm9sbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjaGFuZ2VTbGlkZXMoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHZhciBfY2xhc3NlcyA9IHtcclxuICAgICAgICAgICAgb3BlbjogXCJpcy0tb3BlblwiXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvcGVuRHJvcGRvd24oY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgICQoY29udGFpbmVyKS5hZGRDbGFzcygnaXMtLW9wZW4nKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2xvc2VEcm9wZG93bigpIHtcclxuICAgICAgICAgICAgJCgnLnNlbGVjdCcpLnJlbW92ZUNsYXNzKF9jbGFzc2VzLm9wZW4pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB0b2dnbGVEcm9wZG93bihjb250YWluZXIpIHtcclxuICAgICAgICAgICAgaWYoJChjb250YWluZXIpLmhhc0NsYXNzKF9jbGFzc2VzLm9wZW4pKSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZURyb3Bkb3duKClcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3BlbkRyb3Bkb3duKGNvbnRhaW5lcilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCgnLnNlbGVjdF9fbGFiZWwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHRoaXNDb250YWluZXIgPSAkKHRoaXMpLnBhcmVudCgnLnNlbGVjdCcpXHJcbiAgICAgICAgICAgIHRvZ2dsZURyb3Bkb3duKHRoaXNDb250YWluZXIpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIHNldERlc2t0b3BOYXZzQ29udGFpbmVyV2lkdGgoKSB7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBpdGVtV2lkdGggPSAkKCcuem9uZXNfX2Nhcm91c2VsX19pdGVtLnN3aXBlci1zbGlkZScpLmNzcygnd2lkdGgnKVxyXG4gICAgICAgICAgJCgnLnpvbmVzX19jYXJvdXNlbF9fbW91c2UnKS5jc3Moe1xyXG4gICAgICAgICAgICBtYXhXaWR0aDogaXRlbVdpZHRoXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sIDEwKVxyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBzZXRTbGlkZUluZm8oc2xpZGVJZCkge1xyXG4gICAgICAgIHZhciBjdXJyZW50U2xpZGUgPSAkKCcuem9uZXNfX2Nhcm91c2VsX19pdGVtW2RhdGEtaWQ9XCInICsgc2xpZGVJZCArICdcIl0nKVswXSxcclxuICAgICAgICAgICAgY3VycmVudEluZm8gPSB7XHJcbiAgICAgICAgICAgICAgaWQ6IHNsaWRlSWQsXHJcbiAgICAgICAgICAgICAgdGl0bGU6ICQoY3VycmVudFNsaWRlKS5kYXRhKCd0aXRsZScpLFxyXG4gICAgICAgICAgICAgIHRleHQ6ICQoY3VycmVudFNsaWRlKS5kYXRhKCd0ZXh0JyksXHJcbiAgICAgICAgICAgICAgbGluazogJChjdXJyZW50U2xpZGUpLmRhdGEoJ2xpbmsnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgJCgnLnpvbmVzX19sZWZ0X19oZWFkaW5nJykuaHRtbChjdXJyZW50SW5mby50aXRsZSlcclxuICAgICAgICAkKCcuem9uZXNfX2xlZnRfX2NvbnRlbnQnKS5odG1sKGN1cnJlbnRJbmZvLnRleHQpXHJcbiAgICAgICAgJCgnLnpvbmVzX19sZWZ0X19idG4gYScpLmF0dHIoJ2hyZWYnLCBjdXJyZW50SW5mby5saW5rKVxyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gc2V0U2xpZGVzVGl0bGUoKSB7XHJcbiAgICAgICAgdmFyIHNsaWRlcyA9ICQoJy56b25lc19fY2Fyb3VzZWxfX2l0ZW0nKVxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICB2YXIgdGhpc1RpdGxlID0gJChzbGlkZXNbaV0pLmRhdGEoJ3RpdGxlJylcclxuICAgICAgICAgIHRoaXNUaXRsZSA9IHRoaXNUaXRsZS5yZXBsYWNlKCcgPGJyPicsICcnKVxyXG4gICAgICAgICAgdmFyIHRoaXNUaXRsZUJsb2NrID0gJChzbGlkZXNbaV0pLmNoaWxkcmVuKCcuem9uZXNfX2Nhcm91c2VsX19pdGVtX190aXRsZScpXHJcbiAgICAgICAgICB0aGlzVGl0bGVCbG9jay5odG1sKHRoaXNUaXRsZSlcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXREZXNrdG9wTmF2c0NvbnRhaW5lcldpZHRoKClcclxuXHJcbiAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc2V0RGVza3RvcE5hdnNDb250YWluZXJXaWR0aCgpXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICB2YXIgc3dpcGVyID0gbmV3IFN3aXBlcignLnpvbmVzX19jYXJvdXNlbF9faW5uZXInLCB7XHJcbiAgICAgICAgc2xpZGVzUGVyVmlldzogIDIsXHJcbiAgICAgICAgc3BhY2VCZXR3ZWVuOiAzMCxcclxuICAgICAgICB0b3VjaFJhdGlvOiAwLFxyXG4gICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAxMjAwOiB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMCxcclxuICAgICAgICAgICAgdG91Y2hSYXRpbzogMixcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uOiB7XHJcbiAgICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0U2xpZGVzVGl0bGUoKVxyXG4gICAgICAgICAgICBzZXRTbGlkZUluZm8oMClcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBzbGlkZUNoYW5nZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldFNsaWRlSW5mbyhzd2lwZXIuYWN0aXZlSW5kZXgpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgICQoJy56b25lc19fY2Fyb3VzZWxfX21vdXNlIC5pcy0tbGVmdCwgLnpvbmVzX19jYXJvdXNlbF9fY29udHJvbHMgYnV0dG9uLmlzLS1wcmV2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc3dpcGVyLnNsaWRlUHJldigpO1xyXG4gICAgICB9KVxyXG5cclxuICAgICAgJCgnLnpvbmVzX19jYXJvdXNlbF9fbW91c2UgLmlzLS1yaWdodCwgLnpvbmVzX19jYXJvdXNlbF9fY29udHJvbHMgYnV0dG9uLmlzLS1uZXh0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc3dpcGVyLnNsaWRlTmV4dCgpO1xyXG4gICAgICB9KVxyXG4gICAgICBcclxuICAgICAgJCgnLnpvbmVzX19jYXJvdXNlbF9fbW91c2UnKS5ob3ZlcihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIH0sIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgfSlcclxuXHJcbiAgICAgIFxyXG5cclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7Il19
