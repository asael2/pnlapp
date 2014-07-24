'use strict';

angular.module('users').controller('MyArticlesController', ['$scope', 'Articles', 'Users', '$location',
    function($scope, Articles, Users, User, $location) {

        $scope.addArt2me = function($index, elArticulo) {
            var myArticle = elArticulo;
            var indice = $index;

            if ($scope.myUser.userArticles.indexOf(myArticle._id) > -1) {
                alert("Ya en array");

            } else {
                $scope.myUser.userArticles.unshift(myArticle._id);

                $scope.myUser.$update(function(response) {
                    console.log("Actualize!! con : " + $scope.myUser.userArticles);
                    $scope.articles.splice(indice, 1);
                }, function(errorResponse) {
                    console.log("updatError: " + myArticle._id + errorResponse.data);
                    $scope.error = errorResponse;
                });
            }
        };

        $scope.remArt2me = function($index, elArticulo, $event) {
            $event.preventDefault();

            var myArticle = elArticulo;
            var myArtPosition = $scope.myUser.userArticles.indexOf(myArticle._id);
            var indice = $index;
            //remove article from My Articles arr
            $scope.myUser.userArticles.splice(myArtPosition, 1);
            //update My User
            $scope.myUser.$update(function(response) {
                //remove article obj. from rendering arr
                $scope.misArticulos.splice(indice, 1);
            }, function(errorResponse) {
                console.log("updatError: " + myArticle._id + errorResponse.data);
                $scope.error = errorResponse;
            });
        };
    }
]);