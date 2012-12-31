"use strict";

(function($) {
    var strings = {
        en: {
            us: {
                instructions: 'Drag a widget from the Dashboard into this area or double-click to begin typing here.',
            },
        },
    };

    $.fancypants('registerModule', 'accept', {
        
        init: function() {
            var $this = $(this);
            $this.addClass('fancypants-accept-container');
            $this.text(strings.en.us.instructions);

            var data = $this.data('fancypants');
        },

        destroy: function() {
            var $this = $(this);
            console.log($this);
            $this.removeClass('fancypants-accept-container');
            $this.empty();
        },
    });
})(jQuery);
