'use strict';

angular.module('emodule').controller('EmodulesController', ['$scope', 'Emodules', '$stateParams', 'Articles',
    function($scope, Emodules, $stateParams, Articles) {

        $scope.findAll = function() {
            $scope.emodules = Emodules.query();
            $scope.articles = Articles.query();
        };
        // $scope.findOne = function() {
        //     $scope.emodule = Emodules.get({
        //         emoduleId: $stateParams.emoduleId
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