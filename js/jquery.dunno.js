(function($) {
    var defaultOptions = {
    };

    var methods = {

        // Initialize dunno
        init: function(options) {
            return this.each(function() {
                $this = $(this);
                if(!$('body').data('dunno')) {
                    $('body').data('dunno', 1);
                } else {
                    $('body').data('dunno', $('body').data('dunno') + 1);
                }

                console.log($('body').data('dunno'));

                // Semaphore
                //if($this.data('dunno')) return;

                // Initialize the data store / semaphore
                //data = {
                //    settings: $.extend(defaultOptions, options),
                //    state: {},
                //    ui: {
                //    }
                //};


                // Build UI
                
                // Handle Events

                // Save the data
                //$this.data('dunno', data);

            });
        },

        destroy: function() {
            return this.each(function() {
                $this = $(this);

                // Unbind any dunno-related events
                $this.unbind('.dunno');

                // Remove data object
                $this.removeData('dunno');
            });
        },
    };

    $.fn.dunno = function(method) {
        if(methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments,1));
        } else if(typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.dunno');
        }
    };
})(jQuery);

