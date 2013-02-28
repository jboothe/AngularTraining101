'use strict';

// Declare app level module which depends on filters, and services
angular.module('TodoApp', ['TodoApp.filters', 'TodoApp.services', 'TodoApp.directives']).
  config(['$routeProvider', function($routeProvider) {
      $routeProvider
          .when('/', { controller: ListCtrl, templateUrl: 'partials/list.html' })
          .when('/newTodo',  { controller: TodoDetailsCtrl, templateUrl: 'partials/todoDetails.html' })
          .when('/editTodo/:editId', { controller: TodoEditCtrl, templateUrl: 'partials/todoDetails.html' })
          .otherwise({ redirectTo: '/' });
  }]);