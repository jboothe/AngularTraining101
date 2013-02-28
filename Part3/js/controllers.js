'use strict';
/* App Controllers */

function ListCtrl ($scope, $location, TodoSvc) {
    $scope.search = function () {
        TodoSvc.query({
            sort: $scope.sort_order,
            desc: $scope.is_desc,
            limit: $scope.limit,
            offset: $scope.offset,
            q: $scope.searchString
        },
        function (data) {
            $scope.hasMore = data.length === 20;
            $scope.todos = $scope.todos.concat(data);
        });
    }

    // ---- Properties ---- //
    $scope.sort_order = "Priority";
    $scope.is_desc = false;


    // ---- Methods ---- //
    $scope.reset = function () {
        $scope.todos = [];
        $scope.limit = 20;
        $scope.offset = 0;
        $scope.hasMore = true;
        $scope.search();
    }
    
    $scope.sort_by = function (col) {
        if ($scope.sort_order === col) {
            $scope.is_desc = !$scope.is_desc;
        } else {
            $scope.sort_order = col;
            $scope.is_desc = false;
        }
        $scope.reset();
    }

    $scope.showMore = function () {
        $scope.offset += $scope.limit;
        $scope.search();
    }

    $scope.delete = function () {
        var id = this.todo.Id;
        TodoSvc.delete({ id: id }, function () {
            $('#todo_' + id).fadeOut();
        });
    }

    $scope.reset();

};
// Use the following to preserve args when using minification
ListCtrl.$inject = ['$scope', '$location', 'TodoSvc'];

function TodoDetailsCtrl($scope, $location, TodoSvc) {
    $scope.formAction = "Add";
    $scope.saveTodo = function () {
        TodoSvc.save($scope.item, function () {
            $location.path('/');
        });
    }
};

function TodoEditCtrl($scope, $location, $routeParams, TodoSvc) {
    var id = $routeParams.editId;
    $scope.item = TodoSvc.get({ id: id });
    $scope.formAction = "Update";


    $scope.saveTodo = function () {
        TodoSvc.update( {id : id }, $scope.item, function () {
            $location.path('/');
        });
    }
};
