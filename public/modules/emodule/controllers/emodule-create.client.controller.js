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
            // console.log(Emodules)
            emodule.$save(function(response) {
                $location.path('emodules/' + response._id);
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