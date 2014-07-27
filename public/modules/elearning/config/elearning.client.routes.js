'use strict';

//Setting up route
angular.module('elearning').config(['$stateProvider',
    function($stateProvider) {
        // Elearning state routing
        $stateProvider.
        state('modules-view', {
            url: '/emodulos',
            templateUrl: 'modules/elearning/views/modules-view.client.view.html'
        }).
        state('audio', {
            url: '/audio/:articleId',
            templateUrl: 'modules/elearning/views/article-audio.client.view.html'
        }).
        state('article-video', {
            url: '/video/:articleId',
            templateUrl: 'modules/elearning/views/article-video.client.view.html'
        }).
        state('learnarticle', {
            url: '/texto/:articleId',
            templateUrl: 'modules/elearning/views/learnarticle.client.view.html'
        }).
        state('learnroute', {
            url: '/learn',
            templateUrl: 'modules/elearning/views/learnroute.client.view.html'
        });
    }
]);