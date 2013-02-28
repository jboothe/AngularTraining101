'use strict';
/* App Controllers */

function ListCtrl ($scope, $location, TodoSvc) {
    $scope.search = function () {
        // Part 2: Instead of setting 'todos' on left side, use callback below
        //$scope.todos = TodoSvc.query({ sort: $scope.sort_order, desc: $scope.is_desc });

        // Part 2: added limit & offset 
        TodoSvc.query({
            sort: $scope.sort_order,
            desc: $scope.is_desc,
            limit: $scope.limit,
            offset: $scope.offset,
            q: $scope.searchString
        },
        // Part 2: callback handler function to manage pagination (concat) and hasMore
        function (data) {
            $scope.hasMore = data.length === 20;
            $scope.todos = $scope.todos.concat(data);
        });
    }

    // ---- Properties ---- //
    $scope.sort_order = "Priority";
    $scope.is_desc = false;

    // Part 2: manage pagination properties
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

    // Part 2: Add showMore function
    $scope.showMore = function () {
        $scope.offset += $scope.limit;
        $scope.search();
    }


    $scope.reset();

};
// Use the following to preserve args when using minification
ListCtrl.$inject = ['$scope', '$location', 'TodoSvc'];
