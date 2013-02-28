'use strict';

// Register services
angular.module('TodoApp.services', ['ngResource'])

    // simple constant service
    .value('version', '0.1')

    // 'TodoSvc' REST data service
    .factory('TodoSvc', function ($resource) {
        return $resource('/api/Todo/:id',
            { id: '@id' },
            { update: { method: 'PUT' } }
        );
    });
