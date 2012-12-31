"use strict";

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

    var staticData = {
        enabled: false,
        modules: { },
        ui: {
            widgetPanel: null,
            widgetList: null,
            widgets: { },
        },
    };

    var methods = {

        // Initialize Fancypants
        init: function(options) {
            return this.each(function() {
                var $this = $(this);

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

                var fpMod = $this.attr('fp-mod');

                // TODO: The static function withModule provides a way to have a sort
                // of module loader, but it's giving me trouble, so fuck it fttb.
                // GOTTA GET SOMETHING TO SHOW FOR THIS WEEKEND
                
                try {
                    var mod = $.fancypants('getModule', fpMod);
                    
                    var data = {
                        module: $.extend(true, defaultModule, mod),
                        ui: { },
                    };

                    $this.data('fancypants', data);
                    data.module.init.apply(this);
                } catch(e) {
                    console.log(e);
                }
            });
        },

        destroy: function() {
            return this.each(function() {
                var $this = $(this);

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
            if(fpMod in staticData.modules) {
                console.log('WARNING: ' + fpMod + ' is already loaded, and will not be re-registered');
                return;
            }

            staticData.modules[fpMod] = handlers;
        },

        getModule: function(fpMod) {
            if(!(fpMod in staticData.modules)) {
                console.log(staticData.modules);
                throw 'ERROR: Tried to use module "' + fpMod + '" but it is not loaded.';
            }

            return staticData.modules[fpMod];
        },

        // TODO: this does not work because the callback forgets
        // where it came from.  May be as simple as moving it into
        // the dynamic context and calling as $(...).fancypants('withmodule', ...)
        // but I am tired of looking at it
        withModule: function(fpMod, success, failure) {
            if(typeof(success) === 'undefined') {
                success = function() { };
            }

            if(typeof(failure) === 'undefined') {
                failure = function() { };
            }

            if(!(fpMod in staticData.modules)) {
                var url = staticOptions.source + '/jquery.fancypants.' + fpMod + '.js';

                // TODO: source object or something?  I don't know if this
                // provides enough flexibility, but I also don't really want
                // to implement a full javascript package manager.
                $.getScript(url,
                    function(data, textStatus, jqxhr) {
                        if(fpMod in staticData.modules) {
                            console.log('NOTICE: ' + url + ' was loaded successfully');
                            success(staticData.modules[fpMod]);
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
                success(staticData.modules[fpMod]);
            }
        },

        on: function() {
            var ui = staticData.ui;

            ui.widgetPanel = $('<div>');
            ui.widgetList = $('<ul>');

            ui.widgetList.appendTo(ui.widgetDiv);

            ui.widgetPanel.addClass('fancypants-widget-panel');

            ui.widgetPanel.appendTo($('body'));

            $('*').each(function() { $(this).fancypants(); });
            staticData.enabled = true;
        },

        off: function() {
            var ui = staticData.ui;

            ui.widgetPanel.remove();
            ui.widgets = {};
            ui.widgetList = null;
            ui.widgetPanel = null;

            $('*').each(function() { $(this).fancypants('destroy'); });
            staticData.enabled = false;
        },

        isOn: function() {
            return staticData.enabled;
        },
    };

    $.fn.fancypants = function(method) {
        if(methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments,1));
        } else if(typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.fn.fancypants');
            return undefined;
        }
    };

    $.fancypants = function(method) {
        if(staticMethods[method]) {
            return staticMethods[method].apply(this, Array.prototype.slice.call(arguments,1));
        } else if(typeof method === 'object' || !method) {
            return staticMethods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.fancypants');
            return undefined;
        }
    };
})(jQuery);
