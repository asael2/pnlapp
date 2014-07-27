'use strict';

//Setting up route
angular.module('emodule').config(['$stateProvider',
	function($stateProvider) {
		// Emodule state routing
		$stateProvider.
		state('emodule-create', {
			url: '/emodule-create',
			templateUrl: 'modules/emodule/views/emodule-create.client.view.html'
		});
	}
]);