'use strict';
angular.module('elearning').controller('ArticleVideoController', ['$rootScope', '$scope', '$stateParams', '$location', 'Authentication', 'Articles',
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

angular.module('elearning').directive('unvideo', function($sce) {
    return {
        restrict: 'EA',
        scope: {
            code: '='
        },
        replace: true,
        template: '<div style="height:400px;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
        link: function(scope) {
            scope.$watch('code', function(newVal) {
                if (newVal) {
                    scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
                }
            });
        }
    };
});