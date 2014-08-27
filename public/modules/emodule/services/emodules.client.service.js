'use strict';

angular.module('emodule').factory('Emodules', ['$resource',
    function($resource) {
        return $resource('emodules/:emoduleId', {
            articleId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);