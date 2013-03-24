"use strict";

define([
    'jquery',
    'underscore',
    'backbone',
    'require',
], function($, _, Backbone, require) {
    return {
        initialize: function(selector) {
            this.$base = $(selector);
            this.instances = [];

            var me = this;
            $('[data-fp]', this.$base).each(function() {
                var requestedModule = $(this).attr('data-fp') + '/module';
                require([requestedModule],
                    // Success
                    function(Module) {
                        me.instances.push(Module.instantiate(this));
                    },
                    // Error
                    function(error) {
                        console.log(error);
                        console.log('Could not load FancyPants Module ' + requestedModule + ': ' + error);
                    }
                );
            });
        },
        sendMessage: function(message, sender) {
            _.each(this.instances, function(instance, key, list) {
                instance.receiveMessage(message, sender);
            }, this);
        },
    };
});
