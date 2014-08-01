'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Opciones', 'articles', 'dropdown', '/articles(/create)?');
        Menus.addSubMenuItem('topbar', 'articles', 'Mis Articulos', 'learn');
        Menus.addSubMenuItem('topbar', 'articles', 'Todos los Articulos', 'articles');

        // Menus.addSubMenuItem('topbar', 'articles', ' :articulos:', ' ', 'menuItemUIRoute', true, ['admin']);

        Menus.addSubMenuItem('topbar', 'articles', 'Agregar articulo', 'articles/create', 'menuItemUIRoute', true, ['admin']);

        Menus.addSubMenuItem('topbar', 'articles', ' - modulos -', ' ', 'menuItemUIRoute', true, ['admin']);

        Menus.addSubMenuItem('topbar', 'articles', 'Todos los Modulos', 'emodules', 'menuItemUIRoute', true, ['user']);

        Menus.addSubMenuItem('topbar', 'articles', 'Agregar Modulo', 'emodule-create', 'menuItemUIRoute', true, ['admin']);
    }
]);