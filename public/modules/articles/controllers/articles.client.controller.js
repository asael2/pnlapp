'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles', 'Users', '$http',
    function($scope, $stateParams, $location, Authentication, Articles, Users, $http) {

        $scope.authentication = Authentication;
        $scope.user = Authentication.user;
        $scope.myUser = new Users($scope.user);
        $scope.myUser.userArticles = $scope.user.userArticles;


        $scope.create = function() {
            var article = new Articles({
                title: this.title,
                content: this.content,
                arType: this.arType,
                skills: this.skills,
                resource: this.resource,
                status: this.status,
            });
            article.$save(function(response) {
                $location.path('articles/' + response._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            this.title = '';
            this.content = '';
            this.arType = '';
            this.skills = '';
            this.resource = '';
            this.status = '';
        };

        $scope.remove = function(article) {
            if (article) {
                article.$remove();

                for (var i in $scope.articles) {
                    if ($scope.articles[i] === article) {
                        $scope.articles.splice(i, 1);
                    }
                }
            } else {
                $scope.article.$remove(function() {
                    $location.path('articles');
                });
            }
        };

        $scope.update = function() {
            var article = $scope.article;

            article.$update(function() {
                $location.path('articles/' + article._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function() {
            $scope.articles = Articles.query();
        };

        $scope.findOne = function() {
            $scope.article = Articles.get({
                articleId: $stateParams.articleId
            });
        };

        $scope.filterAlreadyAdded = function(item) {
            // console.log("Filtrando " + item._id);
            return ($scope.myUser.userArticles.indexOf(item._id) == -1);

        };

    }
]);