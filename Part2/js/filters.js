'use strict';
/* http://docs-next.angularjs.org/api/angular.module.ng.$filter */

angular.module('TodoApp.filters', []).
    filter('interpolate', ['version', function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        }
    }]).
    filter('checkmark', function () {
        return function (input) {
            return input ? '\u2713' : '\u2718';
        };
    });

