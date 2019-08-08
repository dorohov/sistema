(function($) {
    "use strict"
    $(function() {

        $('a.modal-open').on('click', function(e) {
            e.preventDefault()
            var thisModalId = $(this).attr('href')
            $(thisModalId).modal({
                fadeDuration: 100,
                showClose: false,
            })
            return false;
        })

        $('#modal_ice').modal({
            // fadeDuration: 100
        })

    })
})(jQuery);