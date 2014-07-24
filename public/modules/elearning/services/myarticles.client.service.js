'use strict';

angular.module('articles').factory('Myarticles', ['Articles', 'Users',
    function(Articles, Users) {
        // Myarticles service logic
        var user = new Users($scope.user);

        var getAllMy = function() {
            var myArt = "Manzana";
            alert("User en servicio");
        }

        // Public API
        return {
            getAllMy: function() {

                return true;
            },
            saveAcourse: function() {
                alert("Heyyy");
            }
        };
    }
]);