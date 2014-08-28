'use strict';
// Init the application configuration module for AngularJS application
var ApplicationConfiguration = function () {
    // Init module configuration options
    var applicationModuleName = 'ViveBien';
    var applicationModuleVendorDependencies = [
        'ngResource',
        'ngCookies',
        'ngAnimate',
        'ngTouch',
        'ngSanitize',
        'ui.router',
        'ui.bootstrap',
        'ui.utils'
      ];
    // Add a new vertical module
    var registerModule = function (moduleName) {
      // Create angular module
      angular.module(moduleName, []);
      // Add the module to the AngularJS configuration file
      angular.module(applicationModuleName).requires.push(moduleName);
    };
    return {
      applicationModuleName: applicationModuleName,
      applicationModuleVendorDependencies: applicationModuleVendorDependencies,
      registerModule: registerModule
    };
  }();'use strict';
//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);
// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config([
  '$locationProvider',
  function ($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);
//Then define the init function for starting up the application
angular.element(document).ready(function () {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_')
    window.location.hash = '#!';
  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('articles');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('elearning');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('emodule');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');'use strict';
// Configuring the Articles module
angular.module('articles').run([
  'Menus',
  function (Menus) {
    // Top bar menu items
    Menus.addMenuItem('topbar', 'Elegidos', 'learn', 'glyphicon glyphicon-heart');
    Menus.addMenuItem('topbar', 'Articulos', 'articles', 'glyphicon glyphicon-list');
    Menus.addMenuItem('topbar', 'Modulos', 'emodules', 'glyphicon glyphicon-th');
    // Admin menu
    Menus.addMenuItem('topbar', 'Admin', 'adm', 'dropdown', ' ', true, ['admin']);
    Menus.addSubMenuItem('topbar', 'adm', 'Agregar Articulo', 'articles/create');
    Menus.addSubMenuItem('topbar', 'adm', 'Agregar Modulo', 'emodule-create');
  }
]);'use strict';
// Setting up route
angular.module('articles').config([
  '$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider.state('listArticles', {
      url: '/articles',
      templateUrl: 'modules/articles/views/list-articles.client.view.html'
    }).state('createArticle', {
      url: '/articles/create',
      templateUrl: 'modules/articles/views/create-article.client.view.html'
    }).state('viewArticle', {
      url: '/articles/:articleId',
      templateUrl: 'modules/articles/views/view-article.client.view.html'
    }).state('editArticle', {
      url: '/articles/:articleId/edit',
      templateUrl: 'modules/articles/views/edit-article.client.view.html'
    });
  }
]);'use strict';
angular.module('articles').controller('ArticlesController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Articles',
  'Users',
  '$http',
  'Emodules',
  function ($scope, $stateParams, $location, Authentication, Articles, Users, $http, Emodules) {
    $scope.authentication = Authentication;
    $scope.user = Authentication.user;
    $scope.myUser = new Users($scope.user);
    $scope.myUser.userArticles = $scope.user.userArticles;
    $scope.emodules = Emodules.query();
    $scope.belongsToModule = [];
    $scope.create = function () {
      var article = new Articles({
          title: this.title,
          content: this.content,
          arType: this.arType,
          skills: this.skills,
          resource: this.resource,
          status: this.status,
          belongsToModule: this.belongsToModule
        });
      article.$save(function (response) {
        $location.path('articles/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
      this.title = '';
      this.content = '';
      this.arType = '';
      this.skills = '';
      this.resource = '';
      this.status = '';
      this.belongsToModule = '';
    };
    $scope.remove = function (article) {
      if (article) {
        article.$remove();
        for (var i in $scope.articles) {
          if ($scope.articles[i] === article) {
            $scope.articles.splice(i, 1);
          }
        }
      } else {
        $scope.article.$remove(function () {
          $location.path('articles');
        });
      }
    };
    $scope.update = function () {
      var article = $scope.article;
      article.$update(function () {
        $location.path('articles/' + article._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.find = function () {
      $scope.articles = Articles.query();
    };
    $scope.findOne = function () {
      $scope.article = Articles.get({ articleId: $stateParams.articleId });
    };
    $scope.filterAlreadyAdded = function (item) {
      // console.log("Filtrando " + item._id);
      return $scope.myUser.userArticles.indexOf(item._id) == -1;
    };
    $scope.selectionsChanged = function (elementId) {
      $scope.belongsToModule = [];
      $scope.belongsToModule.push(elementId);
      console.log('belongsToModule : ' + $scope.belongsToModule);  // if (!inArray(elementId, $scope.belongsToModule)) {
                                                                   //     $scope.belongsToModule.push(elementId);
                                                                   //     console.log("Agregada a belongsToModule : " + $scope.belongsToModule);
                                                                   //     // $scope.belongsToModule.push(elementId);
                                                                   // } else {
                                                                   //     $scope.belongsToModule.slice(elementId);
                                                                   // }
    };
    function inArray(x, arr) {
      for (var i = 0; i < arr.length; i++) {
        if (x === arr[i])
          return true;
      }
      return false;
    }
  }
]);'use strict';
angular.module('users').controller('MyArticlesController', [
  '$scope',
  'Articles',
  'Users',
  '$location',
  function ($scope, Articles, Users, User, $location) {
    $scope.addArt2me = function ($index, elArticulo) {
      var myArticle = elArticulo;
      var indice = $index;
      if ($scope.myUser.userArticles.indexOf(myArticle._id) > -1) {
        alert('Ya en array');
      } else {
        $scope.myUser.userArticles.unshift(myArticle._id);
        $scope.myUser.$update(function (response) {
          console.log('Actualize!! con : ' + $scope.myUser.userArticles);
          $scope.articles.splice(indice, 1);
        }, function (errorResponse) {
          console.log('updatError: ' + myArticle._id + errorResponse.data);
          $scope.error = errorResponse;
        });
      }
    };
    $scope.remArt2me = function ($index, elArticulo, $event) {
      $event.preventDefault();
      var myArticle = elArticulo;
      var myArtPosition = $scope.myUser.userArticles.indexOf(myArticle._id);
      var indice = $index;
      //remove article from My Articles arr
      $scope.myUser.userArticles.splice(myArtPosition, 1);
      //update My User
      $scope.myUser.$update(function (response) {
        //remove article obj. from rendering arr
        $scope.misArticulos.splice(indice, 1);
      }, function (errorResponse) {
        console.log('updatError: ' + myArticle._id + errorResponse.data);
        $scope.error = errorResponse;
      });
    };
  }
]);'use strict';
//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', [
  '$resource',
  function ($resource) {
    return $resource('articles/:articleId', { articleId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
// Setting up route
angular.module('core').config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');
    // Home state routing
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'modules/core/views/home.client.view.html'
    });
  }
]);'use strict';
angular.module('core').controller('HeaderController', [
  '$scope',
  'Authentication',
  'Menus',
  '$location',
  function ($scope, Authentication, Menus, $location) {
    $scope.authentication = Authentication;
    $scope.isCollapsed = false;
    $scope.menu = Menus.getMenu('topbar');
    // $scope.isHome = {};
    // $scope.isHome.estatus = $location.path() === "/";
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };
    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });
  }
]);'use strict';
angular.module('core').controller('HomeController', [
  '$scope',
  'Authentication',
  '$location',
  function ($scope, Authentication, $location) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    //If user is signed in then redirect
    $scope.authentication.user ? $location.path('/learn') : $location.path('/');
    //Hide navbar here:
    var header = document.querySelector('header');
    $scope.header = angular.element(header);
    $scope.header.hidden = true;
    console.log($scope.header);
  }
]);
// TODO check if functional
angular.module('core').controller('MyAuthenticationController', [
  '$scope',
  '$http',
  '$location',
  'Authentication',
  function ($scope, $http, $location, Authentication) {
    $scope.authentication = Authentication;
    $scope.signup = function () {
      console.log('my controler signup');
      $http.post('/auth/signup', $scope.credentials).success(function (response) {
        //If successful we assign the response to the global user model
        $scope.authentication.user = response;
        //And redirect to the index page
        $location.path('/#!/learn');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    $scope.signin = function () {
      console.log('my controler signin');
      $http.post('/auth/signin', $scope.credentials).success(function (response) {
        //If successful we assign the response to the global user model
        $scope.authentication.user = response;
        //And redirect to the index page
        $location.path('/learn');  // $location.path('/learn');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
//Menu service used for managing  menus
angular.module('core').service('Menus', [function () {
    // Define a set of default roles
    this.defaultRoles = ['user'];
    this.admintRoles = [
      'user',
      'admin'
    ];
    // Define the menus object
    this.menus = {};
    // A private function for rendering decision 
    var shouldRender = function (user) {
      if (user) {
        for (var userRoleIndex in user.roles) {
          for (var roleIndex in this.roles) {
            if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
              return true;
            }
          }
        }
      } else {
        return this.isPublic;
      }
      return false;
    };
    // Validate menu existance
    this.validateMenuExistance = function (menuId) {
      if (menuId && menuId.length) {
        if (this.menus[menuId]) {
          return true;
        } else {
          throw new Error('Menu does not exists');
        }
      } else {
        throw new Error('MenuId was not provided');
      }
      return false;
    };
    // Get the menu object by menu id
    this.getMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      return this.menus[menuId];
    };
    // Add new menu object by menu id
    this.addMenu = function (menuId, isPublic, roles) {
      // Create the new menu
      this.menus[menuId] = {
        isPublic: isPublic || false,
        roles: roles || this.defaultRoles,
        items: [],
        shouldRender: shouldRender
      };
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      delete this.menus[menuId];
    };
    // Add menu item object
    this.addMenuItem = function (menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Push new menu item
      this.menus[menuId].items.push({
        title: menuItemTitle,
        link: menuItemURL,
        menuItemType: menuItemType || 'item',
        menuItemClass: menuItemType,
        uiRoute: menuItemUIRoute || '/' + menuItemURL,
        isPublic: isPublic || this.menus[menuId].isPublic,
        roles: roles || this.defaultRoles,
        items: [],
        shouldRender: shouldRender
      });
      // Return the menu object
      return this.menus[menuId];
    };
    // Add submenu item object
    this.addSubMenuItem = function (menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
          // Push new submenu item
          this.menus[menuId].items[itemIndex].items.push({
            title: menuItemTitle,
            link: menuItemURL,
            uiRoute: menuItemUIRoute || '/' + menuItemURL,
            isPublic: isPublic || this.menus[menuId].isPublic,
            roles: roles || this.defaultRoles,
            shouldRender: shouldRender
          });
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenuItem = function (menuId, menuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
          this.menus[menuId].items.splice(itemIndex, 1);
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeSubMenuItem = function (menuId, submenuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
          if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
            this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
          }
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    //Adding the topbar menu
    this.addMenu('topbar');
  }]);'use strict';
//Setting up route
angular.module('elearning').config([
  '$stateProvider',
  function ($stateProvider) {
    // Elearning state routing
    $stateProvider.state('article-audio', {
      url: '/audio/:articleId',
      templateUrl: 'modules/elearning/views/article-audio.client.view.html'
    }).state('article-video', {
      url: '/video/:articleId',
      templateUrl: 'modules/elearning/views/article-video.client.view.html'
    }).state('article-text', {
      url: '/texto/:articleId',
      templateUrl: 'modules/elearning/views/article-text.client.view.html'
    }).state('learnroute', {
      url: '/learn',
      templateUrl: 'modules/elearning/views/learnroute.client.view.html'
    });
  }
]);'use strict';
angular.module('elearning').controller('ArticleAudioController', [
  '$rootScope',
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Articles',
  function ($rootScope, $scope, $stateParams, $location, Authentication, Articles) {
    $scope.authentication = Authentication;
    //get one article
    $scope.findOne = function () {
      $scope.article = Articles.get({ articleId: $stateParams.articleId });
    };
  }
]);'use strict';
angular.module('elearning').controller('ArticleTextController', [
  '$rootScope',
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Articles',
  function ($rootScope, $scope, $stateParams, $location, Authentication, Articles) {
    $scope.authentication = Authentication;
    //get one article
    $scope.findOne = function () {
      $scope.article = Articles.get({ articleId: $stateParams.articleId });
    };
    $scope.vibrate = function (vibrate, wait, vibrate2) {
      navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
      if (navigator.vibrate) {
        // Vibrate pattern
        // navigator.vibrate([vibrate, wait, vibrate2]);
        navigator.vibrate([vibrate2]);
      }
    };
    $scope.finishedArticle = function () {
      console.log('Article finished!');
      $scope.vibrate(300, 600, 600);
      $scope.article.status = 1;
      $scope.statusIcon = 'glyphicon-ok';
    };
    // speed reader widget
    $scope.fastReader = function () {
      // I LOVE GLOBALS.
      var commentEl = document.querySelector('#comment');
      var readerEl = document.querySelector('#reader');
      var buttonSlider = document.querySelector('#wpm');
      var buttonStart = document.querySelector('#start');
      var buttonPause = document.querySelector('#pause');
      var buttonPlay = document.querySelector('#play');
      var speed = 60000;
      var currentTimer = null;
      var sliderValue = parseInt(buttonSlider.value, 10);
      var delay = speed / sliderValue;
      var isPlaying = 0;
      $scope.sliderValue = buttonSlider.value;
      buttonSlider.addEventListener('change', function () {
        self = this;
        changeSpeed(self);
      });
      buttonStart.addEventListener('click', function () {
        $scope.startReader();  //
      });
      buttonPause.addEventListener('click', function () {
        $scope.pauseReader();  //
      });
      buttonPlay.addEventListener('click', function () {
        $scope.playReader ? $scope.playReader() : $scope.startReader();
      });
      $scope.startReader = function () {
        var words = commentEl.textContent.split(/\s+/).map(processWord);
        var currentWord = 0;
        $scope.playReader = function () {
          var word = words[currentWord++];
          var hasPause = /^\(|[,\;\:\)]$/.test(word);
          var hasPoint = /^\(|[\.\)]$/.test(word);
          readerEl.firstElementChild.innerHTML = word;
          positionWord();
          if (currentWord !== words.length) {
            currentTimer = setTimeout($scope.playReader, delay * (hasPause ? 3 : hasPoint ? 5 : 1));
          } else {
            $scope.$apply(function () {
              $scope.isPlaying = 0;
              $scope.finishedArticle();
            });
          }
          //progress bar
          $scope.progressBar(currentWord, words);
          $scope.$apply(function () {
            $scope.isPlaying = 1;
          });
        };
        $scope.pauseReader = function () {
          console.log('pauseReader');
          clearTimeout(currentTimer);
          if ($scope.isPlaying == 0) {
            $scope.playReader();
          }
          $scope.$apply(function () {
            $scope.isPlaying = 0;
          });
        };
        clearTimeout(currentTimer);
        $scope.playReader();
      };
      $scope.progressBar = function (currentWord, words) {
        $scope.$apply(function () {
          $scope.readProgress = currentWord / words.length * 100;
        });
      };
      $scope.speedLess = function () {
        buttonSlider.stepDown(4);
        changeSpeed(buttonSlider);
      };
      $scope.speedMore = function () {
        buttonSlider.stepUp(4);
        changeSpeed(buttonSlider);
      };
      function changeSpeed(self) {
        speed = parseInt(self.value) + parseInt(speed);
        delay = speed / parseInt(self.value, 10);
        $scope.sliderValue = buttonSlider.value;
      }
      function processWord(word) {
        var center = Math.floor(word.length / 2);
        var letters = word.split('');
        var result = [];
        return letters.map(function (letter, idx) {
          if (idx === center) {
            return '<span class="highlight">' + letter + '</span>';
          }
          return letter;
        }).join('');
      }
      function positionWord() {
        var wordEl = readerEl.firstElementChild;
        var highlight = wordEl.firstElementChild;
        var centerOffsetX = highlight.offsetWidth / 2 + highlight.offsetLeft;
        var centerOffsetY = highlight.offsetHeight / 2 + highlight.offsetTop;
        wordEl.style.left = readerEl.clientWidth / 2 - centerOffsetX + 'px';
        wordEl.style.top = readerEl.clientHeight / 2 - centerOffsetY + 'px';
      }
    };  //Angular eof
  }
]);'use strict';
angular.module('elearning').controller('ArticleVideoController', [
  '$rootScope',
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Articles',
  function ($rootScope, $scope, $stateParams, $location, Authentication, Articles) {
    $scope.authentication = Authentication;
    //get one article
    $scope.findOne = function () {
      $scope.article = Articles.get({ articleId: $stateParams.articleId });
    };
  }
]);
angular.module('elearning').directive('unvideo', [
  '$sce',
  function ($sce) {
    return {
      restrict: 'EA',
      scope: { code: '=' },
      replace: true,
      template: '<div style="height:400px;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
      link: function (scope) {
        scope.$watch('code', function (newVal) {
          if (newVal) {
            scope.url = $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + newVal);
          }
        });
      }
    };
  }
]);'use strict';
angular.module('articles').controller('LearnrouteController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Articles',
  'Users',
  function ($scope, $stateParams, $location, Authentication, Articles, Users) {
    $scope.authentication = Authentication;
    $scope.user = Authentication.user;
    $scope.myUser = new Users($scope.user);
    $scope.misArticulos = [];
    // $scope.isHome.estatus = false;
    $scope.find = function () {
      var myArticlesArray = $scope.user.userArticles;
      //console.log("Mis Articulos: " + $scope.misArticulos);
      for (var i = 0; i < myArticlesArray.length; i++) {
        // if ($scope.misArticulos[i] != "") {
        $scope.misArticulos[i] = Articles.get({ articleId: myArticlesArray[i] });  // }
      }
    };
  }
]);'use strict';
angular.module('elearning').factory('Emoduleservice', [function () {
    // Emoduleservice service logic
    // ...
    // Public API
    return {
      someMethod: function () {
        return true;
      }
    };
  }]);// 'use strict';
// angular.module('articles').factory('Myarticles', ['Articles', 'Users',
//     function(Articles, Users) {
//         // Myarticles service logic
//         var user = new Users($scope.user);
//         var getAllMy = function() {
//             var myArt = "Manzana";
//             alert("User en servicio");
//         }
//         // Public API
//         return {
//             getAllMy: function() {
//                 return true;
//             },
//             saveAcourse: function() {
//                 alert("Heyyy");
//             }
//         };
//     }
// ]);
'use strict';
//Setting up route
angular.module('emodule').config([
  '$stateProvider',
  function ($stateProvider) {
    // Emodule state routing
    $stateProvider.state('emodules-emodule', {
      url: '/emodules/:emoduleId',
      templateUrl: 'modules/emodule/views/emodules-emodule.client.view.html'
    }).state('emodules-list', {
      url: '/emodules',
      templateUrl: 'modules/emodule/views/emodules-list.client.view.html'
    }).state('emodule-create', {
      url: '/emodule-create',
      templateUrl: 'modules/emodule/views/emodule-create.client.view.html'
    });
  }
]);'use strict';
angular.module('emodule').controller('EmodulesController', [
  '$scope',
  'Emodules',
  '$stateParams',
  'Articles',
  function ($scope, Emodules, $stateParams, Articles) {
    $scope.findAll = function () {
      $scope.emodules = Emodules.query();
      $scope.articles = Articles.query();
    };  // $scope.findOne = function() {
        //     $scope.emodule = Emodules.get({
        //         emoduleId: $stateParams.emoduleId
        //     });
        // };
  }
]).controller('EmoduleCreateController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Articles',
  'Users',
  '$http',
  'Emodules',
  function ($scope, $stateParams, $location, Authentication, Articles, Users, $http, Emodules) {
    //User Authentication
    $scope.authentication = Authentication;
    $scope.user = Authentication.user;
    $scope.create = function () {
      var emodule = new Emodules({
          name: this.name,
          parent: this.parent,
          child: this.child,
          status: this.status,
          categories: this.categories,
          articlesArray: this.articlesArray,
          descripcion: this.descripcion
        });
      emodule.$save(function (response) {
        $location.path('emodules/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
      this.name = '';
      this.parent = '';
      this.child = '';
      this.status = '';
      this.categories = '';
      this.articlesArray = '';
      this.descripcion = '';
    };
  }
]);'use strict';
angular.module('emodule').factory('Emodules', [
  '$resource',
  function ($resource) {
    return $resource('emodules/:emoduleId', { articleId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
// Config HTTP Error Handling
angular.module('users').config([
  '$httpProvider',
  function ($httpProvider) {
    // Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push([
      '$q',
      '$location',
      'Authentication',
      function ($q, $location, Authentication) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
            case 401:
              // Deauthenticate the global user
              Authentication.user = null;
              // Redirect to signin page
              $location.path('signin');
              break;
            case 403:
              // Add unauthorized behaviour 
              break;
            }
            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]);'use strict';
// Setting up route
angular.module('users').config([
  '$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider.state('profile', {
      url: '/settings/profile',
      templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
    }).state('password', {
      url: '/settings/password',
      templateUrl: 'modules/users/views/settings/change-password.client.view.html'
    }).state('accounts', {
      url: '/settings/accounts',
      templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
    }).state('signup', {
      url: '/signup',
      templateUrl: 'modules/users/views/signup.client.view.html'
    }).state('signin', {
      url: '/signin',
      templateUrl: 'modules/users/views/signin.client.view.html'
    });
  }
]);'use strict';
angular.module('users').controller('AuthenticationController', [
  '$scope',
  '$http',
  '$location',
  'Authentication',
  function ($scope, $http, $location, Authentication) {
    $scope.authentication = Authentication;
    //If user is signed in then redirect back home
    if ($scope.authentication.user)
      $location.path('/');
    $scope.signup = function () {
      $http.post('/auth/signup', $scope.credentials).success(function (response) {
        //If successful we assign the response to the global user model
        $scope.authentication.user = response;
        //And redirect to the index page
        $location.path('/');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    $scope.signin = function () {
      $http.post('/auth/signin', $scope.credentials).success(function (response) {
        //If successful we assign the response to the global user model
        $scope.authentication.user = response;
        //And redirect to the index page
        $location.path('/');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('users').controller('SettingsController', [
  '$scope',
  '$http',
  '$location',
  'Users',
  'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;
    // If user is not signed in then redirect back home
    if (!$scope.user)
      $location.path('/');
    // Check if there are additional accounts 
    $scope.hasConnectedAdditionalSocialAccounts = function (provider) {
      for (var i in $scope.user.additionalProvidersData) {
        return true;
      }
      return false;
    };
    // Check if provider is already in use with current user
    $scope.isConnectedSocialAccount = function (provider) {
      return $scope.user.provider === provider || $scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider];
    };
    // Remove a user social account
    $scope.removeUserSocialAccount = function (provider) {
      $scope.success = $scope.error = null;
      $http.delete('/users/accounts', { params: { provider: provider } }).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.user = Authentication.user = response;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    // Update a user profile
    $scope.updateUserProfile = function () {
      $scope.success = $scope.error = null;
      var user = new Users($scope.user);
      user.$update(function (response) {
        $scope.success = true;
        Authentication.user = response;
      }, function (response) {
        $scope.error = response.data.message;
      });
    };
    // Change user password
    $scope.changeUserPassword = function () {
      $scope.success = $scope.error = null;
      $http.post('/users/password', $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.passwordDetails = null;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
// Authentication service for user variables
angular.module('users').factory('Authentication', [function () {
    var _this = this;
    _this._data = { user: window.user };
    return _this._data;
  }]);'use strict';
// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', [
  '$resource',
  function ($resource) {
    return $resource('users', {}, { update: { method: 'PUT' } });
  }
]);