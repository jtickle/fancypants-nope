"use strict";

require.config({
    baseUrl: 'common',

    paths: {
        'jquery':     'libs/jquery',
        'underscore': 'libs/underscore',
        'backbone':   'libs/backbone',
        'require':    'libs/require/require',
        'text':       'libs/require/text',
    },

    shim: {
        'backbone': {
            deps: ["underscore", "jquery"],
            exports: "Backbone",
        },
        'jquery-ui': {
            deps: ["jquery"],
        },
        'underscore': {
            exports: "_",
        },
    },
});

require(['fp/fancypants', 'fp/derp'], function(FancyPants, derp) {
    FancyPants.initialize('body');
    FancyPants.sendMessage('fp.viewMode');
});
