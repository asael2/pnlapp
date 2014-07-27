'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', '$location',
    function($scope, Authentication, Menus, $location) {
        $scope.authentication = Authentication;
        $scope.isCollapsed = false;

        $scope.menu = Menus.getMenu('topbar');
        // $scope.isHome = {};
        // $scope.isHome.estatus = $location.path() === "/";

        $scope.toggleCollapsibleMenu = function() {
            $scope.isCollapsed = !$scope.isCollapsed;
        };

        // Collapsing the menu after navigation
        $scope.$on('$stateChangeSuccess', function() {
            $scope.isCollapsed = false;
        });
    }
]);