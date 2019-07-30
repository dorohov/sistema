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
                console.log('default')
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJuYXZiYXIuanMiLCJ6b25lcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldFBhZGRpbmdzKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSB7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nTGVmdDogJy5pcy0tYy1wbCcsXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHQ6ICcuaXMtLWMtcHInXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBwYWRkaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbmF2YmFyX19pbm5lcicpWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcblxyXG4gICAgICAgICAgICAkKGNsYXNzZXMucGFkZGluZ0xlZnQpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nTGVmdDogcGFkZGluZy5sZWZ0ICsgMzBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgJChjbGFzc2VzLnBhZGRpbmdSaWdodCkuY3NzKHtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogcGFkZGluZy5sZWZ0ICsgMzBcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRQYWRkaW5ncygpXHJcblxyXG4gICAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldFBhZGRpbmdzKClcclxuICAgICAgICB9KVxyXG5cclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXIgbWVudU9wZW4gPSBmYWxzZVxyXG4gICAgICAgIHZhciBpc05hdmJhclRyYW5zcGFyZW50ID0gJCgnLm5hdmJhci5pcy0tdHJhbnNwYXJlbnQnKVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXRCb2R5UGFkZGluZygpIHtcclxuICAgICAgICAgICAgdmFyIHB0ID0gJCgnLm5hdmJhcicpLmlubmVySGVpZ2h0KClcclxuICAgICAgICAgICAgJCgnYm9keS5pcy0tcHQnKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZ1RvcDogcHRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldEJvZHlQYWRkaW5nKClcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0Qm9keVBhZGRpbmcoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9wZW5NZW51KCkge1xyXG4gICAgICAgICAgICBvcGVuT3ZlcmxheSgpXHJcbiAgICAgICAgICAgICQoJy5uYXZiYXJfX2JhcicpLmZvY3VzKClcclxuICAgICAgICAgICAgVHdlZW5NYXgudG8oJy5uYXZiYXJfX2JhcicsIDEuNSwge1xyXG4gICAgICAgICAgICAgICAgZWFzZTogRWxhc3RpYy5lYXNlT3V0LmNvbmZpZygxLCAwLjc1KSxcclxuICAgICAgICAgICAgICAgIHg6IFwiMCVcIixcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgVHdlZW5NYXguc3RhZ2dlckZyb20oJy5uYXZiYXJfX2Jhcl9fbWVudSB1bCBsaScsIDEsIHtcclxuICAgICAgICAgICAgICAgIHg6IFwiLTEwMCVcIiwgXHJcbiAgICAgICAgICAgICAgICBhdXRvQWxwaGE6MCwgXHJcbiAgICAgICAgICAgICAgICByb3RhdGlvblk6XCIxODBcIiwgXHJcbiAgICAgICAgICAgICAgICBwZXJzcGVjdGl2ZTo2MDAsIFxyXG4gICAgICAgICAgICAgICAgZWFzZTogUG93ZXIyLmVhc2VPdXQsXHJcbiAgICAgICAgICAgICAgICBkZWxheTogMC4yXHJcbiAgICAgICAgICAgIH0sIC4xKVxyXG4gICAgICAgICAgICBUd2Vlbk1heC5zdGFnZ2VyRnJvbSgnLm5hdmJhcl9fYmFyX19zb2MgLnNvY2lhbCB1bCBsaScsIDAuNywge1xyXG4gICAgICAgICAgICAgICAgeTogMTAwLFxyXG4gICAgICAgICAgICAgICAgZWFzZTogRWxhc3RpYy5lYXNlT3V0LmNvbmZpZygxLCAwLjc1KSxcclxuICAgICAgICAgICAgICAgIGRlbGF5OiAuNSxcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgICAgICAgfSwgLjEsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbWVudU9wZW4gPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAkKCcubmF2YmFyX19iYXJfX2lubmVyJykuYWRkQ2xhc3MoJ2lzLS1jb21wJylcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNsb3NlTWVudSgpIHtcclxuICAgICAgICAgICAgaWYobWVudU9wZW4pIHtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTWF4LnRvKCcubmF2YmFyX19iYXInLCAxLjUsIHtcclxuICAgICAgICAgICAgICAgICAgICBlYXNlOiBFbGFzdGljLmVhc2VPdXQuY29uZmlnKDEsIDIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHg6IFwiLTEwMCVcIixcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBjbG9zZU92ZXJsYXkoKVxyXG4gICAgICAgICAgICAgICAgJCgnLm5hdmJhcl9fYmFyX19pbm5lcicpLnJlbW92ZUNsYXNzKCdpcy0tY29tcCcpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWVudU9wZW4gPSBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb3Blbk92ZXJsYXkoKSB7XHJcbiAgICAgICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnaXMtLW92ZXJsYXknKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2xvc2VPdmVybGF5KCkge1xyXG4gICAgICAgICAgICBpZihtZW51T3Blbikge1xyXG4gICAgICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdpcy0tb3ZlcmxheScpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNsb3NlQWxsKCkge1xyXG4gICAgICAgICAgICBjbG9zZU1lbnUoKVxyXG4gICAgICAgICAgICBjbG9zZU92ZXJsYXkoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0RGFya05hdmJhcigpXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldERhcmtOYXZiYXIoKSB7XHJcblxyXG4gICAgICAgICAgICBpZigkKGRvY3VtZW50KS5zY3JvbGxUb3AoKSA+ICQoJy5uYXZiYXInKS5pbm5lckhlaWdodCgpKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcubmF2YmFyJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdpcy0tdHJhbnNwYXJlbnQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLS1kZWZhdWx0JylcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYoaXNOYXZiYXJUcmFuc3BhcmVudC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGVmYXVsdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLm5hdmJhcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnaXMtLWRlZmF1bHQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2lzLS10cmFuc3BhcmVudCcpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldERhcmtOYXZiYXIoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJy5uYXZiYXJfX21lbnUgYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIG9wZW5NZW51KClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKCcubmF2YmFyX19iYXJfX3RvcF9fY2xvc2UgYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNsb3NlTWVudSgpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnI292ZXJsYXknKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY2xvc2VBbGwoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLmtleWRvd24oZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09IFwiRXNjYXBlXCIpIHtcclxuICAgICAgICAgICAgICAgIGNsb3NlTWVudSgpXHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIuYmFubmVyX19yaWdodF9fY2Fyb3VzZWxfX2l0ZW1zX19ibG9jayBpbWdcIikubW91c2Vkb3duKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIGltYWdlcyA9ICQoJy5iYW5uZXJfX3JpZ2h0X19jYXJvdXNlbF9faXRlbXNfX2Jsb2NrIGltZycpLFxyXG4gICAgICAgICAgICBjdXJyZW50U2xpZGUgPSAwLFxyXG4gICAgICAgICAgICBjb3VudFNsaWRlcyA9IGltYWdlcy5sZW5ndGgsXHJcbiAgICAgICAgICAgIHNsaWRlc0ludGVydmFsID0gNC41XHJcblxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBpbWFnZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoaSA+IDApIHtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTWF4LnRvKGltYWdlcywgc2xpZGVzSW50ZXJ2YWwsIHtcclxuICAgICAgICAgICAgICAgICAgICBlYXNlOiBFeHBvLmVhc2VPdXQsXHJcbiAgICAgICAgICAgICAgICAgICAgeDogXCIxMDAlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVHdlZW5NYXgudG8oaW1hZ2VzW2N1cnJlbnRTbGlkZV0sIHNsaWRlc0ludGVydmFsLCB7XHJcbiAgICAgICAgICAgIGVhc2U6IEV4cG8uZWFzZU91dCxcclxuICAgICAgICAgICAgeDogXCIwJVwiLFxyXG4gICAgICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgY3VycmVudFNsaWRlKytcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlU2xpZGVzKCkge1xyXG4gICAgICAgICAgICBUd2Vlbk1heC50byhpbWFnZXMsIHNsaWRlc0ludGVydmFsLCB7XHJcbiAgICAgICAgICAgICAgICBlYXNlOiBFeHBvLmVhc2VPdXQsXHJcbiAgICAgICAgICAgICAgICB4OiBcIjEwMCVcIixcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgVHdlZW5NYXgudG8oaW1hZ2VzW2N1cnJlbnRTbGlkZV0sIHNsaWRlc0ludGVydmFsLCB7XHJcbiAgICAgICAgICAgICAgICBlYXNlOiBFeHBvLmVhc2VPdXQsXHJcbiAgICAgICAgICAgICAgICB4OiBcIjAlXCIsXHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGN1cnJlbnRTbGlkZSsrO1xyXG4gICAgICAgICAgICBpZihjdXJyZW50U2xpZGUgPj0gY291bnRTbGlkZXMpIGN1cnJlbnRTbGlkZSA9IDBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBjaGFuZ2VTbGlkZXMoKVxyXG4gICAgICAgIH0sIDYwMDApXHJcblxyXG4gICAgICAgICQoJy5iYW5uZXJfX2xlZnRfX3Njcm9sbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjaGFuZ2VTbGlkZXMoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIHZhciBzd2lwZXIgPSBuZXcgU3dpcGVyKCcuem9uZXNfX2Nhcm91c2VsX19pbm5lcicsIHtcclxuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogIDIsXHJcbiAgICAgICAgICAgIC8vIGNlbnRlcmVkU2xpZGVzOiB0cnVlLFxyXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDMwLFxyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgZWw6ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgIH0pXHJcbn0pKGpRdWVyeSk7Il19
