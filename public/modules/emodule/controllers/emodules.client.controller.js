'use strict';

angular.module('emodule').controller('EmodulesController', ['$scope', 'Emodules', '$stateParams',
    function($scope, Emodules, $stateParams) {

        $scope.findAll = function() {
            $scope.emodules = Emodules.query();
        };

        $scope.findOne = function() {
            $scope.emodule = Emodules.get({
                emoduleId: $stateParams.emoduleId
            });
        };

        // $scope.remove = function(emodule) {
        //     if (emodule) {
        //         emodule.$remove();

        //         for (var i in $scope.emodules) {
        //             if ($scope.emodules[i] === emodule) {
        //                 $scope.emodules.splice(i, 1);
        //             }
        //         }
        //     } else {
        //         $scope.emodule.$remove(function() {
        //             $location.path('emodules');
        //         });
        //     }
        // };

        // $scope.update = function() {
        //     var emodule = $scope.emodule;

        //     emodule.$update(function() {
        //         $location.path('emodule/' + emodule._id);
        //     }, function(errorResponse) {
        //         $scope.error = errorResponse.data.message;
        //     });
        // };

    }
]).controller('EmoduleCreateController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles', 'Users', '$http', 'Emodules',
    function($scope, $stateParams, $location, Authentication, Articles, Users, $http, Emodules) {
        //User Authentication
        $scope.authentication = Authentication;
        $scope.user = Authentication.user;

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
                $location.path('emodule/' + response._id);
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

    }
]);