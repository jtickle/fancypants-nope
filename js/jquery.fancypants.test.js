"use strict";

(function($) {
     var strings = {
         en: {
             us: {
                 instructions: "->>>",
             },
         },
     };

     $.fancypants('registerModule', 'test', {

         init: function() {
             var $this = $(this);

             $this.addClass('fancypants-test-container');
             $this.text(strings.en.us.instructions);

             var data = $this.data('fancypants');
         },
     });
     
 })(jQuery);
