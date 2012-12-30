(function($) {
    var defaultStaticOptions = {
        source: '',
    };

    var defaultModule = {
        options: {
        },
        init: function() { },
    };

    var staticOptions = { };

    var modules = { };

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

                // Get things rolling lol my comments suck so bad
                $.fancypants('withModule', fpMod, function(mod) {
                    data = {
                        module: $.extend(true, defaultModule, mod),
                        ui: { },
                    };

                    $this.data('fancypants', data);

                    data.module.init.apply($this);
                });
            });
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
            staticOptions = $.extend(true, defaultStaticOptions, options);
        },

        registerModule: function(fpMod, handlers) {
            if(fpMod in modules) {
                console.log('WARNING: ' + fpMod + ' is already loaded, and will not be re-registered');
                return;
            }

            modules[fpMod] = handlers;
        },

        withModule: function(fpMod, success, failure) {
            if(typeof(success) === 'undefined') {
                success = function() { };
            }

            if(typeof(failure) === 'undefined') {
                failure = function() { };
            }

            if(!(fpMod in modules)) {
                url = staticOptions.source + '/jquery.fancypants.' + fpMod + '.js';

                // TODO: source object or something?  I don't know if this
                // provides enough flexibility, but I also don't really want
                // to implement a full javascript package manager.
                $.getScript(url,
                    function(data, textStatus, jqxhr) {
                        if(fpMod in modules) {
                            console.log('NOTICE: ' + url + ' was loaded successfully');
                            success(modules[fpMod]);
                        } else {
                            console.log('ERROR: ' + url + ' was loaded, but module did not register itself');
                            failure();
                        }
                    })
                .fail(function(jqxhr, settings, exception) {
                    console.log('DEBUG: ' + url + ' failed to load');
                    failure();
                });
            } else {
                success(modules[fpMod]);
            }
        },

        on: function() {
            $('*').each(function() { $(this).fancypants(); });
            // TODO: FancyPants UI
        },

        off: function() {
            $('*').each(function() { $(this).fancypants('destroy'); });
            // TODO: Destroy FancyPants UI
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
