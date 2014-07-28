'use strict';

angular.module('emodule').controller('EmoduleCreateController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles', 'Users', '$http', 'Emodules',
    function($scope, $stateParams, $location, Authentication, Articles, Users, $http, Emodules) {

        $scope.authentication = Authentication;
        $scope.user = Authentication.user;
        // $scope.myUser = new Users($scope.user);
        // $scope.myUser.userArticles = $scope.user.userArticles;


        $scope.create = function() {
            var emodule = new Emodules({
                name: this.name,
                parent: this.parent,
                child: this.child,
                status: this.status,
                categories: this.categories,
                articlesArray: this.articlesArray,
                descripcion: this.descripcion
            });
            emodule.$save(function(response) {
                // $location.path('emodules/' + response._id);
                $location.path('/emodules');
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            this.name = '';
            this.parent = '';
            this.child = '';
            this.status = '';
            this.categories = '';
            this.articlesArray = '';
            this.descripcion = '';
        };
        $scope.remove = function(emodule) {
            if (emodule) {
                emodule.$remove();

                for (var i in $scope.emodules) {
                    if ($scope.emodules[i] === emodule) {
                        $scope.emodules.splice(i, 1);
                    }
                }
            } else {
                $scope.emodule.$remove(function() {
                    $location.path('emodules');
                });
            }
        };

        $scope.update = function() {
            var emodule = $scope.emodule;

            emodule.$update(function() {
                $location.path('emodules/' + emodule._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

    }
]);