'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Articulos', 'articles', 'dropdown', '/articles(/create)?');
        Menus.addSubMenuItem('topbar', 'articles', 'Mis Articulos', 'learn');
        Menus.addSubMenuItem('topbar', 'articles', 'Todos los Articulos', 'articles');
        // if (user.roles[1] === 'admin') Menus.addSubMenuItem('topbar', 'articles', 'Nuevo Articulo', 'articles/create');
        Menus.addSubMenuItem('topbar', 'articles', 'Agregar articulo', 'articles/create', 'menuItemUIRoute', true, ['admin']);
    }
]);