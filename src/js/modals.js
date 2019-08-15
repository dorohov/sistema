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