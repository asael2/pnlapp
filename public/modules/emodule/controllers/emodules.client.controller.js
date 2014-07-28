'use strict';

angular.module('emodule').controller('EmodulesController', ['$scope', 'Emodules',
    function($scope, Emodules) {



        $scope.find = function() {
            $scope.emodules = Emodules.query();
        };

        $scope.findOne = function() {
            $scope.emodule = Articles.get({
                emoduleId: $stateParams.emoduleId
            });
        };


    }
]);