"use strict";

(function($) {
    var strings = {
        en: {
            us: {
                label: "Two Columns",
            },
        },
    };

    $.fancypants('registerModule', 'twocol', {
        icon: "img/twocol.png",
        label: strings.en.us.label,
        category: "Layout",
        widgetAvailable: true,

        init: function() {
            var $this = $(this);

            var data = $this.data('fancypants');
        },
    });
})(jQuery);
