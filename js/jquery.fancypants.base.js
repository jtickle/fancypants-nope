(function($) {
    var defaultOptions = {
        source: '',
    };

    var staticOptions = { };

    var staticModules = { };

    var methods = {

        // Initialize Fancypants
        init: function(options) {
            return this.each(function() {
                $this = $(this);

                // Semaphore
                if($this.data('fancypants')) {
                    console.log('NOTICE: Semaphore block: ' + $this.data('fancypants').state.fpMod
                            + ' already exists here.');
                    return;
                }

                // See if there's anything to load
                if(!$this.attr('fp-mod')) {
                    console.log('DEBUG: No fp-mod set, skipping...');
                    return;
                }

                fpMod = $this.attr('fp-mod');

                // Load from DOM
                $(this).fancypants('create', fpMod);
            });
        },

        create: function(fpMod) {
            if(!(fpMod in staticModules)) {
                $.fancypants('loadModule', fpMod,
                    function() {
                        staticModules[fpMod].create($(this));
                    },
                    function() {
                        console.log('WARNING: No ' + fpMod + ' loaded in FancyPants nor available from ' + staticOptions.source);
                    });
                return;
            }

            staticModules[fpMod].create($(this));
        },

        destroy: function() {
            return this.each(function() {
                $this = $(this);

                // Unbind any fancypants-related events
                $this.unbind('.fancypants');

                // Remove data object
                $this.removeData('fancypants');
            });
        },
    };

    var staticMethods = {
        init: function(options) {
            staticOptions = $.extend(true, defaultOptions, options);
        },

        loadModule: function(fpMod, success, failure) {
            if(fpMod in staticModules) {
                console.log('DEBUG: ' + fpMod + ' is already loaded.');
                return;
            }

            url = staticOptions.source + '/jquery.fancypants.' + fpMod + '.js';

            // TODO: source object or something?  I don't know if this
            // provides enough flexibility, but I also don't really want
            // to implement a full javascript package manager.
            $.getScript(url,
                function(data, textStatus, jqxhr) {
                    console.log('NOTICE: ' + url + ' was loaded successfully');
                    if(typeof(success) !== 'undefined') {
                        success();
                    }
                })
            .fail(function(jqxhr, settings, exception) {
                console.log('DEBUG: ' + url + ' was not loaded');
                if(typeof(failure) !== 'undefined') {
                    failure();
                }
            });
        },
    };

    $.fn.fancypants = function(method) {
        if(methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments,1));
        } else if(typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.fn.fancypants');
        }
    };

    $.fancypants = function(method) {
        if(staticMethods[method]) {
            return staticMethods[method].apply(this, Array.prototype.slice.call(arguments,1));
        } else if(typeof method === 'object' || !method) {
            return staticMethods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.fancypants');
        }
    };
})(jQuery);
