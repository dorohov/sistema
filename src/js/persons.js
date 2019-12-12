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

        $('#bminput').on('select.editable-select', function (e) {
            var _id = $(this).siblings('.es-list').children('li.selected').data('val');
            getDotOptions(_id)
        });

        setTimeout(function() {
            var plc = $('#bminput').data('placeholder')
            $('#bminput').attr('placeholder', plc)
        }, 1000)

    })
})(jQuery);