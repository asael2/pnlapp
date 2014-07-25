'use strict';
angular.module('elearning').controller('ArticleAudioController', ['$rootScope', '$scope', '$stateParams', '$location', 'Authentication', 'Articles',
    function($rootScope, $scope, $stateParams, $location, Authentication, Articles) {
        $scope.authentication = Authentication;
        //get one article
        $scope.findOne = function() {
            $scope.article = Articles.get({
                articleId: $stateParams.articleId
            });
        };

    }
]);