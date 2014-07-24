'use strict';

angular.module('articles').controller('LearnrouteController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles', 'Users',
    function($scope, $stateParams, $location, Authentication, Articles, Users) {


        $scope.authentication = Authentication;
        $scope.user = Authentication.user;

        if (!$scope.user) $location.path('/');

        $scope.myUser = new Users($scope.user);
        $scope.misArticulos = [];

        $scope.find = function() {

            var myArticlesArray = $scope.user.userArticles;

            console.log("Mis Articulos: " + $scope.misArticulos);

            for (var i = 0; i < myArticlesArray.length; i++) {
                // if ($scope.misArticulos[i] != "") {
                $scope.misArticulos[i] = Articles.get({
                    articleId: myArticlesArray[i]
                });
                console.log($scope.misArticulos[i] + "::Ucraine");
                // }

            }
        }

    }

]);