'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$location',
    function($scope, Authentication, $location) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
        //If user is signed in then redirect
        $scope.authentication.user ? $location.path('/learn') : $location.path('/');
        //Hide navbar here:
        var header = document.querySelector('header');
        $scope.header = angular.element(header);
        $scope.header.hidden = true;
        console.log($scope.header);
    }
]);

// TODO check if functional
angular.module('core').controller('MyAuthenticationController', ['$scope', '$http', '$location', 'Authentication',
    function($scope, $http, $location, Authentication) {
        $scope.authentication = Authentication;

        $scope.signup = function() {
            console.log("my controler signup");
            $http.post('/auth/signup', $scope.credentials).success(function(response) {
                //If successful we assign the response to the global user model
                $scope.authentication.user = response;
                //And redirect to the index page
                $location.path('/#!/learn');
            }).error(function(response) {
                $scope.error = response.message;
            });
        };

        $scope.signin = function() {
            console.log("my controler signin");
            $http.post('/auth/signin', $scope.credentials).success(function(response) {
                //If successful we assign the response to the global user model
                $scope.authentication.user = response;
                //And redirect to the index page
                $location.path('/learn');
                // $location.path('/learn');
            }).error(function(response) {
                $scope.error = response.message;
            });
        };
    }
]);