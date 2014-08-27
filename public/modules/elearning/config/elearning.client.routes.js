'use strict';

//Setting up route
angular.module('elearning').config(['$stateProvider',
    function($stateProvider) {
        // Elearning state routing
        $stateProvider.
        state('article-audio', {
            url: '/audio/:articleId',
            templateUrl: 'modules/elearning/views/article-audio.client.view.html'
        }).
        state('article-video', {
            url: '/video/:articleId',
            templateUrl: 'modules/elearning/views/article-video.client.view.html'
        }).
        state('article-text', {
            url: '/texto/:articleId',
            templateUrl: 'modules/elearning/views/article-text.client.view.html'
        }).
        state('learnroute', {
            url: '/learn',
            templateUrl: 'modules/elearning/views/learnroute.client.view.html'
        });
    }
]);