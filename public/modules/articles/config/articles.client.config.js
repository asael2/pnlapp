'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
    function(Menus) {
        // Top bar menu items
        Menus.addMenuItem('topbar', 'Elegidos', 'learn', 'glyphicon glyphicon-heart');
        Menus.addMenuItem('topbar', 'Articulos', 'articles', 'glyphicon glyphicon-list');
        Menus.addMenuItem('topbar', 'Modulos', 'emodules', 'glyphicon glyphicon-th');

        // Admin menu
        Menus.addMenuItem('topbar', 'Admin', 'adm', 'dropdown', ' ', true, ['admin']);
        Menus.addSubMenuItem('topbar', 'adm', 'Agregar Articulo', 'articles/create');
        Menus.addSubMenuItem('topbar', 'adm', 'Agregar Modulo', 'emodule-create');
    }
]);