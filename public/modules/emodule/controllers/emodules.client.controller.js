'use strict';

angular.module('emodule').controller('EmodulesController', ['$scope', 'Emodules', '$stateParams', 'Articles',
    function($scope, Emodules, $stateParams, Articles) {

        $scope.findAll = function() {
            $scope.emodules = Emodules.query();
            $scope.articles = Articles.query();

            $scope.getChildArticle = function(emodule, article) {

                var emoduleId = emoduleId;
                var article = article;

                console.log("emodule: " + emodule._id + " :: " + article.belongsToModule.length);
                for (var i = 0; article.belongsToModule.length; i++) {
                    console.log(article[i])
                }

            }
            // angular.forEach(article.belongsToModule, index, function() {
            //     console.log(index);
            // });
            // var checkArt = function() {
            //     Articles.articleByID(articleId);

            // }
            // console.log(checkArt.toJson());




            // if (emoduleId == articleId) {
            //     alert("hey")

            // }

            // var belongs2 = $scope.article._id;
            // return articleId == belongs2

            //  $scope.emodule = Emodules.get({
            //     emoduleId: $stateParams.emoduleId
            // });
            // }
        };

        $scope.findOne = function() {
            $scope.emodule = Emodules.get({
                emoduleId: $stateParams.emoduleId
            });
        };

        // $scope.remove = function(emodule) {
        //     alert("borrar : " + emodule)
        //     // if (emodule) {
        //     //     emodule.$remove();

        //     //     for (var i in $scope.emodules) {
        //     //         if ($scope.emodules[i] === emodule) {
        //     //             $scope.emodules.splice(i, 1);
        //     //         }
        //     //     }
        //     // } else {
        //     //     $scope.emodule.$remove(function() {
        //     //         $location.path('/emodules');
        //     //     });
        //     // }
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


        // $scope.articles = Articles.query();

        // for (var article in $scope.articles(data)) {
        //     console.log(data);

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