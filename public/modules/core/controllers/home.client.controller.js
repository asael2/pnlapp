'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$location',
    function($scope, Authentication, $location) {
        // This provides Authentication context.
        $scope.authentication = Authentication;
    }
]);

angular.module('core').controller('MyAuthenticationController', ['$scope', '$http', '$location', 'Authentication',
    function($scope, $http, $location, Authentication) {
        $scope.authentication = Authentication;

        // alert("Amor");
        //If user is signed in then redirect back home
        if ($scope.authentication.user) $location.path('/#!/learn');

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
            $http.post('/auth/signin', $scope.credentials).success(function(response) {
                //If successful we assign the response to the global user model
                $scope.authentication.user = response;
                $location.path('/learn');
                console.log("my controler signin");
                //And redirect to the index page
                // $location.path('/learn');
            }).error(function(response) {
                $scope.error = response.message;
            });
        };
    }
]);