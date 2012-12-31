(function($) {
    strings = {
        en: {
            us: {
                instructions: 'Drag a widget from the Dashboard into this area or double-click to begin typing here.',
            },
        },
    };

    $.fancypants('registerModule', 'accept', {
        
        init: function() {
            $this = $(this);
            $this.addClass('fancypants-accept-container');
            $this.text(strings.en.us.instructions);

            data = $this.data('fancypants');
        },
    });
})(jQuery);
