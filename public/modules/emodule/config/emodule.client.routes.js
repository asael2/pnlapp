'use strict';

//Setting up route
angular.module('emodule').config(['$stateProvider',
    function($stateProvider) {
        // Emodule state routing
        $stateProvider.
        state('emodules-emodule', {
            url: '/emodules/:emoduleId',
            templateUrl: 'modules/emodule/views/emodules-emodule.client.view.html'
        }).
        state('emodules-list', {
            url: '/emodules',
            templateUrl: 'modules/emodule/views/emodules-list.client.view.html'
        }).
        state('emodule-create', {
            url: '/emodule-create',
            templateUrl: 'modules/emodule/views/emodule-create.client.view.html'
        });
    }
]);