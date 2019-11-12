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