"use strict";

(function($) {
    var strings = {
        en: {
            us: {
//                instructions: 'Drag a widget from the Dashboard into this area or double-click to begin typing here.',
                instructions: 'You can place that here if you\'d like.',
            },
        },
    };

    $.fancypants('registerModule', 'accept', {
        
        init: function() {
            var $this = $(this);
            $this.addClass('fancypants-accept-container');
            $this.css({'position': 'absolute', 'left': '-10000%'});

            $this.droppable({
                accept: '.fancypants-widget-item',
                tolerance: 'intersect',
                activate: function(event, ui) {
                    $this
                        .text(strings.en.us.instructions)
                        .css('position', 'static');
                },
                deactivate: function(event, ui) {
                    $this
                        .empty()
                        .css('position', 'absolute');
                },
                over: function(event, ui) {
                    $this
                        .data('fancypants').tempContent = $this;
                    $this.replaceWith($('ui').fancypants('createWidget');
                },
                out: function(event, ui) {
                    $this.replaceWith
                    $this
                        .removeClass('fancypants-accept-container-hover');
                },
                drop: function(event, ui) {
                    $this
                        .css('background', '#F00');
                },
            });

            var data = $this.data('fancypants');
        },

        destroy: function() {
            var $this = $(this);
            console.log($this);
            $this
                .empty()
                .css({'position': 'static', 'left': 'inherit'})
                .removeClass('fancypants-accept-container');
        },
    });
})(jQuery);
