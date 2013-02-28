var TodoApp = angular.module('TodoApp', ['ngResource']).
    config(function ($routeProvider) {
        $routeProvider
            .when('/', { controller: ListCtrl, templateUrl: 'list.html' })
            .otherwise({ redirectTo: '/' });
    })

TodoApp.factory('TodoSvc', function ($resource) {
    return $resource('/api/Todo/:id', { id: '@id' }, { update: { method: 'PUT' } } );
});


var ListCtrl = function ($scope, $location, TodoSvc) {
    $scope.search = function () {
        $scope.todos = TodoSvc.query({sort: $scope.sort_order, desc: $scope.is_desc});
    }
    
    $scope.sort_order = "Priority";
    $scope.is_desc = false;

    $scope.sort = function (col) {
        if ($scope.sort_order === col) {
            $scope.is_desc = !$scope.is_desc;
        } else {
            $scope.sort_order = col;
            $scope.is_desc = false;
        }

        $scope.search();
    }


    $scope.search();
};

