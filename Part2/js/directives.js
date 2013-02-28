'use strict';
/* http://docs-next.angularjs.org/api/angular.module.ng.$compileProvider.directive */

// initialize directives module

angular.module('TodoApp.directives', []).
    // app-version directive depends on 'version' in services
    directive('appVersion', ['version', function (version) {
      return function (scope, elm, attrs) {
          elm.text(version);
      };
  }])

.directive('colSorter', function () {
    return {
        scope: true,
        transclude: true,

        // can use embedded template:[string] or templateUrl:[external file]
        // do_sort() calls the $scope.do_sort() in the controller below
        /*
        template: '<a ng-click="do_sort()" ng-transclude></a>' +
            '<span ng-show="do_show(true)"><i class="icon-arrow-down"></i></span>' +
            '<span ng-show="do_show(false)"><i class="icon-arrow-up"></i></span> ',
        */
        templateUrl: 'partials/colSorter.tmpl.html',

        controller: function ($scope, $element, $attrs) {
            $scope.column = $attrs.colSorter;

            $scope.do_sort = function () {
                // $scope.sort_by inherits from ListCtrl
                $scope.sort_by($scope.column);
            }

            $scope.do_show = function (isAsc) {
                // $scope.is_desc and $scope.sort_order inherit from ListCtrl scope
                return (isAsc != $scope.is_desc) && ($scope.sort_order == $scope.column);
            }
        }
    };
});
    